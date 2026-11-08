import { WEDDING, showFor, stealFor } from '../../shared/balance.ts';
import type { BoardRow, Fx, Gender, PkTeam, WeddingRole, WeddingState, WeddingStep } from '../../shared/types.ts';
import { CuopPk } from './CuopPk.ts';

type WeddingFx = Extract<Fx, { k: 'wedding' }> | Extract<Fx, { k: 'pk' }>;
const SEATS = WEDDING.maxGuests;

// Đám cưới làng quê: chờ cô dâu -> có cô dâu, chờ chú rể -> lễ cưới (cướp dâu được) -> rước dâu -> đám mới.
// Chỉ giữ trong bộ nhớ: khởi động lại server là mở đám cưới mới.
export class WeddingSystem {
  phase: WeddingState['phase'] = 'waiting';
  bride: WeddingRole | null = null;
  groom: WeddingRole | null = null;
  steals = 0;
  dirty = true;
  step: WeddingStep = '';
  pk: CuopPk | null = null;                               // đang PK cướp dâu, cướp rể: lễ tạm dừng
  private stepEndsAt = 0;
  private mcAt = 0;
  private mcI = 0;
  private timeBank = new Map<string, number>();          // xu cộng dồn để đổi thời gian
  private combo = new Map<string, { sum: number; at: number }>();   // quà liên tiếp của từng người, cộng dồn để xét cướp
  private endsAt = 0;
  private guests: string[] = [];                         // id theo thứ tự ngồi, người mới vào đẩy người cũ nhất ra
  private gifts = new Map<string, BoardRow>();           // mừng cưới trong đám này
  private emit: (f: WeddingFx) => void;

  constructor(emit: (f: WeddingFx) => void){ this.emit = emit; }

  stealPrice(_role: 'bride' | 'groom' = 'groom'){ return WEDDING.cuop; }
  private isCouple(id: string){ return this.bride?.id === id || this.groom?.id === id; }

  // Bình luận: ai chưa phải cô dâu chú rể thì vào ngồi mâm cỗ
  seat(id: string, name: string){
    if (this.isCouple(id) || this.phase === 'done') return false;
    const i = this.guests.indexOf(id);
    if (i >= 0) return false;                             // đã có chỗ: giữ nguyên, khỏi phải đổi ghế
    this.guests.push(id);
    if (this.guests.length > SEATS) this.guests.shift();
    this.dirty = true;
    this.emit({ k: 'wedding', ev: 'guest', id, name, text: '' });
    return true;
  }

  private unseat(id: string){ const i = this.guests.indexOf(id); if (i >= 0) this.guests.splice(i, 1); }

  // total: số xu lần tặng này.
  // Tặng đúng 3 xu (một lần 3 xu, hoặc quà liên tiếp cộng dồn vừa đúng 3 xu như ba bông hoa) thì vào vai còn trống:
  // đã bình luận "nữ" thì cô dâu, "nam" thì chú rể, chưa chọn thì vai đang trống (cô dâu trước).
  // Mức khác (1 xu gọi bia, 5 xu gọi món...) giữ chức năng riêng, không vào vai; tặng 50 xu cướp mà vai trống thì vào luôn.
  // Từ 50 xu là cướp: nam cướp dâu (làm chú rể), nữ cướp rể (làm cô dâu), chưa chọn thì cướp dâu. Vai trống thì vào luôn, có người thì giành vai.
  gift(id: string, name: string, sim: boolean, total: number, now: number, gender: Gender = ''){
    const row = this.gifts.get(id) ?? { id, name, value: 0, sim };
    row.value += total; row.name = name; this.gifts.set(id, row);
    this.dirty = true;
    if (this.phase === 'done') return;
    // đang PK: mọi quà là điểm cho đội của người tặng, kèm chiêu đánh theo mức xu
    if (this.pk){
      const pk = this.pk, { team, skill } = pk.gift(id, name, total);
      const target = team === 'def' ? pk.thief : skill.key === 'tai' ? (this.groom ?? pk.holder) : pk.holder;
      this.emit({ k: 'pk', ev: 'hit', id, name, team, skill: skill.key, amount: total, target: target.id,
        text: `${skill.icon} ${name} ${skill.verb} ${target.name}! +${total} điểm ${pkName(pk, team)}` });
      return;
    }
    // đang làm lễ: cứ đủ 40 xu (cộng dồn) thì lễ thêm 20 giây; đang giới thiệu hay trao nhẫn thì phần đó cũng dài thêm
    if (this.phase === 'married'){
      let bank = (this.timeBank.get(id) ?? 0) + total, add = 0;
      while (bank >= WEDDING.timeXu){ bank -= WEDDING.timeXu; add += WEDDING.timeMs; }
      if (add > WEDDING.timeMaxMs){ add = WEDDING.timeMaxMs; bank = 0; }     // quà lớn: thêm tối đa 1 phút
      this.timeBank.set(id, bank);
      if (add){
        this.endsAt += add;
        if (this.step !== 'party' && this.step) this.stepEndsAt += add;
        this.emit({ k: 'wedding', ev: 'time', id, name, amount: add / 1000, text: `⏰ ${name} tặng quà, lễ cưới thêm ${add / 1000} giây` });
      }
    }
    // cô dâu chú rể tự tặng: giữ vai, vẫn có hiệu ứng quà như mọi người
    const own = this.bride?.id === id ? this.bride : this.groom?.id === id ? this.groom : null;
    if (own){
      own.gifted += total; own.name = name;
      this.emit({ k: 'wedding', ev: 'mung', id, name, amount: total, text: mungText(`${own === this.bride ? 'Cô dâu' : 'Chú rể'} ${name}`, total) });
      return;
    }

    // Quà combo TikTok (10 xu x5, hoa x3) tới thành nhiều lần nhỏ: cộng dồn quà cách nhau dưới 10 giây để xét vào vai (đúng 3 xu) và cướp (chạm 50 xu)
    const c = this.combo.get(id), comboSum = c && now - c.at < WEDDING.comboMs ? c.sum + total : total;
    this.combo.set(id, { sum: comboSum, at: now });
    if (this.combo.size > 2000) this.combo.delete(this.combo.keys().next().value as string);
    const crossed = total < WEDDING.toastXu && comboSum >= WEDDING.cuop && comboSum - total < WEDDING.cuop;
    const steal = stealFor(total, gender) ?? (crossed ? stealFor(WEDDING.cuop, gender) : null);
    const stealXu = stealFor(total, gender) ? total : comboSum;     // điểm khởi đầu Đội Cướp: cả combo
    if (steal) this.combo.delete(id);
    const role = steal ?? (gender === 'nu' ? 'bride' : gender === 'nam' ? 'groom' : !this.bride ? 'bride' : !this.groom ? 'groom' : null);
    const holder = role ? this[role] : null;
    if (role && !holder){
      // vào vai: đúng 3 xu (một lần 3 xu, hoặc quà liên tiếp cộng dồn vừa đúng 3 xu như ba bông hoa); mức khác giữ chức năng riêng
      const exact = total === WEDDING.joinXu || comboSum === WEDDING.joinXu;
      if (!steal && !exact){
        const hint = comboSum < WEDDING.joinXu ? ` · còn ${WEDDING.joinXu - comboSum} xu nữa là làm ${role === 'bride' ? 'cô dâu' : 'chú rể'}` : '';
        this.emit({ k: 'wedding', ev: 'mung', id, name, amount: total, text: mungText(name, total) + hint });
        return;
      }
      this.combo.delete(id);
      this.fillRole(role, id, name, steal ? stealXu : WEDDING.joinXu, total, now);
      return;
    }
    if (steal && holder){
      const partner = steal === 'bride' ? this.groom : this.bride;
      // đang làm lễ: kẻ cướp xông lên sân khấu, cả sân chia đội PK 2 phút; chưa làm lễ thì cướp luôn
      if (this.phase === 'married' && partner){ this.startPk(steal, { id, name }, holder, partner, stealXu, now); return; }
      this.takeRole(steal, id, name, stealXu, now, holder);
      return;
    }
    this.emit({ k: 'wedding', ev: 'mung', id, name, amount: total, text: mungText(name, total) });
  }

  // Bình luận 1 / 2 lúc đang PK: vào đội bảo vệ hay Đội Cướp
  pkJoin(id: string, name: string, team: PkTeam){
    if (!this.pk || !this.pk.join(id, team)) return false;
    this.dirty = true;
    this.emit({ k: 'pk', ev: 'join', id, name, team, text: `${team === 'def' ? '💍' : '🎭'} ${name} vào ${pkName(this.pk, team)}` });
    return true;
  }

  private startPk(role: 'bride' | 'groom', thief: { id: string; name: string }, holder: WeddingRole, partner: WeddingRole, total: number, now: number){
    const pk = this.pk = new CuopPk(role, thief, { id: holder.id, name: holder.name }, { id: partner.id, name: partner.name }, total, now);
    this.unseat(thief.id); this.dirty = true;
    const what = role === 'groom' ? 'cướp dâu' : 'cướp rể';
    this.emit({ k: 'pk', ev: 'start', id: thief.id, name: thief.name, amount: total, target: partner.id,
      text: `⚔️ ${thief.name} xông lên ${what} ${partner.name}! Bình luận 1 vào ${pkName(pk, 'def')}, 2 vào Đội Cướp. PK 2 phút!` });
  }

  // Hết 2 phút: Đội Cướp nhiều điểm hơn thì kẻ cướp lấy vai, không thì bị đuổi về mâm. Lễ chạy tiếp từ chỗ dừng.
  private endPk(now: number){
    const pk = this.pk!, win = pk.winner(), paused = now - pk.startedAt;
    this.pk = null; this.dirty = true;
    this.endsAt += paused; if (this.step !== 'party') this.stepEndsAt += paused; this.mcAt = now + 4000;
    const what = pk.role === 'groom' ? 'cướp dâu' : 'cướp rể';
    this.emit({ k: 'pk', ev: 'end', id: pk.thief.id, name: pk.thief.name, win, amount: pk.score[win], target: pk.stolen.id,
      text: win === 'cuop'
        ? `🏆 Đội Cướp thắng ${pk.score.cuop} - ${pk.score.def}! ${pk.thief.name} ${what} thành công`
        : `🛡️ ${pkName(pk, 'def')} thắng ${pk.score.def} - ${pk.score.cuop}! ${pk.thief.name} bị đuổi về mâm, đám cưới tiếp tục` });
    const holder = this[pk.role];
    if (win === 'cuop' && holder && holder.id === pk.holder.id) this.takeRole(pk.role, pk.thief.id, pk.thief.name, pk.score.cuop, now, holder, false);
    else this.seat(pk.thief.id, pk.thief.name);
  }

  // Kẻ cướp lấy vai, người cũ xuống mâm ngồi ăn cỗ. show: có chạy màn hiệu ứng quà theo số xu không (thắng PK thì không, đã có màn ăn mừng riêng)
  private takeRole(role: 'bride' | 'groom', id: string, name: string, total: number, now: number, holder: WeddingRole, show = true){
    this[role] = { id, name, gifted: total }; this.steals++; this.unseat(id);
    if (this.phase === 'married') this.endsAt = Math.max(this.endsAt, now) + WEDDING.stealBonusMs;
    if ((this.step === 'introBride' && role === 'bride') || (this.step === 'introGroom' && role === 'groom')) this.startStep(this.step, now);
    const partner = role === 'bride' ? this.groom : this.bride;
    this.emit({ k: 'wedding', ev: 'steal', id, name, other: holder.name, amount: show ? total : 0, role,
      text: role === 'groom'
        ? `🏃 ${name} cướp dâu${partner ? ' ' + partner.name : ''} từ tay ${holder.name}! Muốn giành lại thì tặng ${WEDDING.cuop} xu`
        : `💃 ${name} cướp rể${partner ? ' ' + partner.name : ''} từ tay ${holder.name}! Muốn giành lại thì tặng ${WEDDING.cuop} xu` });
    this.seat(holder.id, holder.name);                      // người cũ xuống mâm ngồi ăn cỗ
  }

  // Chương trình lễ: mỗi phần có thời gian riêng, MC nói lần lượt các câu của phần đó
  private startStep(step: WeddingStep, now: number){
    this.step = step; this.mcI = 0; this.mcAt = now; this.dirty = true;
    const i = STEPS.indexOf(step);
    this.stepEndsAt = step === 'party' ? this.endsAt : now + (i < 2 ? WEDDING.introMs : WEDDING.ritualMs);
    // giờ lễ không đủ cho các thủ tục còn lại thì kéo dài, tiệc cưới còn ít nhất 20 giây
    if (step !== 'party') this.endsAt = Math.max(this.endsAt, this.stepEndsAt + (STEPS.length - 2 - i) * WEDDING.ritualMs + WEDDING.partyMinMs);
  }

  private mcLine(){
    const b = this.bride!, g = this.groom!, lines = MC[this.step as Exclude<WeddingStep, ''>] ?? [];
    const line = lines[this.mcI];
    if (!line) return;
    const who = this.step === 'introGroom' ? g : b;
    this.emit({ k: 'wedding', ev: 'mc', id: who.id, name: who.name, role: this.step === 'introGroom' ? 'groom' : 'bride', text: line(b, g, this.stealPrice('groom'), this.stealPrice('bride')) });
    this.mcI++;
  }

  // Đưa một người vào vai đang trống. amount: số xu lần tặng (0 khi làng tự chọn); auto: làng tự chọn sau 3 phút chờ.
  private fillRole(role: 'bride' | 'groom', id: string, name: string, gifted: number, amount: number, now: number, auto = false){
    this[role] = { id, name, gifted }; this.unseat(id); this.dirty = true;
    const partner = role === 'bride' ? this.groom : this.bride, lead = auto ? '🎲 Làng chọn ngẫu nhiên: ' : '';
    if (partner){
      this.phase = 'married'; this.endsAt = now + WEDDING.ceremonyMs; this.autoAt = 0; this.startStep('introBride', now);
      this.emit({ k: 'wedding', ev: role, id, name, other: partner.name, amount, auto,
        text: lead + (role === 'groom' ? `🤵 ${name} làm chú rể của ${partner.name}! Lễ thành hôn bắt đầu` : `👰 ${name} làm cô dâu của ${partner.name}! Lễ thành hôn bắt đầu`) });
    } else {
      this.phase = role;
      this.emit({ k: 'wedding', ev: role, id, name, amount, auto,
        text: lead + (role === 'bride' ? `👰 ${name} làm cô dâu! Bạn nam bình luận "nam" rồi tặng đúng ${WEDDING.joinXu} xu để làm chú rể` : `🤵 ${name} làm chú rể! Bạn nữ bình luận "nữ" rồi tặng đúng ${WEDDING.joinXu} xu để làm cô dâu`) });
    }
  }

  // Chờ cô dâu chú rể quá 3 phút: làng tự chọn ngẫu nhiên người đang ở trong phòng vào các vai còn trống.
  // pickAuto do VillageCore gắn vào: trả về người được chọn cho từng vai (không có ai thì null, đếm lại 3 phút).
  autoAt = 0;
  pickAuto: ((need: ('bride' | 'groom')[], skip: Set<string>) => Partial<Record<'bride' | 'groom', { id: string; name: string }>>) | null = null;
  private autoTick(now: number){
    const open = this.phase === 'waiting' || this.phase === 'bride' || this.phase === 'groom';
    if (!open){ this.autoAt = 0; return; }
    if (!this.autoAt){ this.autoAt = now + WEDDING.autoPickMs; this.dirty = true; return; }
    if (now < this.autoAt || !this.pickAuto) return;
    const need = (['bride', 'groom'] as const).filter(r => !this[r]);
    const skip = new Set([this.bride?.id, this.groom?.id].filter((x): x is string => !!x));
    const got = this.pickAuto([...need], skip);
    this.autoAt = now + WEDDING.autoPickMs; this.dirty = true;              // chưa chọn đủ thì đếm lại từ đầu
    for (const r of need){ const p = got[r]; if (p && !this[r] && !skip.has(p.id)){ skip.add(p.id); this.fillRole(r, p.id, p.name, 0, 0, now, true); } }
  }

  tick(now: number){
    // đang PK: lễ đứng yên; MC hô các mốc 60, 30, 10 giây cuối
    if (this.pk){
      const pk = this.pk, left = Math.ceil((pk.endsAt - now) / 1000);
      for (const s of [60, 30, 10]) if (left <= s && left > s - 5 && !pk.called.has(s)){
        pk.called.add(s);
        const lead: PkTeam = pk.score.cuop > pk.score.def ? 'cuop' : 'def';
        this.emit({ k: 'pk', ev: 'tick', id: pk.thief.id, name: pk.thief.name, amount: s, team: lead,
          text: `⏰ Còn ${s} giây! ${pkName(pk, lead)} đang dẫn ${pk.score[lead]} - ${pk.score[lead === 'def' ? 'cuop' : 'def']}` });
      }
      if (now >= pk.endsAt) this.endPk(now);
      return;
    }
    this.autoTick(now);
    if (this.phase === 'married' && this.step){
      if (now >= this.mcAt){ this.mcLine(); this.mcAt = now + WEDDING.mcEveryMs; }
      if (this.step !== 'party' && now >= this.stepEndsAt) this.startStep(STEPS[STEPS.indexOf(this.step) + 1], now);
    }
    if (this.phase === 'married' && now >= this.endsAt){
      this.phase = 'done'; this.endsAt = now + WEDDING.endMs; this.dirty = true; this.step = '';
      this.emit({ k: 'wedding', ev: 'end', id: this.groom!.id, name: this.groom!.name, other: this.bride!.name,
        text: `🎉 Lễ thành hôn ${this.groom!.name} và ${this.bride!.name} viên mãn! Cô dâu chú rể nắm tay nhau vào nhà, trăm năm hạnh phúc` });
    } else if (this.phase === 'done' && now >= this.endsAt) this.reset();
  }

  reset(){
    this.pk = null; this.autoAt = 0; this.phase = 'waiting'; this.bride = null; this.groom = null; this.steals = 0; this.endsAt = 0; this.step = ''; this.stepEndsAt = 0; this.timeBank.clear(); this.combo.clear();
    this.gifts.clear(); this.dirty = true;
  }

  pub(now: number): Omit<WeddingState, 'top' | 'month'> {   // top, month: VillageCore thêm từ bảng quà tháng
    return {
      phase: this.phase, bride: this.bride, groom: this.groom, step: this.step, stepLeftMs: this.step && this.step !== 'party' ? Math.max(0, this.stepEndsAt - now) : 0, stealPrice: this.stealPrice('groom'), stealBride: this.stealPrice('bride'), steals: this.steals,
      leftMs: this.endsAt ? Math.max(0, this.endsAt - now) : 0, guests: this.guests.slice(),
      gifts: [...this.gifts.values()].sort((a, b) => b.value - a.value).slice(0, 5),
      pk: this.pk?.pub(now) ?? null,
      autoLeftMs: this.autoAt ? Math.max(0, this.autoAt - now) : 0,
    };
  }
}

// Tên đội trong PK: Đội Dâu khi cướp dâu, Đội Rể khi cướp rể; bên kia là Đội Cướp
export const pkName = (pk: { role: 'bride' | 'groom' }, team: PkTeam) => team === 'cuop' ? 'Đội Cướp' : pk.role === 'groom' ? 'Đội Dâu' : 'Đội Rể';

// Dòng thông báo quà: "🍺 Lan gọi bia", "🎆 Lan bắn pháo hoa mừng cưới"... quà lớn hơn thì "🧧 Lan mừng cưới 500 xu"
function mungText(who: string, xu: number){
  const top = showFor(xu).at(-1);
  return top?.act ? `${top.icon} ${who} ${top.act}` : `🧧 ${who} mừng cưới ${xu} xu`;
}

// Thứ tự thủ tục hôn lễ
const STEPS: WeddingStep[] = ['introBride', 'introGroom', 'giaTien', 'rings', 'ruou', 'banh', 'party'];

// Lời MC từng phần, gọi đúng tên và số xu đã tặng
type Line = (b: WeddingRole, g: WeddingRole, price: number, price2: number) => string;
const MC: Record<Exclude<WeddingStep, ''>, Line[]> = {
  introBride: [
    b => `Kính thưa quý vị quan khách! Xin trân trọng giới thiệu cô dâu xinh đẹp nhất làng hôm nay: ${b.name}!`,
    b => `Cô dâu ${b.name} giỏi giang, nết na, đã tặng ${b.gifted} xu cho đám cưới. Xin một tràng pháo tay!`,
  ],
  introGroom: [
    (b, g) => `Và bây giờ, xin giới thiệu chú rể bảnh bao của chúng ta: ${g.name}!`,
    (b, g, price) => `Chú rể ${g.name} đã rước cô dâu ${b.name}. Ai muốn cướp thì tặng ${price} xu: bạn nam cướp dâu, bạn nữ cướp rể, cả sân sẽ PK hai phút!`,
  ],
  giaTien: [
    (b, g) => `Kính mời cô dâu ${b.name} và chú rể ${g.name} làm lễ gia tiên, thắp nén hương báo cáo tổ tiên hai họ.`,
  ],
  rings: [
    (b, g) => `Mời cô dâu ${b.name} và chú rể ${g.name} trao nhẫn cưới, nguyện thề trăm năm bên nhau!`,
  ],
  ruou: [
    (b, g) => `Mời hai bạn nâng ly rượu giao bôi, cùng nhau chung vui, chung hưởng ngọt bùi!`,
  ],
  banh: [
    (b, g) => `Mời cô dâu chú rể cùng cắt bánh cưới, chúc cho cuộc sống ngọt ngào như chiếc bánh này!`,
  ],
  party: [
    (b, g) => `Mời bà con nâng ly, chúc mừng hạnh phúc ${g.name} và ${b.name}! Tiệc cưới bắt đầu!`,
  ],
};

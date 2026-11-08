import { COSTUMES, DECOR, TOOLS } from '../shared/balance.ts';
import type { CostumeKey, DecorKey, ToolKey } from '../shared/balance.ts';

export type Command =
  | { c: 'enter' } | { c: 'home' } | { c: 'rice' } | { c: 'plow' } | { c: 'sow' } | { c: 'water' } | { c: 'fert' } | { c: 'harvest' }
  | { c: 'feedFish' } | { c: 'buyFish' } | { c: 'harvestFish' } | { c: 'catch' }
  | { c: 'feedAnimals' } | { c: 'buyChicken' } | { c: 'buyDuck' } | { c: 'eggs' } | { c: 'sellAnimals' }
  | { c: 'market' } | { c: 'sell'; item: 'rice' | 'fish' | 'egg' } | { c: 'buildHouse' } | { c: 'outfit' }
  | { c: 'donate'; amount: number } | { c: 'festival' } | { c: 'contest' } | { c: 'feast' } | { c: 'gender'; g: 'nam' | 'nu' }
  | { c: 'buyDecor'; key: DecorKey } | { c: 'buyTool'; key: ToolKey } | { c: 'buyCostume'; key: CostumeKey };

// "Vào Làng!!" -> "VAO LANG". Người xem gõ thiếu dấu hoặc thừa dấu câu vẫn chạy.
export function normalize(text: string){
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/g, 'D').toUpperCase()
    .replace(/[^A-Z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

const EXACT: Record<string, Command> = {
  'VAO LANG': { c: 'enter' }, 'XEM NHA': { c: 'home' }, 'VE NHA': { c: 'home' },
  'TRONG LUA': { c: 'rice' }, 'LAM DAT': { c: 'plow' }, 'GIEO MA': { c: 'sow' }, 'TUOI NUOC': { c: 'water' }, 'TUOI': { c: 'water' },
  'BON PHAN': { c: 'fert' }, 'THU HOACH': { c: 'harvest' }, 'GAT LUA': { c: 'harvest' },
  'CHO CA AN': { c: 'feedFish' }, 'MUA CA': { c: 'buyFish' }, 'MUA CA GIONG': { c: 'buyFish' }, 'THU CA': { c: 'harvestFish' }, 'CAU CA': { c: 'catch' },
  'CHO GA AN': { c: 'feedAnimals' }, 'CHO VIT AN': { c: 'feedAnimals' }, 'MUA GA': { c: 'buyChicken' }, 'MUA VIT': { c: 'buyDuck' },
  'THU TRUNG': { c: 'eggs' }, 'BAN GA': { c: 'sellAnimals' }, 'BAN VIT': { c: 'sellAnimals' }, 'BAN VAT NUOI': { c: 'sellAnimals' },
  'RA CHO': { c: 'market' }, 'BAN LUA': { c: 'sell', item: 'rice' }, 'BAN CA': { c: 'sell', item: 'fish' }, 'BAN TRUNG': { c: 'sell', item: 'egg' },
  'XAY NHA': { c: 'buildHouse' }, 'NANG NHA': { c: 'buildHouse' }, 'DOI AO': { c: 'outfit' },
  'GOP': { c: 'donate', amount: 50 }, 'XAY LANG': { c: 'donate', amount: 50 },
  'THAM GIA HOI LANG': { c: 'festival' }, 'DI HOI': { c: 'festival' }, 'HOI LANG': { c: 'festival' },
  'KEO': { c: 'contest' }, 'BAT': { c: 'contest' }, 'CAU': { c: 'contest' }, 'CHEO': { c: 'contest' },
  'NAM': { c: 'gender', g: 'nam' }, 'NU': { c: 'gender', g: 'nu' }, 'TRAI': { c: 'gender', g: 'nam' }, 'GAI': { c: 'gender', g: 'nu' },
  'CON TRAI': { c: 'gender', g: 'nam' }, 'CON GAI': { c: 'gender', g: 'nu' }, 'NAM NHE': { c: 'gender', g: 'nam' }, 'NU NHE': { c: 'gender', g: 'nu' },
  'AN CO': { c: 'feast' }, 'DI AN CO': { c: 'feast' }, 'AN CUOI': { c: 'feast' }, 'DI AN CUOI': { c: 'feast' },
};
for (const [key, d] of Object.entries(DECOR)) EXACT[`MUA ${d.words}`] = { c: 'buyDecor', key: key as DecorKey };
for (const [key, t] of Object.entries(TOOLS)) EXACT[`MUA ${t.words}`] = { c: 'buyTool', key: key as ToolKey };
for (const [key, c] of Object.entries(COSTUMES)){ EXACT[`MUA ${c.words}`] = { c: 'buyCostume', key: key as CostumeKey }; EXACT[`MAY ${c.words}`] = { c: 'buyCostume', key: key as CostumeKey }; EXACT[`MAC ${c.words}`] = { c: 'buyCostume', key: key as CostumeKey }; }

// Chỉ nhận khi cả bình luận là lệnh, để câu chuyện bình thường có chữ "câu cá" không bị hiểu nhầm.
export function parseCommand(text: string): Command | null {
  const n = normalize(text);
  if (!n || n.length > 40) return null;
  const hit = EXACT[n];
  if (hit) return hit;
  const m = /^(?:GOP|XAY LANG) (\d{1,6})$/.exec(n);
  return m ? { c: 'donate', amount: +m[1] } : null;
}

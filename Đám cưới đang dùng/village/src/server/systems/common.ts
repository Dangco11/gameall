import type { ActKind, Player } from '../../shared/types.ts';

export interface Result { ok: boolean; act: ActKind; text: string; xp?: number; bubble?: string }
export const ok = (act: ActKind, text: string, xp = 0, bubble?: string): Result => ({ ok: true, act, text, xp, bubble });
export const fail = (act: ActKind, text: string): Result => ({ ok: false, act, text });

export function spend(p: Player, amount: number){
  if (p.money < amount) return false;
  p.money -= amount;
  return true;
}
export function earn(p: Player, amount: number){
  amount = Math.round(amount);
  p.money += amount;
  p.stats.earned += amount;
  return amount;
}
export const fmt = (n: number) => Math.round(n).toLocaleString('vi-VN') + 'đ';

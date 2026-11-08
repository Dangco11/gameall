import type { ControlMessage, ServerMessage } from '../shared/types.ts';

// WebSocket tự nối lại; mất kết nối thì màn hình vẫn chạy cảnh, có lại thì nhận ảnh chụp đầy đủ.
export class Net {
  private ws: WebSocket | null = null;
  private retry = 0;
  onState: (s: ServerMessage) => void = () => {};
  onStatus: (up: boolean) => void = () => {};
  private role: 'control' | 'view';
  constructor(role: 'control' | 'view'){ this.role = role; }

  connect(){
    const ws = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws?role=${this.role}`);
    this.ws = ws;
    ws.onopen = () => { this.retry = 0; this.onStatus(true); };
    ws.onmessage = e => { try { this.onState(JSON.parse(e.data as string)); } catch (err) { console.error(err); } };
    ws.onclose = () => { this.onStatus(false); setTimeout(() => this.connect(), Math.min(10_000, 500 * 2 ** this.retry++)); };
  }
  send(m: ControlMessage){ if (this.ws?.readyState === 1) this.ws.send(JSON.stringify(m)); }
}

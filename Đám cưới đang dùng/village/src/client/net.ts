import type { ControlMessage, Delta, ServerMessage, Snapshot } from '../shared/types.ts';

// WebSocket tự nối lại; mất kết nối thì màn hình vẫn chạy cảnh làng, có lại thì nhận ảnh chụp đầy đủ.
export class Net {
  private ws: WebSocket | null = null;
  private retry = 0;
  private role: 'control' | 'view';
  onHello: (s: Snapshot) => void = () => {};
  onDelta: (d: Delta) => void = () => {};
  onStatus: (up: boolean) => void = () => {};

  constructor(role: 'control' | 'view'){ this.role = role; }

  connect(){
    const ws = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws?role=${this.role}`);
    this.ws = ws;
    ws.onopen = () => { this.retry = 0; this.onStatus(true); };
    ws.onmessage = e => {
      let m: ServerMessage;
      try { m = JSON.parse(e.data as string); } catch { return; }
      if (m.t === 'hello') this.onHello(m); else this.onDelta(m);
    };
    ws.onclose = () => {
      this.onStatus(false);
      setTimeout(() => this.connect(), Math.min(10_000, 500 * 2 ** this.retry++));
    };
  }

  send(m: ControlMessage){ if (this.ws?.readyState === 1) this.ws.send(JSON.stringify(m)); }
}

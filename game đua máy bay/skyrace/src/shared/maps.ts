// 5 bản đồ đua. Server chỉ dùng phần vùng (theo phần trăm vòng đua): vùng tăng tốc, chướng ngại vật, đường tắt.
// Màn hình dùng thêm các điểm đường bay để dựng cảnh 3D.
// Mọi đường bay đều xuất phát từ gốc tọa độ theo hướng +X, đoạn đầu thẳng để cất cánh từ đường băng.
export type MapKey = 'tropical' | 'snow' | 'city' | 'jungle' | 'desert';
export interface Zone { at: number; len: number }
export interface MapDef {
  key: MapKey; name: string; icon: string;
  pts: [number, number, number][];
  pads: Zone[];                                 // cổng tăng tốc: bay qua được đẩy 1,8 giây
  obstacles: number[];                          // chướng ngại vật: lỡ va là choáng nhẹ (có khiên thì không sao)
  shortcut: Zone & { gain: number };            // đường tắt mạo hiểm: nhanh hơn nhưng dễ đâm
}

// Đường bay dài: các điểm gốc được kéo giãn theo chiều ngang (độ cao giữ nguyên), mỗi vòng chừng 25–33 km
const STRETCH = 9.2;
const S = (pts: [number, number, number][]) => pts.map(([x, y, z]) => [x * STRETCH, y, z * STRETCH] as [number, number, number]);

export const MAPS: MapDef[] = [
  {
    key: 'tropical', name: 'Đảo nhiệt đới', icon: '🏝️',
    pts: S([[0, 40, 0], [330, 50, 0], [560, 70, -120], [740, 95, -20], [780, 110, 220], [630, 85, 430], [380, 45, 530], [120, 30, 610], [-150, 58, 570], [-390, 85, 430], [-510, 100, 210], [-450, 66, 50], [-280, 42, 0]]),
    pads: [{ at: 0.3, len: 0.018 }, { at: 0.66, len: 0.018 }], obstacles: [0.22, 0.47, 0.8], shortcut: { at: 0.53, len: 0.012, gain: 350 },
  },
  {
    key: 'snow', name: 'Núi tuyết', icon: '🏔️',
    pts: S([[0, 45, 0], [340, 55, 0], [600, 80, 90], [720, 118, 330], [570, 140, 570], [300, 112, 660], [60, 80, 560], [-150, 98, 700], [-420, 128, 600], [-570, 108, 350], [-520, 78, 130], [-280, 46, 0]]),
    pads: [{ at: 0.28, len: 0.018 }, { at: 0.7, len: 0.018 }], obstacles: [0.2, 0.5, 0.86], shortcut: { at: 0.58, len: 0.012, gain: 375 },
  },
  {
    key: 'city', name: 'Thành phố hiện đại', icon: '🌆',
    pts: S([[0, 40, 0], [330, 45, 0], [570, 55, 150], [610, 62, 410], [420, 72, 590], [150, 55, 630], [-120, 46, 570], [-330, 70, 430], [-430, 85, 210], [-360, 60, 50], [-280, 42, 0]]),
    pads: [{ at: 0.32, len: 0.018 }, { at: 0.68, len: 0.018 }], obstacles: [0.24, 0.5, 0.82], shortcut: { at: 0.56, len: 0.012, gain: 325 },
  },
  {
    key: 'jungle', name: 'Hẻm núi rừng rậm', icon: '🌴',
    pts: S([[0, 40, 0], [330, 45, 0], [580, 55, -80], [770, 60, 100], [730, 70, 360], [520, 52, 530], [260, 38, 570], [60, 55, 730], [-200, 70, 670], [-430, 60, 490], [-490, 55, 230], [-280, 42, 0]]),
    pads: [{ at: 0.27, len: 0.018 }, { at: 0.62, len: 0.018 }], obstacles: [0.21, 0.45, 0.84], shortcut: { at: 0.52, len: 0.012, gain: 375 },
  },
  {
    key: 'desert', name: 'Sa mạc', icon: '🏜️',
    pts: S([[0, 40, 0], [330, 48, 0], [600, 60, -60], [830, 75, 140], [770, 90, 420], [500, 70, 570], [240, 50, 480], [40, 65, 650], [-240, 80, 710], [-470, 95, 500], [-530, 70, 240], [-280, 42, 0]]),
    pads: [{ at: 0.3, len: 0.018 }, { at: 0.7, len: 0.018 }], obstacles: [0.23, 0.5, 0.88], shortcut: { at: 0.6, len: 0.012, gain: 350 },
  },
];
export const mapOf = (k: string) => MAPS.find(m => m.key === k) ?? MAPS[0];
// vị trí trong vòng (0..1) của quãng đường d
export const lapFrac = (d: number, lapLen: number) => (((d / lapLen) % 1) + 1) % 1;

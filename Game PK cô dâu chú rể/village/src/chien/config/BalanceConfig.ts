// Cân bằng và giới hạn hiệu năng. 300 quân là mức mềm; boss luôn được xuất trận tới mức cứng.
export const BALANCE = {
  maxUnits: 300,            // tổng quân đang sống trên sân (mức mềm)
  hardCap: 340,             // boss vẫn được ra tới mức này
  perTeamCap: 160,          // mỗi phe
  maxStack: 10,             // (khi bật gộp cụm) một nhân vật mang x2..x10
  likesPerUnit: 3,          // thả tim: mỗi 3 tim ra 1 Dân binh (0 = tắt). Quân từ tim không góp lực chiến vào quỹ
  likeUnitsMax: 15,         // mỗi người tối đa 15 Dân binh từ tim trong một vòng
  likePendingMax: 40,       // mỗi phe tối đa 40 Dân binh từ tim nằm chờ trong kho; quân từ quà luôn được ra trước
  powerPerXu: 10,           // gọi lính: mỗi xu góp 10 lực chiến vào quỹ trận; hết trận quỹ chia cho đội thắng
  mergeWhenFull: false,     // sân đầy: false = quân dư nằm trong kho rồi ra dần khi có chỗ; true = gộp vào quân cùng loại thành cụm
  spawnPerTickPerTeam: 6,   // mỗi nhịp mỗi phe ra tối đa 6 quân, phần còn lại xếp hàng viện binh (không bỏ)
  laneChangeCd: 10,         // giây giữa hai lần đổi làn của một quân
  laneNeedThreshold: 40,    // chênh lệch sức mạnh (xu tham chiếu) mới đáng đổi làn
  laneSwitchPerTick: 3,     // mỗi phe tối đa 3 quân đổi làn mỗi nhịp
  ai: { hotTicks: 1, warmTicks: 3, coldTicks: 6, hotDist: 9, warmDist: 18 },   // quân gần địch nghĩ mỗi nhịp, xa địch nghĩ thưa hơn
  stuckSec: 3,              // đứng yên quá 3 giây khi đang đi thì đổi chỗ, bỏ mục tiêu
  defendRadius: 7,          // địch vào trong 7 m quanh cổng/nhà là căn cứ bị tấn công
  defendCall: 15,           // quân ở trong 15 m quanh căn cứ nhà mình quay về giữ
  pushStrength: 0.85,       // tách các quân chồng lên nhau
  gravity: 22,
};

// 全域生活健康总览大课表数据矩阵适配器（纯数据解耦自 /data/timetable.json）
import timetableJson from "../../data/timetable.json";

export const TIMETABLE_SLOTS = timetableJson.slots;
export const WEEKDAYS = timetableJson.weekdays;

// 从数据矩阵中按 [星期][时段ID] 毫秒级直接索引，彻底告别数百行 switch-case 冗余代码
export function getTimetableCell(dayName, slotId) {
  const daySchedule = timetableJson.matrix?.[dayName];
  if (daySchedule && daySchedule[slotId]) {
    return daySchedule[slotId];
  }

  return {
    type: "rest",
    badge: "自由安排",
    title: "个人弹性机动时段",
    brief: "根据当日工作进度与精力状况自由调配",
    details: "保持节律，张弛有度。",
    tips: "避免在工位无意识刷手机消耗多巴胺。"
  };
}

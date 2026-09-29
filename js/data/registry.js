// 研途健康看板模块总注册中心 (Registry)
// 方便未来无限横向扩充生活健康各维度的“长期计划”与“执行工具”

export const PLAN_CATEGORIES = [
  { id: "all", label: "全部全域计划" },
  { id: "research", label: "事业与攻坚" },
  { id: "nutrition", label: "饮食与营养" },
  { id: "body", label: "体能与羽球" },
  { id: "routine", label: "工位与作息" },
  { id: "mind", label: "心智与抗压" }
];

export const PLANS_REGISTRY = [
  {
    id: "research_plan",
    category: "research",
    title: "工位深度工作与重点攻坚规程",
    icon: "💼",
    badge: "事业核心",
    summary: "工位专注节奏、深度研读、业务推进与关键汇报全周期闭环。"
  },
  {
    id: "diet_plan",
    category: "nutrition",
    title: "控糖减脂饮食总方案",
    icon: "🥗",
    badge: "健康基石",
    summary: "四餐定时定量、1:1自由替换与外食食堂生存避坑全手册。"
  },
  {
    id: "supplement_plan",
    category: "nutrition",
    title: "工位脑力与微量补剂方案",
    icon: "💊",
    badge: "对症抗衰",
    summary: "针对室内不见阳光、长时用脑用眼的维生素D3/鱼油/镁补充指引。"
  },
  {
    id: "fitness_plan",
    category: "body",
    title: "极简3+2每周体能课表",
    icon: "🏸",
    badge: "精力充沛",
    summary: "适合专注工作节奏的3次抗阻力量+2次操场慢跑+周末羽球，不力竭重在恢复。"
  },
  {
    id: "posture_plan",
    category: "body",
    title: "工位久坐与脊柱抗衰规划",
    icon: "🪑",
    badge: "体态重塑",
    summary: "对抗上交叉综合征（圆肩驼背颈前伸），工位4大微拉伸与人机工学。"
  },
  {
    id: "circadian_plan",
    category: "sleep",
    title: "高效作息与90分钟睡眠节律",
    icon: "🌙",
    badge: "深度修复",
    summary: "锚定晨光昼夜节律、降噪遮光与7.5小时完整周期睡眠。"
  },
  {
    id: "mental_plan",
    category: "mind",
    title: "科研心智韧性与抗压预案",
    icon: "🧠",
    badge: "情绪稳态",
    summary: "导师严厉批评脱敏、拒稿实验归零急救包与Burnout倦怠阻断。"
  }
];

export const TOOLS_REGISTRY = [
  {
    id: "tracker_tool",
    title: "今日健康综合打卡看板",
    icon: "📊",
    badge: "每日必用",
    summary: "一览今日饮食、拉伸、运动完成度与连续打卡活力总分。"
  },
  {
    id: "water_tool",
    title: "工位饮水与补剂记录器",
    icon: "💧",
    badge: "节律打卡",
    summary: "2000ml分段时序打卡，配合常用脑力补剂服用追踪。"
  },
  {
    id: "substitute_tool",
    title: "食物1:1自由替换计算器",
    icon: "🔄",
    badge: "灵活配餐",
    summary: "点选标配食材，一键换算等量平替物与宏量营养素差异。"
  },
  {
    id: "breathing_tool",
    title: "4-7-8迷走神经呼吸训练仪",
    icon: "⏱️",
    badge: "即时减压",
    summary: "交互式呼吸光晕动效与音频引导，睡前工位速效镇静。"
  },
  {
    id: "desk_timer_tool",
    title: "45分钟工位久坐防瘫番茄钟",
    icon: "⏳",
    badge: "工位伴侣",
    summary: "科研倒计时提醒，到点强制触发工位颈椎与胸背拉伸。"
  },
  {
    id: "backup_tool",
    title: "健康数据归档与备份中心",
    icon: "💾",
    badge: "本地隐私",
    summary: "支持打卡数据导出JSON快照及跨设备恢复，100%本地保存。"
  }
];

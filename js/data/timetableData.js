// 研究生健康生活总览大课表数据矩阵 (7天 × 核心时段)
export const TIMETABLE_SLOTS = [
  { id: "slot_0700", label: "早起唤醒", time: "07:00~07:30", category: "water" },
  { id: "slot_0730", label: "营养早餐", time: "07:30~08:30", category: "meal" },
  { id: "slot_0830", label: "上午科研", time: "08:30~10:00", category: "research" },
  { id: "slot_1000", label: "上午加餐", time: "10:00~10:30", category: "meal" },
  { id: "slot_1030", label: "上午攻坚", time: "10:30~11:30", category: "research" },
  { id: "slot_1130", label: "控油午餐", time: "11:30~12:30", category: "meal" },
  { id: "slot_1245", label: "能量午休", time: "12:45~13:15", category: "sleep" },
  { id: "slot_1330", label: "下午实操", time: "13:30~16:00", category: "research" },
  { id: "slot_1600", label: "茶歇微动", time: "16:00~17:30", category: "water" },
  { id: "slot_1730", label: "低脂晚餐", time: "17:30~18:30", category: "meal" },
  { id: "slot_1900", label: "运动训练", time: "19:00~20:30", category: "sport" },
  { id: "slot_2030", label: "文献收尾", time: "20:30~22:30", category: "research" },
  { id: "slot_2230", label: "睡前降温", time: "22:30~23:15", category: "sleep" },
  { id: "slot_2330", label: "熄灯入眠", time: "23:30~07:00", category: "sleep" }
];

export const WEEKDAYS = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

// 对应每周特定运动与特定安排的映射生成
export function getTimetableCell(dayName, slotId) {
  // 1. 晨起唤醒
  if (slotId === "slot_0700") {
    return {
      type: "water",
      badge: "温水300ml",
      title: "晨光锚定 + 唤醒水",
      brief: "温开水300ml + 窗前晒太阳5分钟校准节律",
      details: "补充夜间水分损耗，激活胃肠蠕动与视交叉上核生物钟。",
      tips: "严禁赖床看手机，窗帘拉开让自然光进入视网膜。"
    };
  }

  // 2. 早餐
  if (slotId === "slot_0730") {
    return {
      type: "meal",
      badge: "高蛋白控糖",
      title: "早餐：黑麦面包+牛奶+2水煮蛋",
      brief: "全黑麦面包2片 + 纯牛奶250ml + 2个全蛋",
      details: "优质复合碳水+完全蛋白+脑力胆碱，平稳血糖不犯困。",
      sub: "牛奶↔豆浆300ml/希腊酸奶150g；面包↔原味燕麦片35g",
      tips: "蛋黄必吃；面包配料表首位必须是黑麦粉/全麦粉。"
    };
  }

  // 3. 上午科研深度工作
  if (slotId === "slot_0830") {
    return {
      type: "research",
      badge: "高能脑力区",
      title: "高认知开销科研（推导/难点）",
      brief: "专注论文核心章节、算法架构与公式推导",
      details: "全天皮质醇与警觉度处于峰值，攻坚最艰深、最抗拒的科研硬骨头。",
      tips: "关闭即时通讯群弹窗，开启45分钟工位番茄钟专注。"
    };
  }

  // 4. 上午加餐
  if (slotId === "slot_1000") {
    return {
      type: "meal",
      badge: "必需脂肪酸",
      title: "加餐：原味混合坚果10~15g",
      brief: "原味坚果10~15g + 工位颈椎下颌微回缩",
      details: "补充不饱和脂肪酸与抗氧化VE，缓解用脑紧绷感。",
      sub: "可换为巴旦木8粒或核桃仁2个（4瓣）",
      tips: "严禁抓着吃大罐装，防热量超标；拒绝盐焗糖裹坚果。"
    };
  }

  // 5. 上午攻坚
  if (slotId === "slot_1030") {
    return {
      type: "research",
      badge: "深度产出",
      title: "实验方案细化与文献研读",
      brief: "细化技术路线与实验参数设计，饮水250ml",
      details: "保持沉浸，临近午餐前小口补水增强饱腹感。",
      tips: "工位端坐，坐骨受力，避免身体斜瘫在转椅上。"
    };
  }

  // 6. 午餐
  if (slotId === "slot_1130") {
    if (dayName === "周日") {
      return {
        type: "meal",
        badge: "放纵餐(Cheat)",
        title: "周日特调：计划内放纵餐",
        brief: "聚餐吃想吃的炒菜/牛肉火锅，控饮料，8分饱",
        details: "奖励一周刻苦科研推进，多巴胺充能，重置瘦素代谢。",
        tips: "依然控制米饭半碗，坚决不喝高糖奶茶，吃到8分饱即止。"
      };
    }
    return {
      type: "meal",
      badge: "控油高饱腹",
      title: "午餐：1拳米饭+2蔬菜+自带蛋白",
      brief: "米饭1拳头 + 食堂低油素菜2份 + 自带蛋白1份",
      details: "自带即食鸡胸100g/水浸金枪鱼1罐/酱牛肉70g/去皮卤鸡腿。",
      sub: "素菜用开水轻涮两下，去除表面50%以上浮油",
      tips: "严禁吃地三鲜、烧茄子等过油菜，米饭严格限1拳头。"
    };
  }

  // 7. 能量午休
  if (slotId === "slot_1245") {
    return {
      type: "sleep",
      badge: "微电25分",
      title: "黄金微午休（Power Nap）",
      brief: "佩戴遮光眼罩静卧20~25分钟，清空神经腺苷",
      details: "快速恢复大脑前额叶警觉度与认知敏锐。",
      tips: "绝对不要超过30分钟，防止进入深睡醒后睡眠惯性头晕。"
    };
  }

  // 8. 下午实操
  if (slotId === "slot_1330") {
    return {
      type: "research",
      badge: "代码/实验",
      title: "下午连续实操区（调试/跑数）",
      brief: "代码编写调试、数据清洗、仪器测量测试",
      details: "适合流程确定性高、需要连续操作的事务性学术工作。",
      tips: "每45分钟起身接水一次（目标350ml），防下肢血流淤滞。"
    };
  }

  // 9. 茶歇微动
  if (slotId === "slot_1600") {
    return {
      type: "water",
      badge: "排酸补水",
      title: "下午茶歇：补水350ml + 贴墙拉伸",
      brief: "温水/无糖茶350ml + 贴墙W-Y滑行15次",
      details: "激活中下斜方肌与背阔肌，冲散下午疲乏，促进尿酸排出。",
      tips: "最后一杯含咖啡因饮品必须截断在14:00前。"
    };
  }

  // 10. 晚餐
  if (slotId === "slot_1730") {
    if (dayName === "周日") {
      return {
        type: "meal",
        badge: "轻断食排水肿",
        title: "周日晚特调：轻断食排水肿",
        brief: "水果黄瓜1根 + 水浸金枪鱼1罐 + 多喝清水",
        details: "排出中午放纵餐摄入的多余钠盐，周一清爽无水肿进实验室。",
        tips: "20:30后只饮白开水，早点洗漱准备下周组会。"
      };
    }
    return {
      type: "meal",
      badge: "低GI缓释",
      title: "晚餐：红薯150g+鸡胸肉100g+黄瓜",
      brief: "蒸红薯150g + 即食鸡胸肉100g + 水果黄瓜1~2根",
      details: "低脂低热量，给胃肠充足排空时间，安稳副交感神经。",
      sub: "红薯↔甜玉米1根；黄瓜↔圣女果15~20颗",
      tips: "晚间主食不翻倍；睡前3小时严格禁食（不吃夜宵）。"
    };
  }

  // 11. 晚间运动（重头戏：根据星期几精准排布！）
  if (slotId === "slot_1900") {
    switch (dayName) {
      case "周一":
        return {
          type: "sport",
          badge: "🏃 跑步心肺",
          title: "操场低心率慢跑 (Zone 2)",
          brief: "操场慢跑3~4公里，步频180，心率130~145",
          details: "轻松配速不堆积乳酸，洗刷周末惰性，促进血液携氧，不伤脑力。",
          tips: "落地点在重心正下方，微喘能对话，跑完喝温水。"
        };
      case "周二":
        return {
          type: "sport",
          badge: "🏋️ 力量健身A",
          title: "上肢推拉 + 面拉(护肩袖) + 核心",
          brief: "俯卧撑×4组 + 划船×4组 + 面拉×4组 + 核心",
          details: "重点练背与肩袖外旋肌群，平衡日常含胸，为次日羽毛球大力扣杀打牢肩胛基底。",
          tips: "面拉（Face Pull）护肩神器，切忌用大臂耸肩借力。"
        };
      case "周三":
        return {
          type: "sport",
          badge: "🏸 羽毛球爆发",
          title: "高校球馆羽毛球对抗日（多巴胺狂飙）",
          brief: "7分热身 + 20分拉开 + 60~80分对局比赛",
          details: "高强度间歇，全面释放科研压力，享受与球友竞技快感。",
          tips: "必须穿专业生胶底羽球鞋（严禁跑鞋防崴脚）；打完换干衣服。"
        };
      case "周四":
        return {
          type: "sport",
          badge: "🧘 主动排酸",
          title: "软组织筋膜放松与排酸（主动恢复）",
          brief: "校园快走8000步 + 泡沫轴滚压腿部背部",
          details: "羽毛球次日踝膝与肩手微劳损，严禁高强度跑跳！温和散步排酸。",
          tips: "多喝温水补充电解质，洗个热水澡放松肌肉。"
        };
      case "周五":
        return {
          type: "sport",
          badge: "🏋️ 力量健身B",
          title: "下肢单侧力量 + 提踵(跟腱刚性)",
          brief: "保加利亚蹲×3组 + 单腿硬拉×3组 + 提踵×4组",
          details: "单侧腿部训练纠正羽毛球弓步肌力失衡；提踵强化跟腱弹跳与急停。",
          tips: "动作放慢感受臀肌发力，膝关节不内扣。"
        };
      case "周六":
        return {
          type: "sport",
          badge: "⚡ 跑/球二选一",
          title: "操场节奏跑 或 周末羽毛球交流赛",
          brief: "方案A：约球打双打60分；方案B：慢跑4~5公里",
          details: "周末时间宽裕，自主选择单飞慢跑排汗或与球友球馆切磋。",
          tips: "运动前1小时饮用单份黑咖啡，燃脂代谢倍增。"
        };
      case "周日":
        return {
          type: "sport",
          badge: "☀️ 户外漫游",
          title: "户外公园慢跑/绿道骑行45分钟",
          brief: "阳光慢跑3公里或休闲骑行40分钟，身心重启",
          details: "沐浴自然中波紫外线合成内源性维生素D，彻底放下文献与代码。",
          tips: "享受微风与阳光，不追求心率配速指标。"
        };
    }
  }

  // 12. 文献收尾
  if (slotId === "slot_2030") {
    return {
      type: "research",
      badge: "闭环梳理",
      title: "文献阅读与明日待办清单 (To-do)",
      brief: "梳理明日实验步骤，列出3项核心任务，21:00后禁固体食物",
      details: "将悬而未决的事项写在纸上，防止睡前大脑反复盘旋引起失眠焦虑。",
      tips: "离开实验室回宿舍，彻底与实验台脱钩。"
    };
  }

  // 13. 睡前降温
  if (slotId === "slot_2230") {
    return {
      type: "sleep",
      badge: "神经解压",
      title: "温水淋浴 + 甘氨酸镁 + 数字排毒",
      brief: "温水淋浴诱发核心体温下降，手机放置离床2米，服镁片",
      details: "外周血管舒张散热诱导深度睡意，甘氨酸镁舒缓僵硬颈肩肌肉。",
      tips: "严禁靠在床上刷短视频，床只用于睡觉。"
    };
  }

  // 14. 熄灯入眠
  if (slotId === "slot_2330") {
    return {
      type: "sleep",
      badge: "5个睡眠周期",
      title: "熄灯入眠（保证7.5小时深睡眠）",
      brief: "慢回弹耳塞 + 全遮光眼罩，睡满5个90分钟周期",
      details: "脑脊液脉冲式清除日间代谢的β-淀粉样蛋白与tau蛋白，修复突触记忆。",
      tips: "若躺下25分钟毫无困意，起身在暗光下看干瘪书籍直至哈欠连天再回床。"
    };
  }

  return {
    type: "other",
    badge: "日常",
    title: "自律推进",
    brief: "按计划执行",
    details: "保持节律稳态。"
  };
}

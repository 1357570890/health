// 研途饮食方案与自由轮换数据库
export const DIET_PLAN = [
  {
    id: "breakfast",
    title: "早餐",
    time: "7:30~8:30",
    standard: [
      { name: "全黑麦面包", amount: "2片", tag: "优质复合碳水" },
      { name: "纯牛奶", amount: "250ml", tag: "优质蛋白与钙" },
      { name: "水煮蛋（全蛋）", amount: "2个", tag: "完全蛋白与卵磷脂" }
    ],
    replacements: [
      {
        target: "纯牛奶 250ml",
        options: [
          { name: "无糖豆浆", amount: "300ml", note: "大豆异黄酮，植物蛋白" },
          { name: "无糖希腊酸奶", amount: "150g", note: "高蛋白低乳糖，益生菌" }
        ]
      },
      {
        target: "全黑麦面包 2片",
        options: [
          { name: "快熟原味燕麦片", amount: "35g（开水冲泡）", note: "β-葡聚糖，长效饱腹" }
        ]
      }
    ],
    pitfalls: [
      "蛋黄必须吃（富含胆碱，有助于维持科研高负荷脑力神经递质运转）。",
      "黑麦面包务必检查配料表，排在第一位必须是黑麦粉或全麦粉，拒绝小麦粉冒充。"
    ],
    gradTips: "宿舍若无烹饪条件，可备一个数十元的小蒸蛋器，早上洗漱时5分钟自动煮好鸡蛋。"
  },
  {
    id: "morning_snack",
    title: "上午加餐",
    time: "10:00~10:30",
    standard: [
      { name: "原味混合坚果", amount: "10~15g", tag: "必需不饱和脂肪酸" }
    ],
    replacements: [
      {
        target: "混合坚果 10~15g",
        options: [
          { name: "原味巴旦木", amount: "8粒", note: "富含维生素E与抗氧化成分" },
          { name: "原味核桃仁", amount: "2个（4瓣）", note: "α-亚麻酸，护脑益智" }
        ]
      }
    ],
    pitfalls: [
      "补充必需脂肪酸与微量元素，热量密度极高，严禁抓着吃，严格控制单次分量。",
      "坚决拒绝盐焗、炭烧、蜂蜜裹糖等加工风味坚果。"
    ],
    gradTips: "工位抽屉常备独立小包装（每日坚果），避免大罐装在看论文时无意识过量摄入。"
  },
  {
    id: "lunch",
    title: "午餐",
    time: "11:30~12:30",
    standard: [
      { name: "食堂米饭", amount: "1拳头（约半碗，约120g熟重）", tag: "基础能量" },
      { name: "食堂绿叶/浅色蔬菜", amount: "2份（少油或过水）", tag: "维生素与膳食纤维" },
      { name: "优质蛋白源", amount: "1份", tag: "肌肉维持与高饱腹" }
    ],
    replacements: [
      {
        target: "自带蛋白 1份",
        options: [
          { name: "即食鸡胸肉", amount: "100g", note: "高蛋白极低脂，随拆随吃" },
          { name: "水浸金枪鱼罐头", amount: "1罐（约90g固形物）", note: "优质海洋蛋白与DHA" },
          { name: "常温原味酱牛肉", amount: "70g", note: "高生物价铁与锌，耐饥饿" },
          { name: "去皮卤鸡腿", amount: "1个（食堂/便利店）", note: "剥去外皮即可大幅去油" }
        ]
      }
    ],
    pitfalls: [
      "食堂蔬菜严厉避开地三鲜、干煸豆角、红烧茄子等吸油大户，优先挑清炒白菜/西蓝花。",
      "米饭严格控制在单拳头大小，杜绝饭后血糖骤升导致下午两点工位昏睡困倦。"
    ],
    gradTips: "食堂打餐口诀：1荤（或自带）+2素（绿叶优先）+半碗饭。常备一碗热汤或开水涮油。"
  },
  {
    id: "dinner",
    title: "晚餐",
    time: "17:30~18:30",
    standard: [
      { name: "蒸红薯", amount: "拳头大（约150g）", tag: "低GI缓释碳水" },
      { name: "即食鸡胸肉", amount: "100g", tag: "纯蛋白供给" },
      { name: "水果黄瓜", amount: "1~2根", tag: "高水分饱腹" }
    ],
    replacements: [
      {
        target: "蒸红薯 150g",
        options: [
          { name: "真空甜玉米/糯玉米", amount: "1根", note: "膳食纤维丰富，常温易存放" }
        ]
      },
      {
        target: "水果黄瓜 1~2根",
        options: [
          { name: "圣女果（千禧小番茄）", amount: "15~20颗", note: "番茄红素与维生素C" }
        ]
      }
    ],
    pitfalls: [
      "晚间热量消耗降低，主食分量绝不能翻倍，给胃肠充足排空时间。",
      "睡前3小时严格禁食（若23:30就寝，20:30后只喝清水，禁止夜宵外卖）。"
    ],
    gradTips: "宿舍囤箱装真空玉米或小红薯，微波炉或小电蒸锅加热即食，免去晚间排队排遣烦躁。"
  },
  {
    id: "sunday_special",
    title: "周日特调（心理充电与代谢重置）",
    time: "周日全天安排",
    standard: [
      { name: "周日午餐：计划内放纵餐（Cheat Meal）", amount: "1餐（8分饱）", tag: "多巴胺奖励" },
      { name: "周日晚餐：轻断食排水肿", amount: "低碳原味", tag: "肠胃净化" }
    ],
    replacements: [
      {
        target: "放纵餐选择指南",
        options: [
          { name: "优质潮汕牛肉火锅/烤肉", amount: "控制蘸料麻酱，多瘦肉素菜", note: "高蛋白聚餐" },
          { name: "清淡家常炒菜（聚餐）", amount: "米饭半碗，控含糖饮料", note: "心理满足" }
        ]
      },
      {
        target: "周日晚轻食搭配",
        options: [
          { name: "黄瓜1根 + 水浸金枪鱼1罐", amount: "多喝温水", note: "加速钠离子排出" }
        ]
      }
    ],
    pitfalls: [
      "放纵餐是计划内心理调节，绝非暴饮暴食吃到撑，切记避开高糖奶茶与油炸高脂搭配。",
      "周日晚间多饮水，促进多余盐分代谢，让周一全身清爽无水肿进实验室。"
    ],
    gradTips: "用周日午餐作为一周科研推进顺利的确定性奖励，增强自我效能感。"
  }
];

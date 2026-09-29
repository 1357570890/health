// 全域计划归类与总览中枢容器 (Master Planning Overview & Executive Cockpit)
import { store } from "../../core/store.js";
import { getTodayKey, getTodayDisplay, playGentleChime } from "../../core/utils.js";
import { renderProfileModal } from "../profile/profileModal.js";

export function renderOverviewContainer(onNavigate) {
  const container = document.createElement("div");
  container.className = "space-y-6 animate-in fade-in duration-150";

  const todayStr = getTodayKey();
  const tasks = typeof store.getTasksForDate === "function"
    ? store.getTasksForDate(todayStr)
    : (typeof store.getTasksForToday === "function" ? store.getTasksForToday() : (store.getTasksForSelectedDate ? store.getTasksForSelectedDate() : []));
  const totalCount = tasks.length;
  const doneCount = tasks.filter((t) => t.completed).length;
  const percent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
  const profile = store.getUserProfile();

  // 五大细分领域统计
  const trackStats = {
    research: { label: "学术科研", total: 0, done: 0, tagClass: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800" },
    diet: { label: "营养饮食", total: 0, done: 0, tagClass: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" },
    exercise: { label: "体能羽球", total: 0, done: 0, tagClass: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800" },
    growth: { label: "个人提升", total: 0, done: 0, tagClass: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800" },
    routine: { label: "工位作息", total: 0, done: 0, tagClass: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700" }
  };

  tasks.forEach((t) => {
    let cat = t.category || "routine";
    if (cat === "sport") cat = "exercise";
    if (cat === "habit") cat = "routine";
    const tr = trackStats[cat] || trackStats.routine;
    tr.total += 1;
    if (t.completed) tr.done += 1;
  });

  // 动态推导当前工位实时指引 (Real-time Context Advice)
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeVal = hour + minute / 60;
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const dayName = weekdays[now.getDay()];

  let adviceTitle = "工位专注科研推进";
  let adviceDesc = "开启45分钟无干扰专注块，坐姿挺直，分段小口补水。";
  let adviceTag = "科研专注";
  let targetSlotId = "slot_0830";

  if (timeVal >= 7.0 && timeVal < 8.5) {
    adviceTitle = "高蛋白控糖早餐";
    adviceDesc = "全黑麦面包2片 + 纯牛奶250ml + 水煮蛋2个（蛋黄必吃补充胆碱）。可换无糖豆浆300ml/生燕麦35g。";
    adviceTag = "营养早餐";
    targetSlotId = "slot_0730";
  } else if (timeVal >= 8.5 && timeVal < 10.0) {
    adviceTitle = "上午高难度科研攻坚";
    adviceDesc = "皮质醇与警觉度峰值区：攻坚算法难点与公式推导，关闭社交弹窗，专注45分钟番茄钟。";
    adviceTag = "学术攻坚";
    targetSlotId = "slot_0830";
  } else if (timeVal >= 10.0 && timeVal < 10.5) {
    adviceTitle = "上午坚果加餐与工位微伸展";
    adviceDesc = "原味坚果10~15g（8颗巴旦木或2个核桃）+ 颈椎下颌微回缩10次，缓解用脑紧绷感。";
    adviceTag = "能量加餐";
    targetSlotId = "slot_1000";
  } else if (timeVal >= 10.5 && timeVal < 11.5) {
    adviceTitle = "实验细化与导师沟通准备";
    adviceDesc = "事实与情绪解耦，提问题务必自带2个具体备选方案。临近午餐补水250ml。";
    adviceTag = "科研推进";
    targetSlotId = "slot_1030";
  } else if (timeVal >= 11.5 && timeVal < 12.75) {
    adviceTitle = "食堂午餐战术执行";
    adviceDesc = `米饭严格控制1拳头 + 低油蔬菜2份（开水轻涮浮油） + 开自带高蛋白（${profile.diet?.lunchProtein || "即食鸡胸肉100g"}）。先吃菜肉后米饭，饭后不犯困！`;
    adviceTag = "控糖午餐";
    targetSlotId = "slot_1130";
  } else if (timeVal >= 12.75 && timeVal < 13.5) {
    adviceTitle = "黄金能量微午休（20~25分钟）";
    adviceDesc = "佩戴眼罩静卧20分钟清空腺苷，防止深睡醒后头晕。随餐随水补充深海鱼油。";
    adviceTag = "精力复位";
    targetSlotId = "slot_1245";
  } else if (timeVal >= 13.5 && timeVal < 15.0) {
    adviceTitle = "午后黑咖啡与代码调试";
    adviceDesc = "饮用黑咖啡1杯（200~250ml）。⚠️ 15:00咖啡因锁死红线前抓紧享用，保护夜间深度睡眠！";
    adviceTag = "代码实操";
    targetSlotId = "slot_1330";
  } else if (timeVal >= 15.0 && timeVal < 17.5) {
    adviceTitle = "下午实操推进与贴墙拉伸";
    adviceDesc = "代码编写、数据清洗与文献研读。已过15:00严禁饮用咖啡因！做贴墙W-Y滑行15次激活背肌。";
    adviceTag = "下午冲刺";
    targetSlotId = "slot_1600";
  } else if (timeVal >= 17.5 && timeVal < 18.75) {
    adviceTitle = "晚餐低GI控能摄入";
    adviceDesc = "蒸红薯150g（或真空玉米1根）+ 即食鸡胸肉100g + 水果黄瓜1根。睡前3小时严格禁食（20:30后只喝清水）。";
    adviceTag = "轻盈晚餐";
    targetSlotId = "slot_1730";
  } else if (timeVal >= 18.75 && timeVal < 20.75) {
    if (["周一", "周三", "周五"].includes(dayName)) {
      adviceTitle = "今日体能：力量抗阻训练日";
      adviceDesc = "俯卧撑×4组 + 坐姿划船×4组 + 面拉(护肩袖)×4组 + 核心抗旋转。为周末羽球大力杀球筑牢肩胛基底。";
      adviceTag = "力量健身";
    } else if (["周二", "周四"].includes(dayName)) {
      adviceTitle = `今日体能：操场低心率慢跑 (${profile.exercise?.runDistanceKm || "4公里"})`;
      adviceDesc = "Zone 2心率慢跑，步频180，全脚掌滚动着地。微喘能交谈，跑后小口补水做小腿拉伸。";
      adviceTag = "慢跑心肺";
    } else if (dayName === "周六") {
      adviceTitle = `今日实战：高校球馆羽毛球对抗 (${profile.exercise?.badmintonDuration || "90分钟"})`;
      adviceDesc = "穿专业生胶底羽球鞋（严禁跑鞋防崴脚）！打前动态热身7分钟，高燃对局彻底释放学术压力。";
      adviceTag = "羽球实战";
    } else {
      adviceTitle = "周日身心重启与主动排酸";
      adviceDesc = "羽毛球切磋或公园阳光漫游，享受微风与阳光，彻底放下文献与代码，重置身心状态。";
      adviceTag = "主动恢复";
    }
    targetSlotId = "slot_1900";
  } else if (timeVal >= 20.75 && timeVal < 22.5) {
    adviceTitle = "晚间复盘与学术表达积累";
    adviceDesc = "学术英文表达积累10条、梳理明日实验待办3项。20:30后禁止摄入固体食物。";
    adviceTag = "学术复盘";
    targetSlotId = "slot_2030";
  } else if (timeVal >= 22.5 && timeVal < 23.5) {
    adviceTitle = "睡前降温与褪黑素节律保护";
    adviceDesc = "远离蓝光屏幕，做4-7-8呼吸训练3组。目标23:30准时熄灯，锁定5个完整90分钟睡眠周期。";
    adviceTag = "睡前准备";
    targetSlotId = "slot_2230";
  } else {
    adviceTitle = "深度睡眠与脑部排毒恢复";
    adviceDesc = "生长激素分泌与脑脊液清空代谢废物。保持黑暗环境安睡，明天继续掌控全天！";
    adviceTag = "修复睡眠";
    targetSlotId = "slot_2330";
  }

  container.innerHTML = `
    <!-- 1. 顶部总览驾驶舱 (极简专业质感) -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-700/80 shadow-sm transition-all space-y-5">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
              ${profile.stage || "在读研究生 · 工位坐班模式"}
            </span>
            <span class="text-xs text-slate-400 font-mono">${getTodayDisplay()}</span>
          </div>
          <h2 class="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            今日全域规划与工位执行
          </h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            学术科研 · 控糖减脂 · 3+2体能与羽球 · 身心作息一体化管理
          </p>
        </div>

        <!-- 完成度与快捷执行工作台入口 -->
        <div class="flex items-center gap-4 bg-slate-50 dark:bg-slate-750/70 px-4 py-3 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
          <div class="space-y-0.5">
            <span class="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">今日闭环进度</span>
            <div class="flex items-baseline space-x-2">
              <span class="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">${percent}%</span>
              <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">${doneCount}/${totalCount} 项</span>
            </div>
            <div class="w-28 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1">
              <div class="h-full bg-emerald-500 rounded-full transition-all duration-500" style="width: ${percent}%;"></div>
            </div>
          </div>

          <button id="go-today-action-btn" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs transition-all shadow-sm shrink-0">
            进入执行清单 →
          </button>
        </div>
      </div>

      <!-- 2. 此刻工位向导 (Real-Time Dynamic Advice Banner) -->
      <div class="p-4 rounded-xl bg-slate-50/90 dark:bg-slate-750/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex items-center space-x-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-xs font-bold text-slate-900 dark:text-white">此刻工位专属向导 · ${adviceTag}</span>
          </div>
          <span class="text-[11px] text-slate-400 font-medium">${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} 实时匹配</span>
        </div>
        <div>
          <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100">${adviceTitle}</h4>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">${adviceDesc}</p>
        </div>

        <!-- 专属极速打卡与操作条 -->
        <div class="pt-2 border-t border-slate-200/50 dark:border-slate-700/40 flex flex-wrap items-center justify-between gap-2">
          <div class="flex flex-wrap items-center gap-1.5 text-xs">
            <button id="quick-check-current" data-slot="${targetSlotId}" class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-all shadow-sm">
              ✓ 打卡当前环节
            </button>
            <button id="quick-drink-water" class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
              喝水250ml
            </button>
            <button id="quick-desk-stretch" class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
              工位微伸展
            </button>
            <button id="quick-protein" class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
              吃自带蛋白
            </button>
          </div>

          <button id="open-profile-btn" class="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 underline font-medium">
            修改我的个人偏好 →
          </button>
        </div>
      </div>

      <!-- 快捷入口索引 -->
      <div class="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span class="text-slate-400 font-medium">快速导航</span>
        <div class="flex flex-wrap items-center gap-2">
          <button id="btn-quick-timetable" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-all">
            7天全景大课表
          </button>
          <button id="btn-quick-plans" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-all">
            饮食与运动规程
          </button>
          <button id="btn-quick-tools" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-all">
            效率与健康工具箱
          </button>
        </div>
      </div>
    </div>

    <!-- 3. 五大核心细分专区 (Domain Portals) -->
    <div class="space-y-3.5">
      <div>
        <h3 class="text-base font-bold text-slate-900 dark:text-white">
          计划分类中心
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400">细分专区独立规划与执行流，条理分明</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- 专区 1：学术科研与实验室攻坚 -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col justify-between space-y-4 shadow-sm">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-md border ${trackStats.research.tagClass}">
                学术科研
              </span>
              <span class="text-xs text-slate-400 font-medium">
                ${trackStats.research.done}/${trackStats.research.total} 已完成
              </span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white">
              实验室工位科研攻坚
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              工位坐班模式、代码实验推进、顶会论文精读、大论文撰写与组会汇报备忘。
            </p>
          </div>
          <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <button data-action="plan" data-sub="research_plan" class="text-slate-900 dark:text-slate-100 font-semibold hover:underline">
              查看科研规程 →
            </button>
            <button data-action="daily-filter" data-track="research" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium text-slate-700 dark:text-slate-200">
              今日待办
            </button>
          </div>
        </div>

        <!-- 专区 2：科学营养与控糖饮食 -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col justify-between space-y-4 shadow-sm">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-md border ${trackStats.diet.tagClass}">
                营养饮食
              </span>
              <span class="text-xs text-slate-400 font-medium">
                ${trackStats.diet.done}/${trackStats.diet.total} 已完成
              </span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white">
              科学控糖饮食体系
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              全黑麦与双全蛋早餐、食堂1拳米饭+2份素菜、自带即食高蛋白与15:00黑咖啡截止。
            </p>
          </div>
          <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <button data-action="plan" data-sub="diet_plan" class="text-slate-900 dark:text-slate-100 font-semibold hover:underline">
              四餐饮食方案 →
            </button>
            <button data-action="tool" data-sub="substitute_tool" class="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 font-medium">
              平替计算器
            </button>
          </div>
        </div>

        <!-- 专区 3：体能健身与运动爱好 -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col justify-between space-y-4 shadow-sm">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-md border ${trackStats.exercise.tagClass}">
                体能羽球
              </span>
              <span class="text-xs text-slate-400 font-medium">
                ${trackStats.exercise.done}/${trackStats.exercise.total} 已完成
              </span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white">
              3+2体能与羽球实战
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              周一三五力量抗阻护肩、周二四操场4公里慢跑、周末高校球馆羽毛球90分钟对抗。
            </p>
          </div>
          <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <button data-action="plan" data-sub="fitness_plan" class="text-slate-900 dark:text-slate-100 font-semibold hover:underline">
              3+2体能课表 →
            </button>
            <button data-action="daily-filter" data-track="exercise" class="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 text-amber-700 dark:text-amber-300 font-medium">
              运动打卡
            </button>
          </div>
        </div>

        <!-- 专区 4：个人进阶与技能提升 -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col justify-between space-y-4 shadow-sm">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-md border ${trackStats.growth.tagClass}">
                个人进阶
              </span>
              <span class="text-xs text-slate-400 font-medium">
                ${trackStats.growth.done}/${trackStats.growth.total} 已完成
              </span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white">
              技能提升与自学进阶
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              学术外刊地道表达句式积累、工程技术实操沉淀与复盘，打造长周期复利。
            </p>
          </div>
          <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <button data-action="daily-filter" data-track="growth" class="text-slate-900 dark:text-slate-100 font-semibold hover:underline">
              今日提升任务 →
            </button>
            <button data-action="daily-filter" data-track="growth" class="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-medium">
              打卡记录
            </button>
          </div>
        </div>

        <!-- 专区 5：工位作息与身心精力 -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col justify-between space-y-4 shadow-sm">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-md border ${trackStats.routine.tagClass}">
                工位作息
              </span>
              <span class="text-xs text-slate-400 font-medium">
                ${trackStats.routine.done}/${trackStats.routine.total} 已完成
              </span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white">
              工位健康与精力管理
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              45分钟工位微伸展(下颌微回缩+扩胸)、2000ml分段补水、90分钟睡眠节律与4-7-8呼吸。
            </p>
          </div>
          <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <button data-action="tool" data-sub="desk_timer_tool" class="text-slate-900 dark:text-slate-100 font-semibold hover:underline">
              久坐番茄钟 →
            </button>
            <button data-action="tool" data-sub="water_tool" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-medium">
              分段饮水
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // 绑定事件
  container.querySelector("#go-today-action-btn")?.addEventListener("click", () => {
    onNavigate("daily");
  });

  container.querySelector("#btn-quick-timetable")?.addEventListener("click", () => {
    onNavigate("timetable");
  });

  container.querySelector("#btn-quick-plans")?.addEventListener("click", () => {
    onNavigate("plans");
  });

  container.querySelector("#btn-quick-tools")?.addEventListener("click", () => {
    onNavigate("tools");
  });

  // 打开个人偏好设置
  container.querySelector("#open-profile-btn")?.addEventListener("click", () => {
    const modal = renderProfileModal();
    document.body.appendChild(modal);
  });

  // 快捷打卡当前环节
  container.querySelector("#quick-check-current")?.addEventListener("click", () => {
    const matchingTask = tasks.find((t) => t.id === `fixed_${targetSlotId}`);
    if (matchingTask) {
      store.toggleTask(matchingTask.id, todayStr);
    } else {
      store.addTask({
        title: adviceTitle,
        category: "routine",
        time: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
        details: adviceDesc
      }, todayStr);
    }
    playGentleChime(784, 0.15);
  });

  // 喝水250ml
  container.querySelector("#quick-drink-water")?.addEventListener("click", () => {
    store.addTask({
      title: "补充温水250ml",
      category: "routine",
      time: "随时",
      details: "促进体内代谢与尿酸排出"
    }, todayStr);
    playGentleChime(659.25, 0.15);
  });

  // 工位微伸展
  container.querySelector("#quick-desk-stretch")?.addEventListener("click", () => {
    store.addTask({
      title: "工位微伸展（下颌回缩10次+门框拉伸30秒）",
      category: "routine",
      time: "工位间歇",
      details: "激活颈屈肌与菱形肌，复位肩胛骨"
    }, todayStr);
    playGentleChime(523.25, 0.15);
  });

  // 吃自带蛋白
  container.querySelector("#quick-protein")?.addEventListener("click", () => {
    store.addTask({
      title: `补充自带高蛋白（${profile.diet?.lunchProtein || "即食鸡胸肉100g"}）`,
      category: "diet",
      time: "餐前/餐中",
      details: "摄入约25g纯蛋白质，维持肌肉与饱腹"
    }, todayStr);
    playGentleChime(880, 0.15);
  });

  container.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const act = btn.getAttribute("data-action");
      const sub = btn.getAttribute("data-sub");
      if (act === "plan") {
        onNavigate("plans", sub);
      } else if (act === "tool") {
        onNavigate("tools", sub);
      } else if (act === "daily-filter") {
        onNavigate("daily");
      }
    });
  });

  return container;
}

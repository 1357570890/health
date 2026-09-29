// 工位总览驾驶舱与实时向导模块 (Overview Header & Real-time Advice Cockpit)
import { store } from "../../core/store.js";
import { getTodayKey, getTodayDisplay, playGentleChime } from "../../core/utils.js";
import { renderProfileModal } from "../profile/profileModal.js";

export function renderOverviewCockpit(onNavigate) {
  const container = document.createElement("div");
  container.className = "bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-700/80 shadow-sm transition-all space-y-5";

  const todayStr = getTodayKey();
  const tasks = store.getTasksForDate(todayStr);
  const totalCount = tasks.length;
  const doneCount = tasks.filter((t) => t.completed).length;
  const percent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
  const profile = store.getUserProfile();

  // 动态推导当前工位实时指引
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeVal = hour + minute / 60;
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const dayName = weekdays[now.getDay()];

  let adviceTitle = "深度专注工作攻坚";
  let adviceDesc = "开启45分钟无干扰专注块，坐姿挺直，分段小口补水。";
  let adviceTag = "深度专注";
  let targetSlotId = "slot_0830";

  if (timeVal >= 7.0 && timeVal < 8.5) {
    adviceTitle = "高蛋白控糖早餐";
    adviceDesc = "全黑麦面包2片 + 纯牛奶250ml + 水煮蛋2个。可换无糖豆浆300ml/生燕麦35g。";
    adviceTag = "营养早餐";
    targetSlotId = "slot_0730";
  } else if (timeVal >= 8.5 && timeVal < 10.0) {
    adviceTitle = "上午高认知深度攻坚";
    adviceDesc = "皮质醇与警觉度峰值区：攻坚业务难点与关键架构，关闭社交弹窗，专注45分钟番茄钟。";
    adviceTag = "深度攻坚";
    targetSlotId = "slot_0830";
  } else if (timeVal >= 10.0 && timeVal < 10.5) {
    adviceTitle = "坚果加餐与工位微伸展";
    adviceDesc = "原味坚果10~15g（8颗巴旦木或2个核桃）+ 颈椎下颌微回缩10次，缓解用脑紧绷感。";
    adviceTag = "能量加餐";
    targetSlotId = "slot_1000";
  } else if (timeVal >= 10.5 && timeVal < 11.5) {
    adviceTitle = "重点事项攻坚与汇报准备";
    adviceDesc = "事实与情绪解耦，提问题务必自带2个具体备选方案。临近午餐补水250ml。";
    adviceTag = "关键推进";
    targetSlotId = "slot_1030";
  } else if (timeVal >= 11.5 && timeVal < 12.75) {
    adviceTitle = "食堂午餐战术执行";
    adviceDesc = `米饭严格控制1拳头 + 低油蔬菜2份（开水轻涮浮油） + 自带高蛋白（${profile.diet?.lunchProtein || "即食鸡胸肉100g"}）。先吃菜肉后米饭，午后不犯困！`;
    adviceTag = "控糖午餐";
    targetSlotId = "slot_1130";
  } else if (timeVal >= 12.75 && timeVal < 13.5) {
    adviceTitle = "黄金能量微午休（20~25分钟）";
    adviceDesc = "佩戴眼罩静卧20分钟清空腺苷，防止深睡醒后头晕。随餐随水补充深海鱼油。";
    adviceTag = "精力复位";
    targetSlotId = "slot_1245";
  } else if (timeVal >= 13.5 && timeVal < 15.0) {
    adviceTitle = "午后黑咖啡与代码实操";
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
      adviceDesc = "俯卧撑×4组 + 坐姿划船×4组 + 面拉(护肩袖)×4组 + 核心死虫式。为周末羽球大力杀球筑牢肩胛基底。";
      adviceTag = "力量健身";
    } else if (["周二", "周四"].includes(dayName)) {
      adviceTitle = `今日体能：操场低心率慢跑 (${profile.exercise?.runDistanceKm || "4公里"})`;
      adviceDesc = "Zone 2心率慢跑，步频180，全脚掌滚动着地。微喘能交谈，跑后小口补水做小腿拉伸。";
      adviceTag = "慢跑心肺";
    } else if (dayName === "周六") {
      adviceTitle = `今日实战：球馆羽毛球对抗 (${profile.exercise?.badmintonDuration || "90分钟"})`;
      adviceDesc = "穿专业生胶底羽球鞋（严禁跑鞋防崴脚）！打前动态热身7分钟，高燃对局彻底释放工作脑力压力。";
      adviceTag = "羽球实战";
    } else {
      adviceTitle = "周日身心重启与主动排酸";
      adviceDesc = "羽毛球切磋或公园阳光漫游，享受微风与阳光，彻底放下工作与屏幕，重置身心状态。";
      adviceTag = "主动恢复";
    }
    targetSlotId = "slot_1900";
  } else if (timeVal >= 20.75 && timeVal < 22.5) {
    adviceTitle = "晚间复盘与知识复利积累";
    adviceDesc = "沉淀关键知识表达、梳理明日核心待办3项。20:30后禁止摄入固体食物。";
    adviceTag = "晚间复盘";
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
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="flex items-center space-x-2">
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
            ${profile.stage || "专注工作与工位自律模式"}
          </span>
          <span class="text-xs text-slate-400 font-mono">${getTodayDisplay()}</span>
        </div>
        <h2 class="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          今日全域规划与工位执行中枢
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          工位本职攻坚 · 科学控糖饮食 · 3+2体能与羽球 · 终身高效自律
        </p>
      </div>

      <!-- 完成度与快捷执行工作台入口 -->
      <div class="flex items-center gap-4 bg-slate-50 dark:bg-slate-750/70 px-4 py-3 rounded-xl border border-slate-200/70 dark:border-slate-700/60 shrink-0">
        <div class="space-y-0.5">
          <span class="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">今日完成进度</span>
          <div class="flex items-baseline space-x-2">
            <span class="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">${percent}%</span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">${doneCount}/${totalCount} 项</span>
          </div>
          <div class="w-28 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1">
            <div class="h-full bg-emerald-500 rounded-full transition-all duration-500" style="width: ${percent}%;"></div>
          </div>
        </div>

        <button id="go-today-action-btn" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs transition-all shadow-sm shrink-0">
          每日时间轴 ➔
        </button>
      </div>
    </div>

    <!-- 实时向导 -->
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

      <!-- 专属极速打卡条 -->
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
          配置个人目标 →
        </button>
      </div>
    </div>

    <!-- 快捷入口索引 -->
    <div class="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
      <span class="text-slate-400 font-medium">全域直达导航</span>
      <div class="flex flex-wrap items-center gap-2">
        <button id="btn-quick-timetable" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-all">
          📅 7天全周课表
        </button>
        <button id="btn-quick-diet" class="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-medium transition-all">
          🥗 饮食控糖规程
        </button>
        <button id="btn-quick-workout" class="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-medium transition-all">
          🏋️ 健身与羽毛球
        </button>
        <button id="btn-quick-tools" class="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 font-medium transition-all">
          🧰 实用工具箱
        </button>
      </div>
    </div>
  `;

  // 绑定事件
  container.querySelector("#go-today-action-btn")?.addEventListener("click", () => onNavigate("daily"));
  container.querySelector("#btn-quick-timetable")?.addEventListener("click", () => onNavigate("timetable"));
  container.querySelector("#btn-quick-diet")?.addEventListener("click", () => onNavigate("plans", "diet_plan"));
  container.querySelector("#btn-quick-workout")?.addEventListener("click", () => onNavigate("plans", "fitness_plan"));
  container.querySelector("#btn-quick-tools")?.addEventListener("click", () => onNavigate("tools"));

  container.querySelector("#open-profile-btn")?.addEventListener("click", () => {
    const modal = renderProfileModal();
    document.body.appendChild(modal);
  });

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

  container.querySelector("#quick-drink-water")?.addEventListener("click", () => {
    store.addTask({
      title: "补充温水250ml",
      category: "routine",
      time: "随时",
      details: "促进体内代谢与尿酸排出"
    }, todayStr);
    playGentleChime(659.25, 0.15);
  });

  container.querySelector("#quick-desk-stretch")?.addEventListener("click", () => {
    store.addTask({
      title: "工位微伸展（下颌回缩10次+门框拉伸30秒）",
      category: "routine",
      time: "工位间歇",
      details: "激活颈屈肌与菱形肌，复位肩胛骨"
    }, todayStr);
    playGentleChime(523.25, 0.15);
  });

  container.querySelector("#quick-protein")?.addEventListener("click", () => {
    store.addTask({
      title: `补充自带高蛋白（${profile.diet?.lunchProtein || "即食鸡胸肉100g"}）`,
      category: "diet",
      time: "餐前/餐中",
      details: "摄入约25g纯蛋白质，维持肌肉与饱腹"
    }, todayStr);
    playGentleChime(880, 0.15);
  });

  return container;
}

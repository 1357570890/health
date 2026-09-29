// 全域计划归类与总览中枢容器 (Master Planning Overview & Domain Portals)
import { store } from "../../core/store.js?v=3";
import { getTodayKey, getTodayDisplay } from "../../core/utils.js?v=3";
import { PLANS_REGISTRY, TOOLS_REGISTRY } from "../../data/registry.js?v=3";

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

  container.innerHTML = `
    <!-- 1. 顶部总览驾驶舱 (极简专业质感) -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-700/80 shadow-sm transition-all">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-1.5">
          <div class="flex items-center space-x-2.5">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
              规划总控
            </span>
            <span class="text-xs text-slate-400 font-mono">${getTodayDisplay()}</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            今日全域执行概况
          </h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
            科研工位坐班、科学饮食、体能羽球与身心作息一体化管理，把控长周期执行闭环。
          </p>
        </div>

        <!-- 完成度数据条目 -->
        <div class="flex items-center gap-4 sm:gap-6 bg-slate-50 dark:bg-slate-750/70 px-5 py-4 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
          <div class="space-y-0.5">
            <span class="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">今日完成度</span>
            <div class="flex items-baseline space-x-2">
              <span class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">${percent}%</span>
              <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">${doneCount}/${totalCount} 项</span>
            </div>
            <!-- 极简进度条 -->
            <div class="w-32 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1.5">
              <div class="h-full bg-emerald-500 rounded-full transition-all duration-500" style="width: ${percent}%;"></div>
            </div>
          </div>

          <button id="go-today-action-btn" class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs transition-all shadow-sm shrink-0">
            进入执行工作台 →
          </button>
        </div>
      </div>

      <!-- 快捷入口索引 -->
      <div class="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span class="text-slate-400 font-medium">快速导航</span>
        <div class="flex flex-wrap items-center gap-2">
          <button id="btn-quick-timetable" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-all">
            7天×14时段 全景大课表
          </button>
          <button id="btn-quick-plans" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-all">
            全域计划规程库
          </button>
          <button id="btn-quick-tools" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-all">
            效率与健康工具箱
          </button>
        </div>
      </div>
    </div>

    <!-- 2. 全域计划五大核心细分专区 (Domain Portals) -->
    <div class="space-y-3.5">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">
            计划分类中心
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">各领域独立规划与执行流，互不干扰</p>
        </div>
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
              工位坐班模式、实验排期推进、文献精读归档、大论文撰写与组会汇报备忘。
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
              早中晚四餐定量标配、1:1自由平替备选库、高校食堂控油避坑与微量补剂方案。
            </p>
          </div>
          <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <button data-action="plan" data-sub="diet_plan" class="text-slate-900 dark:text-slate-100 font-semibold hover:underline">
              查看四餐饮食方案 →
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
              体能健身与羽球爱好
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              3+2抗阻体能周课表（周一三五力量）、周二四操场4公里慢跑、周末羽毛球球友局与防伤。
            </p>
          </div>
          <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <button data-action="plan" data-sub="fitness_plan" class="text-slate-900 dark:text-slate-100 font-semibold hover:underline">
              查看3+2体能课表 →
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
              每日学术外刊精读、系统代码工程实操、深度技能构建与复盘笔记，打造长期复利。
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
              45分钟工位久坐微拉伸防瘫、90分钟睡眠节律、2000ml分段补水与4-7-8迷走神经呼吸训练。
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

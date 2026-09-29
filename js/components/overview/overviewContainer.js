// 全域计划归类与总览中枢容器 (Master Planning Overview & Domain Portals)
import { store } from "../../core/store.js";
import { getTodayKey, getTodayDisplay } from "../../core/utils.js?v=2";
import { PLANS_REGISTRY, TOOLS_REGISTRY } from "../../data/registry.js";

export function renderOverviewContainer(onNavigate) {
  const container = document.createElement("div");
  container.className = "space-y-6 sm:space-y-8 animate-in fade-in duration-200";

  const todayStr = getTodayKey();
  const tasks = store.getTasksForDate(todayStr);
  const totalCount = tasks.length;
  const doneCount = tasks.filter((t) => t.completed).length;
  const percent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  // 五大细分领域统计
  const trackStats = {
    research: { label: "科研攻坚", icon: "🧪", total: 0, done: 0, color: "indigo" },
    diet: { label: "科学饮食", icon: "🥗", total: 0, done: 0, color: "emerald" },
    exercise: { label: "体能羽球", icon: "🏃", total: 0, done: 0, color: "amber" },
    growth: { label: "个人提升", icon: "📚", total: 0, done: 0, color: "blue" },
    routine: { label: "工位作息", icon: "⏰", total: 0, done: 0, color: "rose" }
  };

  tasks.forEach((t) => {
    let cat = t.category || "routine";
    if (cat === "sport") cat = "exercise";
    if (cat === "habit") cat = "routine";
    const tr = trackStats[cat] || trackStats.routine;
    tr.total += 1;
    if (t.completed) tr.done += 1;
  });

  // 获取当前星期
  const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const weekDayName = weekDays[new Date().getDay()];

  container.innerHTML = `
    <!-- 1. 顶部全域规划总览驾驶舱 -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-slate-700/50">
      <div class="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute right-20 -top-10 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-2">
          <div class="flex items-center space-x-2">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              🧭 研途全域规划中枢 · 总控看板
            </span>
            <span class="text-xs text-slate-400 font-mono">${getTodayDisplay()}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-white">
            今日全域规划执行总览
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            以长周期科研自律为核心，融合控糖饮食、体能训练、个人进阶与作息管理。五维协同，清晰把控每一阶段。
          </p>
        </div>

        <!-- 今日完成度综合大卡片 -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 flex items-center space-x-5 min-w-[240px]">
          <div class="relative flex items-center justify-center">
            <svg class="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="6" class="text-white/20" fill="transparent" />
              <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="6" class="text-emerald-400 transition-all duration-700" stroke-linecap="round" fill="transparent" stroke-dasharray="175.9" stroke-dashoffset="${175.9 - (175.9 * percent) / 100}" />
            </svg>
            <span class="absolute text-sm font-black text-white">${percent}%</span>
          </div>
          <div class="space-y-1">
            <span class="text-xs text-slate-300 font-semibold block">今日全域完成度</span>
            <div class="text-lg font-black text-white">
              <span>${doneCount}</span>
              <span class="text-xs text-slate-400 font-normal"> / ${totalCount} 项完成</span>
            </div>
            <button id="go-today-action-btn" class="mt-1 px-3 py-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1">
              <span>⚡</span>
              <span>进入执行工作台</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 快速跳转大表与工具 -->
      <div class="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span class="text-slate-400">快速导航：</span>
        <div class="flex flex-wrap items-center gap-2">
          <button id="btn-quick-timetable" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center space-x-1.5">
            <span>🎓</span>
            <span>7天×14时段 全景大课表</span>
          </button>
          <button id="btn-quick-plans" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center space-x-1.5">
            <span>📋</span>
            <span>全域计划规程库</span>
          </button>
          <button id="btn-quick-tools" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center space-x-1.5">
            <span>🧰</span>
            <span>效率与健康工具箱</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 2. 全域计划五大核心细分专区 (Domain Portals) -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center space-x-2">
            <span>🗂️</span>
            <span>全域计划分类矩阵</span>
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">健康饮食、健身运动、科研攻坚均为一级平行规划模块</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <!-- 专区 1：科研与实验室攻坚 -->
        <div class="group bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all space-y-3.5 flex flex-col justify-between">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-lg font-bold">
                🧪
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                今日 ${trackStats.research.done}/${trackStats.research.total}
              </span>
            </div>
            <h4 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
              学术科研与实验室攻坚
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              工位坐班模式、实验排期流、顶会精读、大论文攻坚与组会汇报规程，避免陷入被动救火。
            </p>
          </div>
          <div class="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <button data-action="plan" data-sub="mental_plan" class="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
              查看科研抗压规程 ➜
            </button>
            <button data-action="daily-filter" data-track="research" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 font-bold hover:bg-slate-200 text-slate-700 dark:text-slate-200">
              今日待办
            </button>
          </div>
        </div>

        <!-- 专区 2：科学营养与控糖饮食 -->
        <div class="group bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all space-y-3.5 flex flex-col justify-between">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-lg font-bold">
                🥗
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                今日 ${trackStats.diet.done}/${trackStats.diet.total}
              </span>
            </div>
            <h4 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
              科学营养与控糖饮食
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              早中晚加餐定量标配、1:1自由平替备选库、食堂避坑指南、周日特调与微量营养补剂方案。
            </p>
          </div>
          <div class="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <button data-action="plan" data-sub="diet_plan" class="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
              查看四餐饮食方案 ➜
            </button>
            <button data-action="tool" data-sub="substitute_tool" class="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold hover:bg-emerald-100">
              1:1平替计算
            </button>
          </div>
        </div>

        <!-- 专区 3：体能健身与运动爱好 -->
        <div class="group bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all space-y-3.5 flex flex-col justify-between">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 flex items-center justify-center text-lg font-bold">
                🏃
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                今日 ${trackStats.exercise.done}/${trackStats.exercise.total}
              </span>
            </div>
            <h4 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
              体能健身与羽球爱好
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              3+2抗阻体能循环（周一三五力量）、周二四操场4公里慢跑、周末羽毛球球友局专项防伤。
            </p>
          </div>
          <div class="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <button data-action="plan" data-sub="fitness_plan" class="text-amber-600 dark:text-amber-400 font-bold hover:underline">
              查看3+2体能课表 ➜
            </button>
            <button data-action="daily-filter" data-track="exercise" class="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold hover:bg-amber-100">
              运动打卡
            </button>
          </div>
        </div>

        <!-- 专区 4：个人进阶与技能提升 -->
        <div class="group bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all space-y-3.5 flex flex-col justify-between">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 flex items-center justify-center text-lg font-bold">
                📚
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                今日 ${trackStats.growth.done}/${trackStats.growth.total}
              </span>
            </div>
            <h4 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
              个人进阶与技能提升
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              每日学术外刊精读、代码架构实操演练、综合技能跃迁与深度复盘笔记，打造长期复利。
            </p>
          </div>
          <div class="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <button data-action="daily-filter" data-track="growth" class="text-blue-600 dark:text-blue-400 font-bold hover:underline">
              查看今日提升任务 ➜
            </button>
            <button data-action="daily-filter" data-track="growth" class="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold hover:bg-blue-100">
              打卡记录
            </button>
          </div>
        </div>

        <!-- 专区 5：工位作息与身心精力 -->
        <div class="group bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all space-y-3.5 flex flex-col justify-between">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 flex items-center justify-center text-lg font-bold">
                ⏰
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                今日 ${trackStats.routine.done}/${trackStats.routine.total}
              </span>
            </div>
            <h4 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
              工位作息与精力管理
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              45分钟工位久坐微拉伸、90分钟睡眠节律、2000ml分段补水与4-7-8迷走神经呼吸训练。
            </p>
          </div>
          <div class="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <button data-action="tool" data-sub="desk_timer_tool" class="text-rose-600 dark:text-rose-400 font-bold hover:underline">
              久坐拉伸番茄钟 ➜
            </button>
            <button data-action="tool" data-sub="water_tool" class="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold hover:bg-rose-100">
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

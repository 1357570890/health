// 食物1:1自由等量替换交互计算器
import { DIET_PLAN } from "../../data/dietData.js";

export function renderFoodSubTool() {
  const container = document.createElement("div");
  container.className = "bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6";

  // 提取所有可替换源
  const targets = [];
  DIET_PLAN.forEach((meal) => {
    meal.replacements.forEach((rep) => {
      targets.push({
        mealTitle: meal.title,
        target: rep.target,
        options: rep.options,
        pitfalls: meal.pitfalls
      });
    });
  });

  let selectedIndex = 0;

  function renderContent() {
    const current = targets[selectedIndex];
    return `
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-4">
        <div>
          <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
            <span>🔄</span>
            <span>食物1:1等量平替计算器</span>
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">宿舍食材用尽或食堂缺货时，一键换算等能量与等蛋白质的科学平替物。</p>
        </div>
        <span class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
          共收录${targets.length}组核心食材
        </span>
      </div>

      <!-- 选择待替换的目标食材 -->
      <div>
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">第1步：选择您手头需要替换的标配食材</label>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          ${targets
            .map((t, idx) => `
              <button
                data-idx="${idx}"
                class="sub-target-btn p-3 rounded-xl border text-left transition-all ${
                  idx === selectedIndex
                    ? "bg-amber-50 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 text-amber-900 dark:text-amber-200 ring-2 ring-amber-400/30"
                    : "bg-slate-50 dark:bg-slate-750/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                }"
              >
                <div class="text-[10px] text-slate-400 mb-0.5">${t.mealTitle}</div>
                <div class="text-xs font-bold">${t.target}</div>
              </button>
            `)
            .join("")}
        </div>
      </div>

      <!-- 换算出的候选平替清单 -->
      <div class="p-5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
            第2步：可直接1:1等效平替方案（任选其一）
          </span>
          <span class="text-[11px] text-amber-700 dark:text-amber-400 font-medium">无缝替换，不影响总热量平衡</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${current.options
            .map(
              (opt) => `
              <div class="p-4 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-900/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-sm font-bold text-slate-800 dark:text-slate-100">${opt.name}</span>
                    <span class="text-xs font-extrabold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300">${opt.amount}</span>
                  </div>
                  <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${opt.note}</p>
                </div>
                <div class="mt-3 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1">
                  <span>✓ 推荐理由：满足同等宏量营养素供给</span>
                </div>
              </div>
            `
            )
            .join("")}
        </div>

        <div class="p-3 rounded-xl bg-white dark:bg-slate-800 border border-amber-200/80 dark:border-amber-900/60 text-xs text-slate-600 dark:text-slate-300">
          <span class="font-bold text-rose-600 dark:text-rose-400">⚠️ 避坑提醒：</span>
          ${current.pitfalls[0]}
        </div>
      </div>
    `;
  }

  container.innerHTML = renderContent();

  function attachEvents() {
    container.querySelectorAll(".sub-target-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedIndex = parseInt(btn.getAttribute("data-idx"), 10);
        container.innerHTML = renderContent();
        attachEvents();
      });
    });
  }

  attachEvents();
  return container;
}

// 外食与就餐热量记录与历史查询弹窗 (Dining Out Calorie Logger & Query Modal)
import { healthTracker } from "../../core/healthTrackerService.js";
import { getTodayKey, playGentleChime } from "../../core/utils.js";

export function renderDiningOutModal() {
  const overlay = document.createElement("div");
  overlay.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150";

  const todayStr = getTodayKey();

  const presets = [
    { name: "赛百味全麦牛肉三明治", cal: 420, type: "午餐/外卖", icon: "🥪" },
    { name: "清汤潮汕牛肉火锅", cal: 620, type: "聚餐", icon: "🍲" },
    { name: "鸡胸肉轻食蔬菜沙拉", cal: 350, type: "控糖餐", icon: "🥗" },
    { name: "日料三文鱼刺身定食", cal: 520, type: "优质蛋白", icon: "🍣" },
    { name: "麻辣烫清汤涮菜+纯肉", cal: 550, type: "外卖", icon: "🥢" },
    { name: "重油聚餐火锅/烧烤", cal: 880, type: "高热量聚餐", icon: "🥩" }
  ];

  function updateContent() {
    const allLogs = healthTracker.getFoodLogs();
    const todayCal = healthTracker.getTodayFoodCalories(todayStr);

    overlay.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-xl space-y-4 max-h-[90vh] flex flex-col justify-between">
        <!-- 头部 -->
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div class="flex items-center space-x-2">
            <span class="text-xl">🍜</span>
            <div>
              <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white">外食与就餐热量记录中枢</h3>
              <p class="text-[11px] text-slate-400">在外吃/叫外卖/聚餐合理估算卡路里，随时追溯查询</p>
            </div>
          </div>
          <button id="close-dining-modal-btn" class="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm">
            ✕
          </button>
        </div>

        <div class="space-y-4 overflow-y-auto pr-1 flex-1 no-scrollbar">
          <!-- 今日外食热量汇总胶囊 -->
          <div class="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-300/80 dark:border-amber-800/60 flex items-center justify-between">
            <div class="space-y-0.5">
              <span class="text-[11px] font-bold text-amber-800 dark:text-amber-300">今日外食/加餐总摄入</span>
              <div class="flex items-baseline space-x-1.5">
                <span class="text-2xl font-black text-amber-900 dark:text-amber-200 font-mono">${todayCal}</span>
                <span class="text-xs font-semibold text-amber-700">kcal (大卡)</span>
              </div>
            </div>
            <span class="text-[11px] text-amber-700 dark:text-amber-400 bg-white/60 dark:bg-slate-800/60 px-2.5 py-1 rounded-xl">
              建议单日控脂阈值：≤ 2000 kcal
            </span>
          </div>

          <!-- 常用外食一键快捷录入 -->
          <div class="space-y-1.5">
            <span class="text-xs font-bold text-slate-700 dark:text-slate-300">常见外食快捷录入（点击即可直接录入）</span>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              ${presets.map((p) => `
                <button data-quick-meal="${p.name}" data-cal="${p.cal}" data-type="${p.type}" class="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 dark:bg-slate-750 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 text-left transition-all group flex flex-col justify-between">
                  <div class="flex items-center space-x-1 mb-1">
                    <span>${p.icon}</span>
                    <span class="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 truncate">${p.name}</span>
                  </div>
                  <div class="flex items-center justify-between text-[10px] text-slate-400">
                    <span>${p.type}</span>
                    <span class="font-mono font-bold text-amber-600 dark:text-amber-400">~${p.cal} kcal</span>
                  </div>
                </button>
              `).join("")}
            </div>
          </div>

          <!-- 自定义输入栏 -->
          <div class="space-y-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-750/50 border border-slate-200/80 dark:border-slate-700">
            <span class="text-xs font-bold text-slate-800 dark:text-slate-200">自定义记录本餐实际摄入</span>
            <div class="flex flex-col sm:flex-row gap-2">
              <input
                id="input-meal-name"
                type="text"
                placeholder="餐饮名称 (如：赛百味双份牛肉三明治)"
                class="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
              <div class="flex items-center space-x-1 shrink-0">
                <input
                  id="input-meal-cal"
                  type="number"
                  placeholder="热量"
                  class="w-20 px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
                <span class="text-xs text-slate-400 font-mono">kcal</span>
              </div>
              <button
                id="submit-custom-meal-btn"
                class="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold text-xs shrink-0 transition-all active:scale-95"
              >
                保存
              </button>
            </div>
          </div>

          <!-- 历史查询档案 -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-700 dark:text-slate-300">外食历史档案明细 (支持回溯核算)</span>
              <span class="text-[11px] text-slate-400">共 ${allLogs.length} 条记录</span>
            </div>
            <div class="max-h-40 overflow-y-auto space-y-1 pr-1 no-scrollbar">
              ${allLogs.length === 0 ? `
                <div class="p-3 text-center rounded-xl bg-slate-50 dark:bg-slate-750/30 text-xs text-slate-400">
                  暂无外食记录，饮食规律健康！
                </div>
              ` : allLogs.map((log) => `
                <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-750/40 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <div class="flex items-center space-x-2 min-w-0 flex-1">
                    <span class="font-mono text-slate-400 text-[11px] shrink-0">${log.date}</span>
                    <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">${log.mealType}</span>
                    <span class="font-semibold text-slate-800 dark:text-slate-100 truncate">${log.name}</span>
                  </div>
                  <div class="flex items-center space-x-2 shrink-0">
                    <span class="font-mono font-bold text-amber-600 dark:text-amber-400">${log.calories} kcal</span>
                    <button data-delete-food="${log.id}" class="text-slate-300 hover:text-rose-500 text-xs p-0.5" title="删除该条记录">
                      ✕
                    </button>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;

    // 绑定关闭
    overlay.querySelector("#close-dining-modal-btn")?.addEventListener("click", () => {
      document.body.removeChild(overlay);
    });

    // 绑定快捷录入
    overlay.querySelectorAll("[data-quick-meal]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const name = btn.getAttribute("data-quick-meal");
        const cal = btn.getAttribute("data-cal");
        const type = btn.getAttribute("data-type");
        healthTracker.logFood({ name, calories: cal, mealType: type }, todayStr);
        playGentleChime(784, 0.15);
        updateContent();
      });
    });

    // 绑定自定义录入
    overlay.querySelector("#submit-custom-meal-btn")?.addEventListener("click", () => {
      const nameInput = overlay.querySelector("#input-meal-name");
      const calInput = overlay.querySelector("#input-meal-cal");
      const name = nameInput?.value?.trim();
      const cal = parseInt(calInput?.value, 10);
      if (!name) {
        alert("请输入餐饮名称");
        return;
      }
      healthTracker.logFood({ name, calories: isNaN(cal) ? 450 : cal, mealType: "外食" }, todayStr);
      playGentleChime(784, 0.15);
      updateContent();
    });

    // 绑定删除
    overlay.querySelectorAll("[data-delete-food]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-delete-food");
        healthTracker.deleteFoodLog(id);
        updateContent();
      });
    });
  }

  updateContent();

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });

  return overlay;
}

// 今日营养饮食系统规划与打卡卡片 (Daily Diet System Plan & Check-in)
import { store } from "../../core/store.js";
import { getTodayKey, playGentleChime } from "../../core/utils.js";
import { handleMealInventoryLinkage } from "../../core/mealInventoryLinker.js";
import { renderDiningOutModal } from "../diet/diningOutModal.js";

export function renderOverviewDietCard(onNavigate) {
  const container = document.createElement("div");
  container.className = "bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-700/80 shadow-xs flex flex-col justify-between space-y-2.5 transition-all";

  const todayStr = getTodayKey();
  const tasks = store.getTasksForDate(todayStr);
  const dietTasks = tasks.filter((t) => t.category === "diet");
  const profile = store.getUserProfile();
  const targetProtein = profile.proteinTarget || 112;

  // 动态测算今日已摄入纯蛋白质克数
  let currentProtein = 0;
  dietTasks.forEach((t) => {
    if (t.completed) {
      if (t.id === "fixed_diet_breakfast") currentProtein += 28;
      else if (t.id === "fixed_diet_lunch") currentProtein += 35;
      else if (t.id === "fixed_diet_dinner") currentProtein += 25;
      else currentProtein += 5;
    }
  });
  const proteinDiff = Math.max(0, targetProtein - currentProtein);
  const proteinPercent = Math.min(100, Math.round((currentProtein / targetProtein) * 100));

  container.innerHTML = `
    <div class="space-y-2">
      <!-- 头部：标题与控糖标签 -->
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-1.5">
        <div class="flex items-center space-x-2">
          <span class="text-base sm:text-lg">🥗</span>
          <div>
            <h3 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">今日营养与控糖饮食规划</h3>
          </div>
        </div>
        <div class="flex items-center space-x-1.5">
          <button id="diet-open-dining-modal" class="px-2 py-0.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/60 text-[10px] font-bold transition-all" title="在外就餐或吃外卖，记录热量大卡">
            + 外食记录
          </button>
          <span class="text-[11px] text-slate-400 font-mono">
            ${dietTasks.filter((t) => t.completed).length}/${dietTasks.length} 完成
          </span>
        </div>
      </div>

      <!-- 蛋白质宏量缺口透视微胶囊 -->
      <div class="px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-750/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
        <div class="flex items-center space-x-1.5 truncate">
          <span class="text-xs">🥩</span>
          <span class="font-bold text-slate-700 dark:text-slate-300">纯蛋白达标:</span>
          <span class="font-mono font-extrabold text-slate-900 dark:text-white">${currentProtein}g / ${targetProtein}g</span>
          <span class="text-[10px] text-slate-400">
            ${proteinDiff > 0 ? `(差${proteinDiff}g · 晚间建议补充鸡胸肉或蛋白粉)` : `(✨ 已圆满达标)`}
          </span>
        </div>
        <div class="w-14 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shrink-0 ml-2">
          <div class="h-full bg-emerald-500 rounded-full transition-all duration-300" style="width: ${proteinPercent}%;"></div>
        </div>
      </div>

      <!-- 四餐具体方案与打卡条目 -->
      <div class="space-y-1.5">
        ${dietTasks.map((t) => {
          const isDone = t.completed;
          return `
            <div data-diet-id="${t.id}" class="diet-item-row group p-2 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer ${
              isDone
                ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/40 opacity-75"
                : "bg-slate-50/70 dark:bg-slate-750/40 border-slate-200/60 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600"
            }">
              <div class="flex items-center space-x-2 min-w-0 flex-1">
                <button data-action="toggle-diet" data-id="${t.id}" class="shrink-0 w-4 h-4 rounded flex items-center justify-center border transition-all ${
                  isDone
                    ? "bg-emerald-500 border-emerald-500 text-white font-bold text-[10px]"
                    : "border-slate-300 dark:border-slate-600 hover:border-emerald-500"
                }">
                  ${isDone ? "✓" : ""}
                </button>

                <div class="min-w-0 flex-1">
                  <div class="flex items-center space-x-1.5">
                    <span class="text-[10px] font-bold px-1.5 py-0.2 rounded shrink-0 ${
                      isDone
                        ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300"
                        : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                    }">
                      ${t.label || t.badge || "配餐"}
                    </span>
                    <span class="text-xs font-semibold truncate ${
                      isDone
                        ? "line-through text-slate-400 dark:text-slate-500"
                        : "text-slate-800 dark:text-slate-100"
                    }">
                      ${t.title}
                    </span>
                  </div>
                  ${t.details ? `
                    <p class="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5 leading-tight">${t.details}</p>
                  ` : ""}
                </div>
              </div>

              <!-- 右侧快捷编辑图标与时间 -->
              <div class="flex items-center space-x-1 shrink-0">
                <span class="text-[10px] text-slate-400 font-mono">${t.time.split("~")[0]}</span>
                <button data-action="edit-diet" data-id="${t.id}" class="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-[11px] transition-opacity" title="手动修改今日此餐规划">
                  ✎
                </button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <!-- 底部直达链接 -->
    <div class="pt-1.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
      <span class="text-slate-400">打卡自动扣除对应食材库存</span>
      <button id="diet-jump-plan-btn" class="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-0.5">
        <span>四餐详细规程与外卖方案</span>
        <span>➔</span>
      </button>
    </div>
  `;

  // 绑定打卡（并自动联动库存扣减）
  const handleToggle = (id) => {
    const target = dietTasks.find((t) => t.id === id);
    if (!target) return;
    const willBeCompleted = !target.completed;
    store.toggleTask(id, todayStr);
    handleMealInventoryLinkage(id, willBeCompleted);
    playGentleChime(659.25, 0.15);
  };

  container.querySelectorAll("[data-action='toggle-diet']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      handleToggle(id);
    });
  });

  container.querySelectorAll(".diet-item-row").forEach((row) => {
    row.addEventListener("click", (e) => {
      if (e.target.closest("[data-action='edit-diet']")) return;
      const id = row.getAttribute("data-diet-id");
      if (id) handleToggle(id);
    });
  });

  // 绑定手动修改单餐规划
  container.querySelectorAll("[data-action='edit-diet']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      const target = dietTasks.find((t) => t.id === id);
      if (!target) return;
      const newTitle = prompt("修改今日该餐内容（如换成赛百味牛肉三明治/聚餐火锅）：", target.title);
      if (newTitle && newTitle.trim()) {
        store.updateTask(id, { title: newTitle.trim(), brief: newTitle.trim() }, todayStr);
        playGentleChime(784, 0.15);
      }
    });
  });

  container.querySelector("#diet-open-dining-modal")?.addEventListener("click", () => {
    const modal = renderDiningOutModal();
    document.body.appendChild(modal);
  });

  container.querySelector("#diet-jump-plan-btn")?.addEventListener("click", () => {
    onNavigate("plans", "diet_plan");
  });

  return container;
}

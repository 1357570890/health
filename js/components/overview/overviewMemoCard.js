// 今日个人备忘与科研任务自建记事本模块 (Personal Memo & Research Pad)
import { store } from "../../core/store.js";
import { getTodayKey, playGentleChime } from "../../core/utils.js";

export function renderOverviewMemoCard() {
  const container = document.createElement("div");
  container.className = "bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-700/80 shadow-xs flex flex-col justify-between space-y-3 transition-all";

  const todayStr = getTodayKey();
  const tasks = store.getTasksForDate(todayStr);
  // 个人备忘任务：所有非系统预置饮食与体能的自建待办
  const memoTasks = tasks.filter((t) => t.category !== "diet" && t.category !== "exercise");

  container.innerHTML = `
    <div class="space-y-2.5">
      <!-- 头部：标题与自建提示 -->
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-2">
        <div class="flex items-center space-x-2">
          <span class="text-base sm:text-lg">📝</span>
          <div>
            <h3 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">今日个人备忘与科研待办</h3>
          </div>
        </div>
        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-750 dark:text-slate-300">
          自由记事本 (${memoTasks.filter((t) => t.completed).length}/${memoTasks.length})
        </span>
      </div>

      <!-- 随手记极简输入条 -->
      <div class="flex items-center space-x-1.5">
        <input
          id="overview-memo-input"
          type="text"
          placeholder="随手记备忘 / 今日科研攻坚（敲回车添加）..."
          class="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-750/70 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition-all"
        />
        <button
          id="overview-memo-add-btn"
          class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all shrink-0 active:scale-95"
        >
          添加
        </button>
      </div>

      <!-- 备忘条目清单区 (紧凑滚动) -->
      <div class="space-y-1.5 max-h-[180px] overflow-y-auto pr-0.5 no-scrollbar">
        ${memoTasks.length === 0 ? `
          <div class="p-6 text-center rounded-xl bg-slate-50/60 dark:bg-slate-750/30 border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 text-xs">
            暂无备忘事项，随手在上方输入即可记录
          </div>
        ` : memoTasks.map((t) => {
          const isDone = t.completed;
          return `
            <div data-memo-id="${t.id}" class="memo-item-row group p-2 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer ${
              isDone
                ? "bg-slate-50/60 dark:bg-slate-750/30 border-slate-200/40 dark:border-slate-700/40 opacity-70"
                : "bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 shadow-xs"
            }">
              <div class="flex items-center space-x-2 min-w-0 flex-1">
                <button data-action="toggle-memo" data-id="${t.id}" class="shrink-0 w-4 h-4 rounded flex items-center justify-center border transition-all ${
                  isDone
                    ? "bg-indigo-500 border-indigo-500 text-white font-bold text-[10px]"
                    : "border-slate-300 dark:border-slate-600 hover:border-indigo-500"
                }">
                  ${isDone ? "✓" : ""}
                </button>
                <span class="text-xs font-medium truncate ${
                  isDone
                    ? "line-through text-slate-400 dark:text-slate-500"
                    : "text-slate-800 dark:text-slate-100"
                }">
                  ${t.title}
                </span>
              </div>

              <button data-action="delete-memo" data-id="${t.id}" class="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-rose-500 text-xs transition-opacity" title="删除">
                ✕
              </button>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <!-- 底部微提示 -->
    <div class="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
      <span>系统不预设任何虚假任务，全由您掌控</span>
      <span class="font-mono">备忘自动云端同步</span>
    </div>
  `;

  // 绑定添加备忘
  const inputEl = container.querySelector("#overview-memo-input");
  const addBtn = container.querySelector("#overview-memo-add-btn");

  const handleAdd = () => {
    const val = inputEl?.value.trim();
    if (!val) return;
    store.addTask({
      title: val,
      category: "work",
      time: "随时",
      details: "个人备忘待办",
      badge: "备忘"
    }, todayStr);
    inputEl.value = "";
    playGentleChime(784, 0.15);
  };

  addBtn?.addEventListener("click", handleAdd);
  inputEl?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAdd();
  });

  // 绑定勾选与删除
  container.querySelectorAll("[data-action='toggle-memo']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      store.toggleTask(id, todayStr);
      playGentleChime(659.25, 0.15);
    });
  });

  container.querySelectorAll(".memo-item-row").forEach((row) => {
    row.addEventListener("click", (e) => {
      if (e.target.closest("[data-action='delete-memo']")) return;
      const id = row.getAttribute("data-memo-id");
      if (id) {
        store.toggleTask(id, todayStr);
        playGentleChime(659.25, 0.15);
      }
    });
  });

  container.querySelectorAll("[data-action='delete-memo']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      store.deleteTask(id, todayStr);
    });
  });

  return container;
}

// 今日个人备忘与科研任务自建记事本模块 (含明日预排与昨日顺延)
import { store } from "../../core/store.js";
import { getTodayKey, playGentleChime } from "../../core/utils.js";

export function renderOverviewMemoCard() {
  const container = document.createElement("div");
  container.className = "bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-700/80 shadow-xs flex flex-col justify-between space-y-3 transition-all";

  let viewingDateMode = "today"; // 'today' | 'tomorrow'
  const todayStr = getTodayKey();
  const tomorrowStr = store.getTomorrowKey(todayStr);

  function renderView() {
    const isToday = viewingDateMode === "today";
    const activeDateKey = isToday ? todayStr : tomorrowStr;
    const tasks = store.getTasksForDate(activeDateKey);
    const memoTasks = tasks.filter((t) => t.category !== "diet" && t.category !== "exercise");
    const yesterdayUnfinished = store.getYesterdayUnfinishedTasks();

    container.innerHTML = `
      <div class="space-y-2.5">
        <!-- 头部：今日备忘与明日预排切换标签 -->
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-2">
          <div class="flex items-center space-x-1 bg-slate-100 dark:bg-slate-750 p-0.5 rounded-xl">
            <button id="tab-memo-today" class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              isToday
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
            }">
              📝 今日待办 (${memoTasks.filter((t) => t.completed).length}/${memoTasks.length})
            </button>
            <button id="tab-memo-tomorrow" class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              !isToday
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
            }">
              📅 明日预排
            </button>
          </div>

          <!-- 昨日未完成顺延胶囊 -->
          ${isToday && yesterdayUnfinished.length > 0 ? `
            <button id="btn-rollover-yesterday" class="px-2 py-0.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300/80 text-[10px] font-bold transition-all flex items-center space-x-1" title="将昨日未完成的事项一键移至今日">
              <span>📋 顺延昨日 (${yesterdayUnfinished.length})</span>
            </button>
          ` : `
            <span class="text-[10px] text-slate-400 font-mono">自由随手记</span>
          `}
        </div>

        <!-- 极简输入条 -->
        <div class="flex items-center space-x-1.5">
          <input
            id="overview-memo-input"
            type="text"
            placeholder="${isToday ? '随手记今日备忘或科研待办（按回车添加）...' : '给明天预排任务或科研攻坚（按回车添加）...'}"
            class="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-750/70 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition-all"
          />
          <button
            id="overview-memo-add-btn"
            class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all shrink-0 active:scale-95"
          >
            添加
          </button>
        </div>

        <!-- 备忘条目清单区 -->
        <div class="space-y-1.5 max-h-[180px] overflow-y-auto pr-0.5 no-scrollbar">
          ${memoTasks.length === 0 ? `
            <div class="p-6 text-center rounded-xl bg-slate-50/60 dark:bg-slate-750/30 border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 text-xs">
              ${isToday ? "今日暂无备忘，随手在上方输入即可记录" : "明天暂无预排待办，提前规划助您掌握全天主动权"}
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
                  <div class="min-w-0 flex-1 flex items-center space-x-1.5">
                    <span class="text-xs font-medium truncate ${
                      isDone
                        ? "line-through text-slate-400 dark:text-slate-500"
                        : "text-slate-800 dark:text-slate-100"
                    }">
                      ${t.title}
                    </span>
                    ${t.badge && t.badge !== "自建任务" && t.badge !== "备忘" ? `
                      <span class="text-[9px] px-1 py-0.1 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 shrink-0">
                        ${t.badge}
                      </span>
                    ` : ""}
                  </div>
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
        <span>${isToday ? "系统不预设任何虚假任务，全由您掌控" : `正在编辑明日待办清单 (${tomorrowStr})`}</span>
        <span class="font-mono">实时云同步</span>
      </div>
    `;

    // 绑定切换标签
    container.querySelector("#tab-memo-today")?.addEventListener("click", () => {
      viewingDateMode = "today";
      renderView();
    });
    container.querySelector("#tab-memo-tomorrow")?.addEventListener("click", () => {
      viewingDateMode = "tomorrow";
      renderView();
    });

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
        details: isToday ? "今日个人备忘" : "明日预排待办",
        badge: isToday ? "备忘" : "明日待办"
      }, activeDateKey);
      inputEl.value = "";
      playGentleChime(784, 0.15);
      renderView();
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
        store.toggleTask(id, activeDateKey);
        playGentleChime(659.25, 0.15);
        renderView();
      });
    });

    container.querySelectorAll(".memo-item-row").forEach((row) => {
      row.addEventListener("click", (e) => {
        if (e.target.closest("[data-action='delete-memo']")) return;
        const id = row.getAttribute("data-memo-id");
        if (id) {
          store.toggleTask(id, activeDateKey);
          playGentleChime(659.25, 0.15);
          renderView();
        }
      });
    });

    container.querySelectorAll("[data-action='delete-memo']").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        store.deleteTask(id, activeDateKey);
        renderView();
      });
    });

    // 绑定顺延昨日未完成
    container.querySelector("#btn-rollover-yesterday")?.addEventListener("click", () => {
      const count = store.rolloverYesterdayTasks();
      playGentleChime(880, 0.2);
      alert(`已成功顺延 ${count} 项昨日未完成待办至今日！`);
      renderView();
    });
  }

  renderView();
  return container;
}

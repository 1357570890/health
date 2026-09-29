// 每日任务全天时序混合流水线组件
import { store } from "../../core/store.js";
import { playGentleChime } from "../../core/utils.js";
import { renderTaskModal } from "./taskModal.js";

export function renderTrackTimelineView() {
  const container = document.createElement("div");
  container.className = "bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4";

  const tasks = store.getTasksForToday();

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  function isCurrentTime(timeStr) {
    if (!timeStr || !timeStr.includes("~")) return false;
    const [start, end] = timeStr.split("~");
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const startM = sh * 60 + sm;
    let endM = eh * 60 + em;
    if (endM < startM) endM += 24 * 60;
    return currentMinutes >= startM && currentMinutes < endM;
  }

  function getBadgeColor(cat) {
    switch (cat) {
      case "diet":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300";
      case "sport":
        return "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300";
      case "research":
        return "bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300";
      case "growth":
        return "bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300";
      case "habit":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300";
    }
  }

  container.innerHTML = `
    <div class="space-y-3 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
      ${tasks
        .map((task) => {
          const isNow = isCurrentTime(task.time);
          return `
          <div class="relative pl-10" data-task="${task.id}">
            <!-- 节点圆点 -->
            <div class="absolute left-2.5 top-3.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-800 ${
              isNow
                ? "bg-emerald-500 ring-4 ring-emerald-500/30 animate-pulse"
                : task.completed
                ? "bg-emerald-600"
                : "bg-slate-300 dark:bg-slate-600"
            }"></div>

            <!-- 卡片 -->
            <div class="p-3.5 rounded-2xl border transition-all flex items-start justify-between ${
              task.completed
                ? "bg-slate-50 dark:bg-slate-750/30 border-slate-200/60 dark:border-slate-700/60 opacity-60"
                : isNow
                ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 ring-2 ring-emerald-400/30 shadow-md"
                : "bg-white dark:bg-slate-750/70 border-slate-200 dark:border-slate-700 hover:border-slate-300"
            }">
              <div class="flex items-start space-x-3 mr-2">
                <button
                  data-action="toggle"
                  class="mt-0.5 w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center border transition-all ${
                    task.completed
                      ? "bg-emerald-600 text-white border-emerald-600 font-bold text-xs"
                      : "border-slate-300 dark:border-slate-600 hover:border-emerald-500"
                  }"
                >
                  ${task.completed ? "✓" : ""}
                </button>

                <div>
                  <div class="flex items-center space-x-2">
                    <span class="text-xs font-mono font-bold text-slate-500">${task.time}</span>
                    <span class="text-[10px] px-1.5 py-0.2 rounded font-extrabold ${getBadgeColor(task.category)}">${task.badge || "任务"}</span>
                    ${
                      task.isFixed
                        ? ""
                        : '<span class="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">临时</span>'
                    }
                    ${isNow ? '<span class="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-white font-extrabold animate-pulse">此时此刻</span>' : ""}
                  </div>
                  <div class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5 ${
                    task.completed ? "line-through text-slate-400 dark:text-slate-500" : ""
                  }">
                    ${task.title}
                  </div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    ${task.details}
                  </div>
                </div>
              </div>

              <!-- 右侧快捷操作 -->
              <div class="flex items-center space-x-1 flex-shrink-0">
                <button data-action="edit" title="编辑" class="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs">✏️</button>
                <button data-action="delete" title="删除" class="p-1 rounded text-slate-400 hover:text-rose-500 text-xs">🗑️</button>
              </div>
            </div>
          </div>
        `;
        })
        .join("")}
    </div>
  `;

  // 绑定事件
  container.querySelectorAll("[data-task]").forEach((el) => {
    const taskId = el.getAttribute("data-task");

    el.querySelector('[data-action="toggle"]')?.addEventListener("click", () => {
      store.toggleTask(taskId);
      playGentleChime(523.25, 0.12);
    });

    el.querySelector('[data-action="edit"]')?.addEventListener("click", () => {
      const task = store.getTasksForToday().find((t) => t.id === taskId);
      if (!task) return;
      const modal = renderTaskModal(task, (updated) => {
        store.updateTask(taskId, updated);
      });
      document.body.appendChild(modal);
    });

    el.querySelector('[data-action="delete"]')?.addEventListener("click", () => {
      if (confirm("确定删除该项任务吗？")) {
        store.deleteTask(taskId);
        playGentleChime(329.63, 0.1);
      }
    });
  });

  return container;
}

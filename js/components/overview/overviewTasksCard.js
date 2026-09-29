// 今日任务查看与遵守标记看板 (Today's Tasks & Compliance Check-in Cockpit)
import { store } from "../../core/store.js";
import { getTodayKey, playGentleChime } from "../../core/utils.js";

export function renderOverviewTasksCard(onNavigate) {
  const container = document.createElement("div");
  container.className = "bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-700/80 shadow-xs space-y-4 transition-all";

  const todayStr = getTodayKey();
  const tasks = store.getTasksForDate(todayStr);

  // 双轨划分：本职工作/深度攻坚 vs 生活自律/健康规程遵守
  const workTasks = tasks.filter((t) => t.category === "work" || t.category === "research");
  const lifeTasks = tasks.filter((t) => t.category !== "work" && t.category !== "research");

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.completed).length;

  container.innerHTML = `
    <!-- 头部：标题与模块跳转解耦入口 -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 dark:border-slate-700/60 pb-3">
      <div>
        <div class="flex items-center space-x-2">
          <span class="text-lg">📋</span>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">今日事项与规程遵守标记</h3>
          <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold">
            ${doneTasks}/${totalTasks} 已达成
          </span>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          点击复选框即刻标记完成与遵守状态；添加、编辑或调整任务请前往规划模块
        </p>
      </div>

      <div class="flex items-center space-x-2 shrink-0">
        <button id="overview-export-json-btn" class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-650 text-slate-700 dark:text-slate-200 font-medium text-xs transition-all flex items-center space-x-1" title="将所有任务记录与个人素材导出为标准 JSON 文件">
          <span>📥 导出素材</span>
        </button>
        <button id="overview-manage-tasks-btn" class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs transition-all shadow-xs flex items-center space-x-1">
          <span>⚙️ 添加与管理任务</span>
          <span>➔</span>
        </button>
      </div>
    </div>

    <!-- 任务清单展示区 (双轨分列并排) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- 轨 1：今日核心本职工作与重点攻坚 -->
      <div class="space-y-2">
        <div class="flex items-center justify-between px-1">
          <span class="text-xs font-bold text-indigo-700 dark:text-indigo-400 flex items-center space-x-1.5">
            <span>💼</span>
            <span>本职工作与重点攻坚 (${workTasks.filter((t) => t.completed).length}/${workTasks.length})</span>
          </span>
          <span class="text-[11px] text-slate-400 font-mono">Work & Focus</span>
        </div>

        <div class="space-y-1.5 min-h-[140px]">
          ${workTasks.length === 0 ? `
            <div class="p-6 text-center rounded-xl bg-slate-50/60 dark:bg-slate-750/30 border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 text-xs flex flex-col items-center justify-center space-y-1.5">
              <span>今日暂无本职工作事项</span>
              <button class="go-plan-sub-btn text-indigo-600 dark:text-indigo-400 hover:underline font-semibold text-xs">
                前往规划模块添加 ➔
              </button>
            </div>
          ` : workTasks.map((t) => renderTaskRow(t)).join("")}
        </div>
      </div>

      <!-- 轨 2：生活自律、饮食与健康微习惯遵守 -->
      <div class="space-y-2">
        <div class="flex items-center justify-between px-1">
          <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1.5">
            <span>🌱</span>
            <span>健康生活与作息遵守 (${lifeTasks.filter((t) => t.completed).length}/${lifeTasks.length})</span>
          </span>
          <span class="text-[11px] text-slate-400 font-mono">Health & Habits</span>
        </div>

        <div class="space-y-1.5 min-h-[140px]">
          ${lifeTasks.length === 0 ? `
            <div class="p-6 text-center rounded-xl bg-slate-50/60 dark:bg-slate-750/30 border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 text-xs">
              今日健康作息清单已清空
            </div>
          ` : lifeTasks.map((t) => renderTaskRow(t)).join("")}
        </div>
      </div>
    </div>
  `;

  // 单条任务渲染函数（只保留标记完成与遵守，无内联增删干扰）
  function renderTaskRow(task) {
    const isDone = task.completed;
    return `
      <div data-task-id="${task.id}" class="task-item-row group p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
        isDone
          ? "bg-slate-50/80 dark:bg-slate-750/40 border-slate-200/50 dark:border-slate-700/40 opacity-70"
          : "bg-white dark:bg-slate-800 border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm"
      }">
        <div class="flex items-center space-x-2.5 min-w-0 flex-1">
          <button data-action="toggle" data-id="${task.id}" class="shrink-0 w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
            isDone
              ? "bg-emerald-500 border-emerald-500 text-white font-bold"
              : "border-slate-300 dark:border-slate-600 hover:border-emerald-500"
          }">
            ${isDone ? "✓" : ""}
          </button>

          <div class="min-w-0 flex-1">
            <div class="flex items-center space-x-1.5">
              <span class="text-xs font-bold truncate ${
                isDone
                  ? "line-through text-slate-400 dark:text-slate-500"
                  : "text-slate-800 dark:text-slate-100"
              }">
                ${task.title}
              </span>
              ${task.badge ? `
                <span class="text-[10px] px-1.5 py-0.2 rounded font-medium shrink-0 ${
                  task.category === "work" || task.category === "research"
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                }">
                  ${task.badge}
                </span>
              ` : ""}
            </div>
            ${task.details ? `
              <p class="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">${task.details}</p>
            ` : ""}
          </div>
        </div>

        <div class="flex items-center space-x-1 shrink-0">
          <span class="text-[11px] text-slate-400 font-mono">${task.time || "全天"}</span>
        </div>
      </div>
    `;
  }

  // 绑定任务完成与遵守标记
  container.querySelectorAll(".task-item-row").forEach((row) => {
    row.addEventListener("click", (e) => {
      const id = row.getAttribute("data-task-id");
      if (id) {
        store.toggleTask(id, todayStr);
        playGentleChime(659.25, 0.15);
      }
    });
  });

  // 导出素材备份 JSON 文件
  container.querySelector("#overview-export-json-btn")?.addEventListener("click", () => {
    const jsonStr = store.exportDataJson();
    const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `lifeplan_materials_backup_${todayStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    playGentleChime(880, 0.2);
  });

  // 跳转至规划与任务管理模块
  container.querySelector("#overview-manage-tasks-btn")?.addEventListener("click", () => {
    onNavigate("daily");
  });
  container.querySelectorAll(".go-plan-sub-btn").forEach((btn) => {
    btn.addEventListener("click", () => onNavigate("daily"));
  });

  return container;
}

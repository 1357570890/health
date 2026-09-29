// 今日双轨任务与本职工作汇总看板 (Master Tasks & Duties Cockpit)
import { store } from "../../core/store.js";
import { getTodayKey, playGentleChime } from "../../core/utils.js";

export function renderOverviewTasksCard(onNavigate) {
  const container = document.createElement("div");
  container.className = "bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-700/80 shadow-sm space-y-5 transition-all";

  const todayStr = getTodayKey();
  const tasks = store.getTasksForDate(todayStr);

  // 双轨划分：本职工作/深度攻坚 vs 生活自律/健康规程
  const workTasks = tasks.filter((t) => t.category === "work" || t.category === "research");
  const lifeTasks = tasks.filter((t) => t.category !== "work" && t.category !== "research");

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.completed).length;

  container.innerHTML = `
    <!-- 头部标题与数据状态 -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700/60 pb-3">
      <div>
        <div class="flex items-center space-x-2">
          <span class="text-xl">📋</span>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">今日任务规划与本职工作全景汇总</h3>
          <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold">
            已闭环 ${doneTasks}/${totalTasks}
          </span>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          双轨聚合：工位本职攻坚与个人生活健康，随时打卡记录，本地优先与私密云端实时双轨同步
        </p>
      </div>

      <div class="flex items-center space-x-2 shrink-0">
        <button id="overview-export-json-btn" class="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-650 text-slate-700 dark:text-slate-200 font-medium text-xs transition-all flex items-center space-x-1" title="将所有任务记录与个人素材一键导出为标准 JSON 文件">
          <span>📥 导出素材备份</span>
        </button>
        <button id="overview-jump-daily-btn" class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs transition-all shadow-sm">
          完整时间轴 ➔
        </button>
      </div>
    </div>

    <!-- 极速快捷添加待办条 (支持本职工作与健康生活) -->
    <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-750/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5">
      <div class="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-between">
        <span>⚡ 快速规划新待办 / 今日重点攻坚</span>
        <span class="text-[11px] text-slate-400 font-normal">支持直接敲回车快速保存</span>
      </div>
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <select id="new-task-category-select" class="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 shrink-0">
          <option value="work">💼 本职工作 / 攻坚</option>
          <option value="habit">🌱 生活自律 / 作息</option>
          <option value="diet">🥗 饮食控糖 / 营养</option>
          <option value="exercise">🏋️ 运动体能 / 羽球</option>
        </select>
        <input
          id="new-task-title-input"
          type="text"
          placeholder="输入事项内容（如：完成系统重构测试 / 整理周报要点 / 晚间慢跑4公里...）"
          class="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
        />
        <button
          id="new-task-submit-btn"
          class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all shrink-0 active:scale-95"
        >
          + 快速添加
        </button>
      </div>
    </div>

    <!-- 任务清单展示区 (双轨分列并排或上下排列) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- 轨 1：今日核心本职工作与科研攻坚 -->
      <div class="space-y-2">
        <div class="flex items-center justify-between px-1">
          <span class="text-xs font-bold text-indigo-700 dark:text-indigo-400 flex items-center space-x-1.5">
            <span>💼</span>
            <span>本职工作与重点攻坚 (${workTasks.filter((t) => t.completed).length}/${workTasks.length})</span>
          </span>
          <span class="text-[11px] text-slate-400 font-mono">Duty & Focus</span>
        </div>

        <div class="space-y-1.5 min-h-[140px]">
          ${workTasks.length === 0 ? `
            <div class="p-6 text-center rounded-xl bg-slate-50/60 dark:bg-slate-750/30 border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 text-xs">
              今日暂无本职工作待办，可使用上方输入框添加核心攻坚目标
            </div>
          ` : workTasks.map((t) => renderTaskRow(t, todayStr)).join("")}
        </div>
      </div>

      <!-- 轨 2：个人生活自律、饮食与健康微习惯 -->
      <div class="space-y-2">
        <div class="flex items-center justify-between px-1">
          <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1.5">
            <span>🌱</span>
            <span>生活自律与健康规划 (${lifeTasks.filter((t) => t.completed).length}/${lifeTasks.length})</span>
          </span>
          <span class="text-[11px] text-slate-400 font-mono">Health & Habits</span>
        </div>

        <div class="space-y-1.5 min-h-[140px]">
          ${lifeTasks.length === 0 ? `
            <div class="p-6 text-center rounded-xl bg-slate-50/60 dark:bg-slate-750/30 border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 text-xs">
              今日暂无健康生活待办
            </div>
          ` : lifeTasks.map((t) => renderTaskRow(t, todayStr)).join("")}
        </div>
      </div>
    </div>
  `;

  // 单条任务渲染函数
  function renderTaskRow(task, dateKey) {
    const isDone = task.completed;
    return `
      <div data-task-id="${task.id}" class="task-item-row group p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2.5 ${
        isDone
          ? "bg-slate-50/80 dark:bg-slate-750/40 border-slate-200/50 dark:border-slate-700/40 opacity-75"
          : "bg-white dark:bg-slate-800 border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-600"
      }">
        <div class="flex items-center space-x-2.5 min-w-0 flex-1">
          <button data-action="toggle" data-id="${task.id}" class="shrink-0 w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
            isDone
              ? "bg-emerald-500 border-emerald-500 text-white"
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

        <div class="flex items-center space-x-1.5 shrink-0">
          <span class="text-[11px] text-slate-400 font-mono">${task.time || "全天"}</span>
          ${!task.isFixed ? `
            <button data-action="delete" data-id="${task.id}" class="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-all text-xs" title="删除此待办">
              ✕
            </button>
          ` : ""}
        </div>
      </div>
    `;
  }

  // 绑定事件：极速添加任务
  const inputEl = container.querySelector("#new-task-title-input");
  const catSelectEl = container.querySelector("#new-task-category-select");
  const submitBtn = container.querySelector("#new-task-submit-btn");

  const handleAddTask = () => {
    const val = inputEl?.value.trim();
    if (!val) return;
    const cat = catSelectEl?.value || "work";
    store.addTask({
      title: val,
      category: cat,
      time: "随时",
      details: "快速规划待办"
    }, todayStr);
    inputEl.value = "";
    playGentleChime(784, 0.15);
  };

  submitBtn?.addEventListener("click", handleAddTask);
  inputEl?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAddTask();
  });

  // 绑定任务完成勾选与删除
  container.querySelectorAll("[data-action='toggle']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      store.toggleTask(id, todayStr);
      playGentleChime(659.25, 0.15);
    });
  });

  container.querySelectorAll("[data-action='delete']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      store.deleteTask(id, todayStr);
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

  container.querySelector("#overview-jump-daily-btn")?.addEventListener("click", () => {
    onNavigate("daily");
  });

  return container;
}

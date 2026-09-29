// 每日行动分模块多轨独立看板组件
import { store } from "../../core/store.js";
import { playGentleChime } from "../../core/utils.js";
import { renderTaskModal } from "./taskModal.js";

export function renderTrackModulesView() {
  const container = document.createElement("div");
  container.className = "space-y-6";

  const tasks = store.getTasksForToday();

  // 定义5大独立业务模块
  const modules = [
    {
      id: "diet",
      name: "饮食营养管理模块",
      icon: "🥗",
      badge: "控糖饱腹",
      color: "emerald",
      desc: "早中晚餐次定时定量、蛋白质达标与食堂避坑"
    },
    {
      id: "sport",
      name: "健身力量与球类专项",
      icon: "🏸",
      badge: "充沛体能",
      color: "amber",
      desc: "今日力量健身、操场跑步或羽毛球激情暴汗"
    },
    {
      id: "research",
      name: "实验室科研攻坚模块",
      icon: "🔬",
      badge: "核心产出",
      color: "sky",
      desc: "代码调试、算法推导、实验跑数与论文撰写"
    },
    {
      id: "growth",
      name: "个人提升与进阶模块",
      icon: "🚀",
      badge: "长远复利",
      color: "violet",
      desc: "英文文献速读、新技术栈演练与前沿综述"
    },
    {
      id: "habit",
      name: "作息节律与工位习惯",
      icon: "💧",
      badge: "生理基底",
      color: "teal",
      desc: "工位分段饮水、45分钟防瘫拉伸与深度睡眠"
    }
  ];

  function getModuleHeaderColor(color) {
    switch (color) {
      case "emerald":
        return "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200";
      case "amber":
        return "border-amber-500 bg-amber-50/70 dark:bg-amber-950/30 text-amber-950 dark:text-amber-200";
      case "sky":
        return "border-sky-500 bg-sky-50/70 dark:bg-sky-950/30 text-sky-900 dark:text-sky-200";
      case "violet":
        return "border-violet-500 bg-violet-50/70 dark:bg-violet-950/30 text-violet-900 dark:text-violet-200";
      case "teal":
        return "border-teal-500 bg-teal-50/70 dark:bg-teal-950/30 text-teal-900 dark:text-teal-200";
      default:
        return "border-slate-300 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200";
    }
  }

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      ${modules
        .map((mod) => {
          const modTasks = tasks.filter((t) => t.category === mod.id);
          const doneCount = modTasks.filter((t) => t.completed).length;
          const totalCount = modTasks.length;
          const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

          return `
            <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between overflow-hidden">
              <!-- 模块顶栏 -->
              <div class="p-4 border-b border-l-4 ${getModuleHeaderColor(mod.color)} flex items-center justify-between">
                <div class="flex items-center space-x-2.5">
                  <span class="text-xl">${mod.icon}</span>
                  <div>
                    <div class="flex items-center space-x-2">
                      <h4 class="text-sm font-bold">${mod.name}</h4>
                      <span class="text-[10px] px-1.5 py-0.5 rounded font-extrabold bg-white/60 dark:bg-black/30 backdrop-blur-sm">${mod.badge}</span>
                    </div>
                    <p class="text-[11px] opacity-75">${mod.desc}</p>
                  </div>
                </div>

                <div class="text-right">
                  <span class="text-xs font-black font-mono">${doneCount}/${totalCount}</span>
                  <div class="w-16 bg-black/10 dark:bg-white/10 rounded-full h-1.5 mt-1 overflow-hidden">
                    <div class="bg-emerald-500 h-full rounded-full transition-all" style="width: ${pct}%"></div>
                  </div>
                </div>
              </div>

              <!-- 任务条目列表 -->
              <div class="p-3.5 space-y-2 flex-grow">
                ${
                  modTasks.length === 0
                    ? `
                  <div class="py-6 text-center text-xs text-slate-400">
                    暂无待办事项，点击下方按钮添加
                  </div>
                `
                    : modTasks
                        .map((task) => `
                    <div
                      data-task="${task.id}"
                      class="task-row flex items-start justify-between p-2.5 rounded-xl border transition-all ${
                        task.completed
                          ? "bg-slate-50 dark:bg-slate-750/30 border-slate-200/60 dark:border-slate-700/60 opacity-65"
                          : "bg-white dark:bg-slate-750/70 border-slate-200 dark:border-slate-700 hover:border-slate-300"
                      }"
                    >
                      <div class="flex items-start space-x-2.5 mr-2">
                        <!-- 复选框 -->
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
                            <span class="text-[11px] font-mono font-bold text-slate-400">${task.time}</span>
                            ${
                              task.isFixed
                                ? '<span class="text-[9px] px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-700 text-slate-500">基准</span>'
                                : '<span class="text-[9px] px-1 py-0.2 rounded bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-semibold">临时</span>'
                            }
                          </div>
                          <div class="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-snug mt-0.5 ${
                            task.completed ? "line-through text-slate-400 dark:text-slate-500" : ""
                          }">
                            ${task.title}
                          </div>
                          ${
                            task.brief
                              ? `<div class="text-[10px] text-slate-400 leading-tight mt-0.5">${task.brief}</div>`
                              : ""
                          }
                        </div>
                      </div>

                      <!-- 操作按钮 -->
                      <div class="flex items-center space-x-1 flex-shrink-0">
                        <button data-action="edit" title="编辑任务" class="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs">
                          ✏️
                        </button>
                        <button data-action="delete" title="删除任务" class="p-1 rounded text-slate-400 hover:text-rose-500 text-xs">
                          🗑️
                        </button>
                      </div>
                    </div>
                  `)
                        .join("")
                }
              </div>

              <!-- 底部添加按钮 -->
              <div class="p-2.5 bg-slate-50/60 dark:bg-slate-750/30 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  data-add-cat="${mod.id}"
                  class="add-mod-task-btn w-full py-1.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-emerald-500 hover:text-emerald-600 text-xs font-semibold transition-all flex items-center justify-center space-x-1"
                >
                  <span>+</span>
                  <span>添加一条${mod.name.slice(0, 4)}任务</span>
                </button>
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;

  // 绑定事件
  container.querySelectorAll(".task-row").forEach((row) => {
    const taskId = row.getAttribute("data-task");

    row.querySelector('[data-action="toggle"]')?.addEventListener("click", () => {
      store.toggleTask(taskId);
      playGentleChime(523.25, 0.12);
    });

    row.querySelector('[data-action="edit"]')?.addEventListener("click", () => {
      const task = store.getTasksForToday().find((t) => t.id === taskId);
      if (!task) return;
      const modal = renderTaskModal(task, (updated) => {
        store.updateTask(taskId, updated);
      });
      document.body.appendChild(modal);
    });

    row.querySelector('[data-action="delete"]')?.addEventListener("click", () => {
      if (confirm("确定删除该项任务吗？")) {
        store.deleteTask(taskId);
        playGentleChime(329.63, 0.1);
      }
    });
  });

  // 模块底部专属添加
  container.querySelectorAll(".add-mod-task-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-add-cat");
      const modal = renderTaskModal({ category: cat }, (newTask) => {
        store.addTask(newTask);
        playGentleChime(587.33, 0.15);
      });
      document.body.appendChild(modal);
    });
  });

  return container;
}

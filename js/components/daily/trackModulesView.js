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
      name: "营养饮食管理",
      badge: "控糖饱腹",
      desc: "四餐定量标配、自带即食高蛋白与食堂避油"
    },
    {
      id: "sport",
      name: "体能健身与羽球",
      badge: "3+2训练",
      desc: "力量抗阻护肩、操场4公里慢跑或羽球实战"
    },
    {
      id: "research",
      name: "实验室科研攻坚",
      badge: "学术主线",
      desc: "模型代码调试、实验数据清洗与论文攻坚"
    },
    {
      id: "growth",
      name: "技能提升进阶",
      badge: "长远复利",
      desc: "学术英文句式积累、工程技术沉淀与复盘"
    },
    {
      id: "habit",
      name: "工位健康作息",
      badge: "精力基底",
      desc: "45分钟工位微伸展、2000ml补水与90分钟睡眠节律"
    }
  ];

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      ${modules
        .map((mod) => {
          const modTasks = tasks.filter((t) => t.category === mod.id);
          const doneCount = modTasks.filter((t) => t.completed).length;
          const totalCount = modTasks.length;
          const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

          return `
            <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-sm flex flex-col justify-between overflow-hidden">
              <!-- 模块顶栏 -->
              <div class="p-3.5 sm:p-4 border-b border-slate-100 dark:border-slate-700/60 bg-slate-50/70 dark:bg-slate-750/30 flex items-center justify-between">
                <div>
                  <div class="flex items-center space-x-2">
                    <h4 class="text-xs font-bold text-slate-900 dark:text-white">${mod.name}</h4>
                    <span class="text-[10px] px-1.5 py-0.5 rounded font-medium bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-600">${mod.badge}</span>
                  </div>
                  <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">${mod.desc}</p>
                </div>

                <div class="text-right shrink-0">
                  <span class="text-xs font-bold font-mono text-slate-700 dark:text-slate-300">${doneCount}/${totalCount}</span>
                  <div class="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-1 mt-1 overflow-hidden">
                    <div class="bg-emerald-500 h-full rounded-full transition-all" style="width: ${pct}%"></div>
                  </div>
                </div>
              </div>

              <!-- 任务条目列表 -->
              <div class="p-3 space-y-1.5 flex-grow">
                ${
                  modTasks.length === 0
                    ? `
                  <div class="py-6 text-center text-xs text-slate-400">
                    暂无事项，点击下方添加
                  </div>
                `
                    : modTasks
                        .map((task) => `
                    <div
                      data-task="${task.id}"
                      class="task-row flex items-start justify-between p-2.5 rounded-xl border transition-all ${
                        task.completed
                          ? "bg-slate-50/60 dark:bg-slate-750/20 border-slate-200/50 dark:border-slate-700/40 opacity-60"
                          : "bg-white dark:bg-slate-750/70 border-slate-200/80 dark:border-slate-700 hover:border-slate-300"
                      }"
                    >
                      <div class="flex items-start space-x-2.5 mr-2">
                        <!-- 复选框 -->
                        <button
                          data-action="toggle"
                          class="mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-all ${
                            task.completed
                              ? "bg-emerald-600 text-white border-emerald-600 text-[10px]"
                              : "border-slate-300 dark:border-slate-600 hover:border-emerald-500"
                          }"
                        >
                          ${task.completed ? "✓" : ""}
                        </button>

                        <div>
                          <div class="flex items-center space-x-1.5">
                            <span class="text-[10px] font-mono font-medium text-slate-400">${task.time}</span>
                            ${
                              task.isFixed
                                ? '<span class="text-[9px] px-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-500">基准</span>'
                                : '<span class="text-[9px] px-1 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">自建</span>'
                            }
                          </div>
                          <div class="text-xs font-medium text-slate-800 dark:text-slate-100 leading-snug mt-0.5 ${
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
                      <div class="flex items-center space-x-0.5 flex-shrink-0">
                        <button data-action="edit" title="编辑任务" class="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button data-action="delete" title="删除任务" class="p-1 rounded text-slate-400 hover:text-rose-500">
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
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
                  class="add-mod-task-btn w-full py-1.5 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 hover:border-slate-400 text-slate-500 dark:text-slate-400 hover:text-slate-700 text-xs font-medium transition-all flex items-center justify-center space-x-1"
                >
                  <span>+ 添加一条${mod.name.slice(0, 4)}任务</span>
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

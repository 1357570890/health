// 今日全天行动工作台容器组件 (含快捷常用任务库与历史档案回溯)
import { store } from "../../core/store.js";
import { playGentleChime } from "../../core/utils.js";
import { renderDateNavigator } from "./dateNavigator.js";
import { renderQuickPresetsBar } from "./quickPresetsBar.js";
import { renderTrackModulesView } from "./trackModulesView.js";
import { renderTrackTimelineView } from "./trackTimelineView.js";
import { renderTaskModal } from "./taskModal.js";

export function renderDailyContainer() {
  const container = document.createElement("div");
  container.className = "space-y-4";

  let dailyViewMode = "modules"; // 'modules' | 'timeline'

  function render() {
    const isToday = store.isViewingToday();
    const progress = store.calculateProgress();

    container.innerHTML = `
      <!-- 1. 历史日期导航与回溯条 -->
      <div id="date-nav-mount"></div>

      <!-- 2. 常用任务闪电直达横条 (支持自己新增模板) -->
      <div id="presets-mount"></div>

      <!-- 3. 工作台核心操作与完成率面板 -->
      <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 rounded-3xl p-5 sm:p-6 text-white shadow-xl space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="flex items-center space-x-2 text-xs text-indigo-300 font-semibold mb-1">
              <span>💻 工位深度自律模式</span>
              <span>•</span>
              <span class="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-[10px]">
                ${isToday ? "今日实时执行" : "历史履历复盘"}
              </span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black">全天生活健康与行动工作台</h2>
            <p class="text-xs text-slate-300 mt-0.5">
              饮食营养、体能运动、重点攻坚独立分轨，基准习惯自动注入，常用任务一秒直达。
            </p>
          </div>

          <!-- 右侧操作按钮组 -->
          <div class="flex flex-wrap items-center gap-2">
            <button
              id="add-custom-task-btn"
              class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/30 transition-all flex items-center space-x-1.5"
            >
              <span>➕</span>
              <span>添加临时待办</span>
            </button>
            <button
              id="reset-baseline-btn"
              title="重新加载当天的健康与运动基准固定任务"
              class="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-semibold text-xs border border-white/10 transition-all"
            >
              🔄 恢复基准
            </button>
          </div>
        </div>

        <!-- 进度条与视角切换 -->
        <div class="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10">
          <div class="flex items-center space-x-3">
            <div class="text-xs font-bold text-slate-300">
              闭环达成：<span class="text-emerald-400 font-mono text-sm">${progress.done}</span> / ${progress.total}
            </div>
            <div class="w-28 sm:w-44 bg-white/10 rounded-full h-2 overflow-hidden">
              <div class="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-300" style="width: ${progress.percent}%"></div>
            </div>
            <span class="text-xs font-bold text-emerald-300 font-mono">${progress.percent}%</span>
          </div>

          <!-- 双模视图切换 -->
          <div class="flex items-center bg-black/20 p-1 rounded-xl border border-white/10 text-xs">
            <button
              id="switch-modules-view"
              class="px-3 py-1.5 rounded-lg font-bold transition-all ${
                dailyViewMode === "modules"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }"
            >
              🍱 分模块多轨看板
            </button>
            <button
              id="switch-timeline-view"
              class="px-3 py-1.5 rounded-lg font-bold transition-all ${
                dailyViewMode === "timeline"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }"
            >
              ⏱️ 全天时序流水线
            </button>
          </div>
        </div>
      </div>

      <!-- 4. 主视图渲染挂载区 -->
      <div id="daily-view-mount"></div>
    `;

    // 挂载日期导航与快捷栏
    container.querySelector("#date-nav-mount")?.appendChild(renderDateNavigator());
    container.querySelector("#presets-mount")?.appendChild(renderQuickPresetsBar());

    const mount = container.querySelector("#daily-view-mount");
    if (mount) {
      if (dailyViewMode === "modules") {
        mount.appendChild(renderTrackModulesView());
      } else {
        mount.appendChild(renderTrackTimelineView());
      }
    }

    // 绑定事件
    container.querySelector("#add-custom-task-btn")?.addEventListener("click", () => {
      const modal = renderTaskModal(null, (newTask) => {
        store.addTask(newTask);
        playGentleChime(587.33, 0.15);
      });
      document.body.appendChild(modal);
    });

    container.querySelector("#reset-baseline-btn")?.addEventListener("click", () => {
      if (confirm("确定要将当前日期的日程重置为标准基准任务吗？")) {
        store.resetDateToBaseline();
        playGentleChime(440, 0.1);
      }
    });

    container.querySelector("#switch-modules-view")?.addEventListener("click", () => {
      if (dailyViewMode === "modules") return;
      dailyViewMode = "modules";
      render();
    });

    container.querySelector("#switch-timeline-view")?.addEventListener("click", () => {
      if (dailyViewMode === "timeline") return;
      dailyViewMode = "timeline";
      render();
    });
  }

  render();

  store.subscribe("tasksChanged", () => render());
  store.subscribe("dateChanged", () => render());
  store.subscribe("presetsChanged", () => render());

  return container;
}

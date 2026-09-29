// 课表体系顶层容器：统筹【每周全景大课表】与【今日时序流】
import { renderWeeklyTimetable } from "./weeklyTimetable.js";
import { renderTodayTimeline } from "./todayTimeline.js";
import { renderCellDetailModal } from "./cellDetailModal.js";

export function renderTimetableContainer() {
  const container = document.createElement("div");
  container.className = "space-y-6";

  let viewType = "weekly"; // 'weekly' | 'today'

  function renderView() {
    container.innerHTML = `
      <!-- 模式切换控制器 -->
      <div class="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-slate-900 to-slate-800 p-4 rounded-3xl text-white shadow-lg">
        <div class="flex items-center space-x-3">
          <span class="text-2xl">🗓️</span>
          <div>
            <h2 class="text-base sm:text-lg font-bold">全域生活自律与执行总览大课表</h2>
            <p class="text-xs text-slate-300">把工作攻坚、三餐营养、运动健身与睡眠像大课表一样排布，清晰掌控节奏</p>
          </div>
        </div>

        <div class="flex items-center bg-slate-800 p-1 rounded-2xl border border-slate-700">
          <button
            id="switch-weekly-view"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              viewType === "weekly"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-slate-400 hover:text-white"
            }"
          >
            📅 每周总览全表 (全景)
          </button>
          <button
            id="switch-today-view"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              viewType === "today"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-slate-400 hover:text-white"
            }"
          >
            ⏱️ 今日专注时序流
          </button>
        </div>
      </div>

      <!-- 子视图挂载区 -->
      <div id="timetable-view-mount"></div>
    `;

    const mount = container.querySelector("#timetable-view-mount");
    if (!mount) return;

    const handleSelectCell = (data) => {
      const modal = renderCellDetailModal(data, () => {});
      document.body.appendChild(modal);
    };

    if (viewType === "weekly") {
      mount.appendChild(renderWeeklyTimetable(handleSelectCell));
    } else {
      mount.appendChild(renderTodayTimeline(handleSelectCell));
    }

    container.querySelector("#switch-weekly-view")?.addEventListener("click", () => {
      if (viewType === "weekly") return;
      viewType = "weekly";
      renderView();
    });

    container.querySelector("#switch-today-view")?.addEventListener("click", () => {
      if (viewType === "today") return;
      viewType = "today";
      renderView();
    });
  }

  renderView();
  return container;
}

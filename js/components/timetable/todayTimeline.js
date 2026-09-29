// 今日专属时序课表组件 (Today Focus Timeline)
import { TIMETABLE_SLOTS, getTimetableCell } from "../../data/timetableData.js";
import { getTodayDisplay, playGentleChime } from "../../core/utils.js";

export function renderTodayTimeline(onSelectCell) {
  const container = document.createElement("div");
  container.className = "bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6";

  const dayIndex = new Date().getDay();
  const weekdayMap = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const currentWeekday = weekdayMap[dayIndex];
  const todayText = getTodayDisplay();

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  container.innerHTML = `
    <!-- 头部今日定位 -->
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700/60 pb-4">
      <div>
        <div class="flex items-center space-x-2">
          <span class="text-xl">⏱️</span>
          <h3 class="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">今日专注科研与健康执行流水</h3>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${todayText} • 当前正在执行的事项目前已高亮</p>
      </div>
      <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300">
        ${currentWeekday}专属时刻表
      </span>
    </div>

    <!-- 垂直时序流 -->
    <div class="space-y-3 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
      ${TIMETABLE_SLOTS.map((slot) => {
        const cell = getTimetableCell(currentWeekday, slot.id);
        const [start, end] = slot.time.split("~");
        const [sh, sm] = start.split(":").map(Number);
        const [eh, em] = end.split(":").map(Number);
        const startM = sh * 60 + sm;
        let endM = eh * 60 + em;
        if (endM < startM) endM += 24 * 60;

        const isCurrent = currentMinutes >= startM && currentMinutes < endM;
        const isPast = currentMinutes >= endM;

        return `
          <div class="relative pl-10">
            <!-- 节点圆点 -->
            <div class="absolute left-2.5 top-3 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-800 ${
              isCurrent
                ? "bg-emerald-500 ring-4 ring-emerald-500/30 animate-pulse"
                : isPast
                ? "bg-slate-400"
                : "bg-slate-300 dark:bg-slate-600"
            }"></div>

            <!-- 卡片 -->
            <div
              data-slot="${slot.id}"
              class="today-slot-card p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                isCurrent
                  ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 ring-2 ring-emerald-400/30 shadow-md"
                  : "bg-slate-50 dark:bg-slate-750/30 border-slate-200 dark:border-slate-700 hover:border-slate-300"
              }"
            >
              <div class="flex flex-wrap items-center justify-between gap-1 mb-1">
                <div class="flex items-center space-x-2">
                  <span class="text-xs font-mono font-bold ${isCurrent ? "text-emerald-700 dark:text-emerald-300" : "text-slate-500"}">${slot.time}</span>
                  <span class="text-xs font-bold text-slate-800 dark:text-slate-100">${slot.label}</span>
                </div>
                <div class="flex items-center space-x-1.5">
                  <span class="text-[10px] px-2 py-0.5 rounded-md font-bold bg-white dark:bg-black/30 text-slate-700 dark:text-slate-300 shadow-sm">${cell.badge}</span>
                  ${isCurrent ? '<span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500 text-white font-extrabold">此时此刻</span>' : ""}
                </div>
              </div>

              <div class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">${cell.title}</div>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">${cell.details}</p>

              <div class="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200/50 dark:border-slate-700/50 pt-2">
                <span>💡 ${cell.brief}</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-semibold">点击查看细则 →</span>
              </div>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  // 绑定点击
  container.querySelectorAll(".today-slot-card").forEach((card) => {
    card.addEventListener("click", () => {
      const slotId = card.getAttribute("data-slot");
      const slot = TIMETABLE_SLOTS.find((s) => s.id === slotId);
      const cell = getTimetableCell(currentWeekday, slotId);
      playGentleChime(523.25, 0.1);
      onSelectCell({ day: currentWeekday, slot, cell });
    });
  });

  return container;
}

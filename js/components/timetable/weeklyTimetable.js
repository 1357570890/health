// 每周健康生活大课表组件 (支持桌面全景大网格 + 手机端单日/全周自适应视图)
import { TIMETABLE_SLOTS, WEEKDAYS, getTimetableCell } from "../../data/timetableData.js";
import { playGentleChime } from "../../core/utils.js";

export function renderWeeklyTimetable(onSelectCell) {
  const container = document.createElement("div");
  container.className = "space-y-4";

  const dayIndex = new Date().getDay();
  const weekdayMap = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const currentWeekday = weekdayMap[dayIndex];

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // 手机端模式：'all' (全景滚动) 或 单选周几 (例如 '周二')
  let selectedMobileDay = currentWeekday;
  let activeFilter = "all";

  const filterTabs = [
    { id: "all", label: "全部", icon: "🌐" },
    { id: "meal", label: "饮食", icon: "🥗" },
    { id: "sport", label: "运动羽球", icon: "🏸" },
    { id: "research", label: "科研", icon: "🔬" },
    { id: "water", label: "补水", icon: "💧" },
    { id: "sleep", label: "睡眠", icon: "🌙" }
  ];

  function isSlotCurrent(timeStr) {
    const [start, end] = timeStr.split("~");
    if (!start || !end) return false;
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const startM = sh * 60 + sm;
    let endM = eh * 60 + em;
    if (endM < startM) endM += 24 * 60;
    return currentMinutes >= startM && currentMinutes < endM;
  }

  function getThemeClasses(type) {
    switch (type) {
      case "meal":
        return "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300/80 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 hover:border-emerald-400";
      case "sport":
        return "bg-amber-50/90 dark:bg-amber-950/40 border-amber-300/80 dark:border-amber-800/60 text-amber-950 dark:text-amber-200 hover:border-amber-400";
      case "research":
        return "bg-sky-50/80 dark:bg-sky-950/30 border-sky-200/80 dark:border-sky-800/50 text-sky-900 dark:text-sky-200 hover:border-sky-400";
      case "water":
        return "bg-cyan-50/90 dark:bg-cyan-950/40 border-cyan-300/80 dark:border-cyan-800/60 text-cyan-900 dark:text-cyan-200 hover:border-cyan-400";
      case "sleep":
        return "bg-indigo-50/90 dark:bg-indigo-950/40 border-indigo-300/80 dark:border-indigo-800/60 text-indigo-900 dark:text-indigo-200 hover:border-indigo-400";
      default:
        return "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300";
    }
  }

  function renderTableHtml() {
    return `
      <!-- 控制栏：标题与筛选 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-3.5 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div class="flex items-center space-x-2">
              <span class="text-lg sm:text-xl">📅</span>
              <h2 class="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">每周全域自律与执行大课表</h2>
              <span class="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300">
                今日：${currentWeekday}
              </span>
            </div>
          </div>

          <!-- 标签类型筛选 -->
          <div class="flex items-center space-x-1 overflow-x-auto pb-1 no-scrollbar w-full sm:w-auto">
            ${filterTabs
              .map((tab) => `
                <button
                  data-filter="${tab.id}"
                  class="filter-tab-btn flex-shrink-0 flex items-center space-x-1 px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-semibold transition-all ${
                    activeFilter === tab.id
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm font-bold"
                      : "bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300"
                  }"
                >
                  <span>${tab.icon}</span>
                  <span>${tab.label}</span>
                </button>
              `)
              .join("")}
          </div>
        </div>

        <!-- 手机端专属：星期几单日/全周切换器 (仅在sm以下屏幕展示) -->
        <div class="sm:hidden pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          <span class="text-[10px] font-bold text-slate-400 flex-shrink-0 mr-1">选择星期：</span>
          <button
            data-mobile-day="all_table"
            class="mobile-day-btn flex-shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
              selectedMobileDay === "all_table"
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            }"
          >
            全周大表
          </button>
          ${WEEKDAYS.map((day) => `
            <button
              data-mobile-day="${day}"
              class="mobile-day-btn flex-shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                selectedMobileDay === day
                  ? "bg-emerald-600 text-white"
                  : day === currentWeekday
                  ? "bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
              }"
            >
              ${day}${day === currentWeekday ? " (今)" : ""}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- 手机端单日课表卡片流 (仅在移动端且非全周大表模式时呈现) -->
      <div class="sm:hidden ${selectedMobileDay === "all_table" ? "hidden" : "space-y-2"}">
        ${TIMETABLE_SLOTS.map((slot) => {
          const cell = getTimetableCell(selectedMobileDay, slot.id);
          const isNow = isSlotCurrent(slot.time) && selectedMobileDay === currentWeekday;
          const isDimmed = activeFilter !== "all" && cell.type !== activeFilter;

          return `
            <div
              data-day="${selectedMobileDay}"
              data-slot="${slot.id}"
              class="timetable-cell-box p-3 rounded-2xl border transition-all cursor-pointer flex items-start justify-between ${getThemeClasses(
                cell.type
              )} ${isDimmed ? "opacity-25" : ""} ${isNow ? "ring-2 ring-emerald-500 shadow-md" : ""}"
            >
              <div>
                <div class="flex items-center space-x-2 mb-1">
                  <span class="text-xs font-mono font-bold text-slate-500">${slot.time}</span>
                  <span class="text-[10px] px-1.5 py-0.2 rounded font-extrabold bg-white/70 dark:bg-black/30">${cell.badge}</span>
                  ${isNow ? '<span class="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-white font-black animate-pulse">此时此刻</span>' : ""}
                </div>
                <div class="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  ${cell.title}
                </div>
                <div class="text-[11px] opacity-75 mt-0.5 leading-tight">
                  ${cell.brief}
                </div>
              </div>
              <span class="text-slate-400 text-xs font-bold flex-shrink-0 ml-2">→</span>
            </div>
          `;
        }).join("")}
      </div>

      <!-- 桌面端与移动全景大表格 (桌面常驻，手机在all_table时出现) -->
      <div class="${selectedMobileDay !== "all_table" ? "hidden sm:block" : "block"} overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-800">
        <table class="w-full text-left border-collapse min-w-[880px]">
          <thead>
            <tr class="bg-slate-100/90 dark:bg-slate-750/70 border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200">
              <th class="p-2.5 w-24 text-center sticky left-0 bg-slate-100 dark:bg-slate-800 z-20 border-r border-slate-200 dark:border-slate-700">时段</th>
              ${WEEKDAYS.map((day) => `
                <th class="p-2.5 text-center border-r border-slate-200/70 dark:border-slate-700/70 last:border-r-0 ${
                  day === currentWeekday ? "bg-amber-100/60 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300" : ""
                }">
                  ${day}${day === currentWeekday ? ' <span class="text-[10px] px-1 rounded bg-amber-400 text-amber-950 font-black">今日</span>' : ""}
                </th>
              `).join("")}
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700/60 text-xs">
            ${TIMETABLE_SLOTS.map((slot) => {
              const isNowRow = isSlotCurrent(slot.time);
              return `
                <tr class="${isNowRow ? "bg-amber-50/30 dark:bg-amber-950/20" : ""}">
                  <td class="p-2 text-center sticky left-0 bg-slate-50 dark:bg-slate-800 z-10 border-r border-slate-200 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-300">
                    <div class="text-[11px] font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center space-x-1">
                      <span>${slot.label}</span>
                      ${isNowRow ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>' : ""}
                    </div>
                    <div class="text-[9px] text-slate-400 font-mono mt-0.5">${slot.time}</div>
                  </td>
                  ${WEEKDAYS.map((day) => {
                    const cell = getTimetableCell(day, slot.id);
                    const isToday = day === currentWeekday;
                    const isDimmed = activeFilter !== "all" && cell.type !== activeFilter;
                    return `
                      <td class="p-1 border-r border-slate-200/60 dark:border-slate-700/60 last:border-r-0 align-top ${
                        isToday ? "bg-amber-50/20 dark:bg-amber-950/10" : ""
                      }">
                        <div
                          data-day="${day}"
                          data-slot="${slot.id}"
                          class="timetable-cell-box p-1.5 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between min-h-[72px] ${getThemeClasses(
                            cell.type
                          )} ${isDimmed ? "opacity-25" : "hover:scale-[1.02]"}"
                        >
                          <div>
                            <span class="text-[8px] px-1 py-0.2 rounded font-extrabold bg-white/70 dark:bg-black/30 line-clamp-1">${cell.badge}</span>
                            <div class="text-[10px] font-bold leading-snug line-clamp-2 mt-0.5">${cell.title}</div>
                          </div>
                          <div class="text-[9px] opacity-75 leading-tight line-clamp-1 mt-1 font-medium">${cell.brief}</div>
                        </div>
                      </td>
                    `;
                  }).join("")}
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  container.innerHTML = renderTableHtml();

  function attachEvents() {
    container.querySelectorAll(".timetable-cell-box").forEach((box) => {
      box.addEventListener("click", () => {
        const day = box.getAttribute("data-day");
        const slotId = box.getAttribute("data-slot");
        const slot = TIMETABLE_SLOTS.find((s) => s.id === slotId);
        const cell = getTimetableCell(day, slotId);
        playGentleChime(523.25, 0.1);
        onSelectCell({ day, slot, cell });
      });
    });

    container.querySelectorAll(".filter-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeFilter = btn.getAttribute("data-filter");
        container.innerHTML = renderTableHtml();
        attachEvents();
      });
    });

    container.querySelectorAll(".mobile-day-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedMobileDay = btn.getAttribute("data-mobile-day");
        container.innerHTML = renderTableHtml();
        attachEvents();
      });
    });
  }

  attachEvents();
  return container;
}

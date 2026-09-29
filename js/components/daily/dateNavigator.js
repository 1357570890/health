// 历史计划与日期回溯导航器组件
import { store } from "../../core/store.js";
import { getTodayKey, playGentleChime } from "../../core/utils.js";

export function renderDateNavigator() {
  const container = document.createElement("div");
  container.className = "flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-800 p-3.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm";

  const currentDateKey = store.getSelectedDate();
  const isToday = store.isViewingToday();

  const d = new Date(currentDateKey + "T00:00:00");
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const displayStr = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${weekdays[d.getDay()]}`;

  function shiftDate(offsetDays) {
    const target = new Date(currentDateKey + "T00:00:00");
    target.setDate(target.getDate() + offsetDays);
    const y = target.getFullYear();
    const m = String(target.getMonth() + 1).padStart(2, "0");
    const day = String(target.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  container.innerHTML = `
    <!-- 左侧切换 -->
    <div class="flex items-center space-x-2">
      <button id="prev-day-btn" title="查看前一天历史档案" class="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all">
        ◀ 前一天
      </button>

      <div class="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700">
        <span class="text-sm">📅</span>
        <span class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">${displayStr}</span>
        <input type="date" id="date-picker-input" value="${currentDateKey}" class="w-5 opacity-0 absolute cursor-pointer" />
      </div>

      <button id="next-day-btn" title="查看后一天" class="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all">
        后一天 ▶
      </button>
    </div>

    <!-- 右侧状态与回到今天 -->
    <div class="flex items-center space-x-2">
      <span class="text-xs px-2.5 py-1 rounded-full font-bold ${
        isToday
          ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300"
          : "bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300"
      }">
        ${isToday ? "🟢 今日进行中" : "📁 历史计划档案复盘"}
      </span>

      ${
        !isToday
          ? `
        <button id="back-today-btn" class="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all">
          回到今天
        </button>
      `
          : ""
      }
    </div>
  `;

  // 绑定事件
  container.querySelector("#prev-day-btn")?.addEventListener("click", () => {
    const prevKey = shiftDate(-1);
    store.setSelectedDate(prevKey);
    playGentleChime(440, 0.1);
  });

  container.querySelector("#next-day-btn")?.addEventListener("click", () => {
    const nextKey = shiftDate(1);
    store.setSelectedDate(nextKey);
    playGentleChime(493.88, 0.1);
  });

  container.querySelector("#back-today-btn")?.addEventListener("click", () => {
    store.setSelectedDate(getTodayKey());
    playGentleChime(523.25, 0.12);
  });

  const picker = container.querySelector("#date-picker-input");
  picker?.addEventListener("change", (e) => {
    const val = e.target.value;
    if (val) {
      store.setSelectedDate(val);
      playGentleChime(523.25, 0.12);
    }
  });

  return container;
}

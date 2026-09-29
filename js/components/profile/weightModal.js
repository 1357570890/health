// 体重记录与历史趋势追踪弹窗 (Weight Tracking & History Modal)
import { healthTracker } from "../../core/healthTrackerService.js";
import { getTodayKey, getTodayDisplay, playGentleChime } from "../../core/utils.js";

export function renderWeightModal() {
  const overlay = document.createElement("div");
  overlay.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150";

  const todayStr = getTodayKey();
  const latest = healthTracker.getLatestWeight();

  function updateContent() {
    const logs = healthTracker.getWeightLogs();
    const curLatest = healthTracker.getLatestWeight();

    overlay.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-xl space-y-4">
        <!-- 头部 -->
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div class="flex items-center space-x-2">
            <span class="text-xl">⚖️</span>
            <div>
              <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white">体重记录与变化趋势</h3>
              <p class="text-[11px] text-slate-400">无需每日称重，有测定时随手记录即可</p>
            </div>
          </div>
          <button id="close-weight-modal-btn" class="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm">
            ✕
          </button>
        </div>

        <!-- 当前最新体重卡片 -->
        <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-750/50 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
          <div>
            <span class="text-[11px] text-slate-400 block">最近记录体重 (${curLatest.date})</span>
            <div class="flex items-baseline space-x-1.5 mt-0.5">
              <span class="text-2xl font-black text-slate-900 dark:text-white font-mono">${curLatest.current}</span>
              <span class="text-xs font-semibold text-slate-500">kg</span>
            </div>
          </div>
          <div class="text-right">
            <span class="text-[11px] text-slate-400 block">较上一次对比</span>
            <span class="text-xs font-bold font-mono ${
              curLatest.diff > 0 ? "text-rose-500" : (curLatest.diff < 0 ? "text-emerald-500" : "text-slate-400")
            }">
              ${curLatest.diff > 0 ? `+${curLatest.diff}` : `${curLatest.diff}`} kg
            </span>
          </div>
        </div>

        <!-- 录入新体重输入栏 -->
        <div class="space-y-2">
          <label class="text-xs font-bold text-slate-700 dark:text-slate-300">记录一次新测量值</label>
          <div class="flex items-center space-x-2">
            <input
              id="input-weight-val"
              type="number"
              step="0.1"
              placeholder="${curLatest.current}"
              class="w-32 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 text-sm font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
            />
            <span class="text-xs font-bold text-slate-500">kg</span>
            <input
              id="input-weight-note"
              type="text"
              placeholder="备注 (如：晨起空腹/运动后)"
              class="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <button
              id="submit-weight-btn"
              class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold text-xs shrink-0 transition-all active:scale-95"
            >
              保存
            </button>
          </div>
        </div>

        <!-- 历史测量明细列表 -->
        <div class="space-y-1.5">
          <span class="text-xs font-bold text-slate-700 dark:text-slate-300 block">历史测定档案</span>
          <div class="max-h-48 overflow-y-auto space-y-1 pr-1 no-scrollbar">
            ${logs.length === 0 ? `
              <div class="p-4 text-center rounded-xl bg-slate-50 dark:bg-slate-750/30 text-xs text-slate-400">
                暂无历史记录，上方输入即可保存第一次测定
              </div>
            ` : logs.map((item, idx) => {
              const prev = idx < logs.length - 1 ? logs[idx + 1] : item;
              const delta = parseFloat((item.weight - prev.weight).toFixed(1));
              return `
                <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-750/40 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <div class="flex items-center space-x-2">
                    <span class="font-mono text-slate-400 text-[11px]">${item.date}</span>
                    <span class="font-bold text-slate-800 dark:text-slate-100 font-mono">${item.weight} kg</span>
                    ${item.note ? `<span class="text-[10px] text-slate-400">(${item.note})</span>` : ""}
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="font-mono text-[11px] font-bold ${
                      delta > 0 ? "text-rose-500" : (delta < 0 ? "text-emerald-500" : "text-slate-400")
                    }">
                      ${delta > 0 ? `+${delta}` : (delta < 0 ? `${delta}` : "持平")}
                    </span>
                    <button data-delete-weight="${item.id}" class="text-slate-300 hover:text-rose-500 text-xs p-0.5">
                      ✕
                    </button>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    `;

    // 绑定关闭
    overlay.querySelector("#close-weight-modal-btn")?.addEventListener("click", () => {
      document.body.removeChild(overlay);
    });

    // 绑定提交
    overlay.querySelector("#submit-weight-btn")?.addEventListener("click", () => {
      const valInput = overlay.querySelector("#input-weight-val");
      const noteInput = overlay.querySelector("#input-weight-note");
      const val = parseFloat(valInput?.value);
      if (!val || val < 30 || val > 200) {
        alert("请输入合理的体重数值（30~200kg）");
        return;
      }
      healthTracker.logWeight(val, noteInput?.value || "", todayStr);
      playGentleChime(784, 0.15);
      updateContent();
    });

    // 绑定删除
    overlay.querySelectorAll("[data-delete-weight]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-delete-weight");
        healthTracker.deleteWeightLog(id);
        updateContent();
      });
    });
  }

  updateContent();

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });

  return overlay;
}

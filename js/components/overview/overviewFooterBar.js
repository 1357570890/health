// 底部状态胶囊条模块 (Compact Footer Status Bar with Depreciation & Evening Snapshot)
import { store } from "../../core/store.js";
import { getTodayKey, playGentleChime } from "../../core/utils.js";
import { renderInventoryModal } from "../inventory/inventoryModal.js";
import { renderEveningSnapshotModal } from "../profile/eveningSnapshotModal.js";

export function renderOverviewFooterBar(onNavigate) {
  const container = document.createElement("div");
  container.className = "bg-white dark:bg-slate-800 rounded-2xl px-4 py-2 border border-slate-200/90 dark:border-slate-700/80 shadow-xs flex flex-wrap items-center justify-between gap-2.5 text-xs transition-all";

  const todayStr = getTodayKey();
  const lowStockItems = store.getLowStockItems();
  const now = new Date();
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const dayName = weekdays[now.getDay()];

  let exerciseText = "今日体能：力量抗阻训练日（护肩固膝4组）";
  if (dayName === "周二" || dayName === "周四") {
    exerciseText = "今日体能：操场4公里慢跑（Zone 2 心率有氧）";
  } else if (dayName === "周六") {
    exerciseText = "今日实战：球馆羽毛球对抗90分钟（生胶底球鞋）";
  } else if (dayName === "周日") {
    exerciseText = "今日体能：主动身心重启与户外排酸漫游";
  }

  // 计算食材消耗天数倒计时
  let pantryCountdownHtml = `<span class="text-slate-400 flex items-center space-x-1"><span>🛒 食材充足</span></span>`;
  if (lowStockItems.length > 0) {
    const urgent = lowStockItems[0];
    const daysLeft = Math.max(0, Math.floor(urgent.stock / (urgent.dailyUsage || 1)));
    pantryCountdownHtml = `
      <button id="footer-jump-inventory" class="flex items-center space-x-1 text-amber-700 dark:text-amber-300 font-bold hover:underline">
        <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
        <span>🛒 ${urgent.name}剩${urgent.stock}${urgent.unit} (约支撑${daysLeft}天)</span>
      </button>
    `;
  }

  container.innerHTML = `
    <!-- 左侧：今日体能安排胶囊 -->
    <div class="flex items-center space-x-2">
      <span class="text-sm">🏃</span>
      <span class="font-bold text-slate-800 dark:text-slate-200">${exerciseText}</span>
      <button id="footer-jump-workout" class="text-amber-600 dark:text-amber-400 hover:underline font-semibold ml-1">
        动作方案 ➔
      </button>
    </div>

    <!-- 右侧：食材库存倒计时、晚间战报与数据备份 -->
    <div class="flex items-center space-x-2.5 ml-auto shrink-0">
      ${pantryCountdownHtml}

      <span class="text-slate-300 dark:text-slate-600">|</span>

      <button id="footer-evening-snapshot" class="px-2 py-0.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold transition-all flex items-center space-x-1" title="生成今日自律闭环快照与复盘战报">
        <span>🌙 今日战报</span>
      </button>

      <span class="text-slate-300 dark:text-slate-600">|</span>

      <button id="footer-export-json" class="text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors flex items-center space-x-1 font-medium" title="一键导出所有任务记录与素材为 JSON">
        <span>📥 备份</span>
      </button>
    </div>
  `;

  container.querySelector("#footer-jump-workout")?.addEventListener("click", () => {
    onNavigate("plans", "fitness_plan");
  });

  container.querySelector("#footer-jump-inventory")?.addEventListener("click", () => {
    renderInventoryModal();
  });

  container.querySelector("#footer-evening-snapshot")?.addEventListener("click", () => {
    const modal = renderEveningSnapshotModal();
    document.body.appendChild(modal);
  });

  container.querySelector("#footer-export-json")?.addEventListener("click", () => {
    const jsonStr = store.exportDataJson();
    const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `lifeplan_backup_${todayStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    playGentleChime(880, 0.2);
  });

  return container;
}

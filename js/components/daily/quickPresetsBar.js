// 常用快捷任务模板横条与自定义预设管理组件
import { store } from "../../core/store.js";
import { playGentleChime } from "../../core/utils.js";
import { renderPresetManagerModal } from "./presetManagerModal.js";

export function renderQuickPresetsBar() {
  const container = document.createElement("div");
  container.className = "bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2.5";

  const presets = store.getQuickPresets();

  function getBadgeIcon(cat) {
    switch (cat) {
      case "sport": return "🏃";
      case "research": return "🔬";
      case "diet": return "🥗";
      case "growth": return "🚀";
      case "habit": return "💧";
      default: return "⚡";
    }
  }

  container.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <span class="text-sm">⚡</span>
        <h4 class="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
          高频常用任务闪电直达 (点击1秒注入今日)
        </h4>
      </div>
      <button id="manage-presets-btn" class="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold flex items-center space-x-1">
        <span>⚙️ 自定义常用库</span>
      </button>
    </div>

    <!-- 常用胶囊横向滑动条 -->
    <div class="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
      ${presets
        .map(
          (p) => `
        <button
          data-preset-id="${p.id}"
          title="点击将【${p.title}】快捷加入今日日程"
          class="quick-preset-chip flex-shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750/70 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-300 dark:hover:border-emerald-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition-all"
        >
          <span>${getBadgeIcon(p.category)}</span>
          <span class="font-bold truncate max-w-[160px]">${p.title}</span>
          <span class="text-[10px] opacity-60 font-mono">${p.time}</span>
          <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold">+</span>
        </button>
      `
        )
        .join("")}
    </div>
  `;

  // 点击快捷注入今日日程
  container.querySelectorAll(".quick-preset-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const pid = chip.getAttribute("data-preset-id");
      const targetPreset = presets.find((p) => p.id === pid);
      if (targetPreset) {
        store.addTask({
          title: targetPreset.title,
          time: targetPreset.time,
          category: targetPreset.category,
          badge: targetPreset.badge || "快捷追加",
          details: targetPreset.details || "从高频常用模板快捷注入"
        });
        playGentleChime(587.33, 0.15);
      }
    });
  });

  // 打开常用库管理弹窗
  container.querySelector("#manage-presets-btn")?.addEventListener("click", () => {
    const modal = renderPresetManagerModal();
    document.body.appendChild(modal);
  });

  return container;
}

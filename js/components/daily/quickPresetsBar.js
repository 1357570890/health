// 常用快捷任务模板横条与自定义预设管理组件
import { store } from "../../core/store.js";
import { playGentleChime } from "../../core/utils.js";
import { renderPresetManagerModal } from "./presetManagerModal.js";

export function renderQuickPresetsBar() {
  const container = document.createElement("div");
  container.className = "bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-700/80 shadow-sm space-y-2.5";

  const presets = store.getQuickPresets();

  container.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <span class="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white"></span>
        <h4 class="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
          高频工位预设（一键添加至今日）
        </h4>
      </div>
      <button id="manage-presets-btn" class="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors">
        管理预设库
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
          class="quick-preset-chip flex-shrink-0 flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-750/70 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-medium transition-all"
        >
          <span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
            ${p.badge || "快捷"}
          </span>
          <span class="font-medium truncate max-w-[170px]">${p.title}</span>
          <span class="text-[10px] text-slate-400 font-mono">${p.time}</span>
          <span class="text-[11px] text-slate-400 font-bold">+</span>
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

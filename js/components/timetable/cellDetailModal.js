// 课表单元格详情抽屉/弹窗组件
export function renderCellDetailModal(data, onClose) {
  const { day, slot, cell } = data;

  const overlay = document.createElement("div");
  overlay.className = "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200";

  overlay.innerHTML = `
    <div class="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4 max-h-[90vh] overflow-y-auto">
      <!-- 头部 -->
      <div class="flex items-start justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
        <div>
          <div class="flex items-center space-x-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
            <span>📅 ${day}</span>
            <span>•</span>
            <span>⏰ ${slot.time}</span>
            <span class="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold">${slot.label}</span>
          </div>
          <h3 class="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">${cell.title}</h3>
        </div>
        <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center text-slate-500 font-bold transition-colors">
          ✕
        </button>
      </div>

      <!-- 核心规范 -->
      <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-750/50 border border-slate-200/60 dark:border-slate-700 space-y-1">
        <span class="text-xs font-bold text-slate-400 uppercase">📋 执行规程与标配：</span>
        <p class="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">${cell.details}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${cell.brief}</p>
      </div>

      <!-- 1:1替换库（如果有） -->
      ${
        cell.sub
          ? `
        <div class="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-xs">
          <span class="font-bold text-amber-900 dark:text-amber-300 block mb-1">🔄 1:1平替与自由轮换：</span>
          <p class="text-amber-800 dark:text-amber-200 leading-relaxed">${cell.sub}</p>
        </div>
      `
          : ""
      }

      <!-- 避坑提醒 -->
      ${
        cell.tips
          ? `
        <div class="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-300">
          <span class="font-bold block mb-1">⚠️ 实操避坑细节：</span>
          <p class="leading-relaxed">${cell.tips}</p>
        </div>
      `
          : ""
      }

      <!-- 底部关闭按钮 -->
      <div class="pt-2 flex justify-end">
        <button id="modal-confirm-btn" class="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all">
          知道了，按表执行
        </button>
      </div>
    </div>
  `;

  // 绑定关闭
  const close = () => {
    overlay.remove();
    onClose?.();
  };

  overlay.querySelector("#modal-close-btn")?.addEventListener("click", close);
  overlay.querySelector("#modal-confirm-btn")?.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  return overlay;
}

// 临时任务添加与编辑弹窗组件
export function renderTaskModal(initialData = null, onSave, onClose) {
  const isEdit = !!initialData;
  const overlay = document.createElement("div");
  overlay.className = "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200";

  const categories = [
    { id: "research", label: "科研实验攻坚", icon: "🔬" },
    { id: "diet", label: "饮食与加餐", icon: "🥗" },
    { id: "sport", label: "健身跑步球类", icon: "🏸" },
    { id: "growth", label: "个人提升成长", icon: "🚀" },
    { id: "habit", label: "生活作息习惯", icon: "💧" }
  ];

  const currentCat = initialData?.category || "research";

  overlay.innerHTML = `
    <div class="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
        <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
          <span>${isEdit ? "✏️ 编辑任务" : "➕ 添加今日专属待办"}</span>
        </h3>
        <button id="modal-close-x" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold transition-colors">✕</button>
      </div>

      <!-- 分类选择 -->
      <div>
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">所属模块</label>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2" id="category-selector">
          ${categories
            .map((c) => `
              <button
                type="button"
                data-cat="${c.id}"
                class="cat-option-btn p-2 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  c.id === currentCat
                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-400/30"
                    : "bg-slate-50 dark:bg-slate-750 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                }"
              >
                <span>${c.icon}</span>
                <span class="truncate">${c.label}</span>
              </button>
            `)
            .join("")}
        </div>
      </div>

      <!-- 时间段 -->
      <div>
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">执行时段 (如 14:30~16:00)</label>
        <input
          type="text"
          id="task-time-input"
          value="${initialData?.time || ""}"
          placeholder="例如：14:30~16:00 或 全天随时"
          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
        />
      </div>

      <!-- 任务标题 -->
      <div>
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">任务名称 / 目标</label>
        <input
          type="text"
          id="task-title-input"
          value="${initialData?.title || ""}"
          placeholder="例如：修改论文第三章图表、测试光谱仪..."
          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
        />
      </div>

      <!-- 详细说明 -->
      <div>
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">执行说明 / 自律细节 (选填)</label>
        <textarea
          id="task-details-input"
          rows="2"
          placeholder="备注实验参数、注意要点或准备资料..."
          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
        >${initialData?.details || ""}</textarea>
      </div>

      <!-- 底部控制 -->
      <div class="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-700">
        <button id="modal-cancel-btn" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700">取消</button>
        <button id="modal-submit-btn" class="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30">
          ${isEdit ? "保存修改" : "确认添加"}
        </button>
      </div>
    </div>
  `;

  let selectedCat = currentCat;

  overlay.querySelectorAll(".cat-option-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedCat = btn.getAttribute("data-cat");
      overlay.querySelectorAll(".cat-option-btn").forEach((b) => {
        b.className = "cat-option-btn p-2 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-750 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300";
      });
      btn.className = "cat-option-btn p-2 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1.5 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-400/30";
    });
  });

  const close = () => {
    overlay.remove();
    onClose?.();
  };

  overlay.querySelector("#modal-close-x")?.addEventListener("click", close);
  overlay.querySelector("#modal-cancel-btn")?.addEventListener("click", close);

  overlay.querySelector("#modal-submit-btn")?.addEventListener("click", () => {
    const timeVal = overlay.querySelector("#task-time-input")?.value?.trim() || "全天随时";
    const titleVal = overlay.querySelector("#task-title-input")?.value?.trim();
    const detailsVal = overlay.querySelector("#task-details-input")?.value?.trim() || "";

    if (!titleVal) {
      alert("请填写任务名称！");
      return;
    }

    onSave({
      category: selectedCat,
      time: timeVal,
      title: titleVal,
      details: detailsVal
    });
    close();
  });

  return overlay;
}

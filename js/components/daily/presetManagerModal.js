// 常用任务模板库管理弹窗组件 (增删自定义模板)
import { store } from "../../core/store.js";
import { playGentleChime } from "../../core/utils.js";

export function renderPresetManagerModal() {
  const overlay = document.createElement("div");
  overlay.className = "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200";
  overlay.style.cssText = "position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100vw !important; height: 100vh !important; z-index: 9999 !important; display: flex !important; align-items: center !important; justify-content: center !important;";

  function renderModalContent() {
    const presets = store.getQuickPresets();

    overlay.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div>
            <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
              <span>⚙️</span>
              <span>高频常用任务模板库管理</span>
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">配置您专属的经常性科研实验、运动羽毛球与自律习惯</p>
          </div>
          <button id="close-modal-x" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold transition-colors">✕</button>
        </div>

        <!-- 现有模板列表 -->
        <div class="space-y-2 max-h-56 overflow-y-auto pr-1">
          ${presets
            .map(
              (p) => `
            <div class="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-xs">
              <div class="flex items-center space-x-2 truncate mr-2">
                <span class="font-bold text-slate-800 dark:text-slate-200 truncate">${p.title}</span>
                <span class="text-[10px] font-mono text-slate-400">(${p.time})</span>
              </div>
              <button data-del-preset="${p.id}" title="删除该模板" class="text-slate-400 hover:text-rose-500 p-1 rounded">
                🗑️
              </button>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- 添加新模板表单 -->
        <div class="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-3">
          <span class="text-xs font-bold text-emerald-900 dark:text-emerald-300 block">➕ 创建新的常用任务模板</span>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">所属分类</label>
              <select id="new-preset-cat" class="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none">
                <option value="research">🔬 科研实验</option>
                <option value="sport">🏸 健身球类</option>
                <option value="diet">🥗 饮食加餐</option>
                <option value="growth">🚀 个人提升</option>
                <option value="habit">💧 生活习惯</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">建议时段</label>
              <input type="text" id="new-preset-time" placeholder="如 19:00~20:30" class="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none" />
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">模板标题 (如：羽毛球单打对决90分钟)</label>
            <input type="text" id="new-preset-title" placeholder="输入常用任务名称..." class="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none" />
          </div>

          <button id="add-preset-btn" class="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all">
            保存到我的常用库
          </button>
        </div>

        <div class="pt-2 flex justify-end">
          <button id="close-modal-btn" class="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black dark:bg-slate-700 text-white font-bold text-xs">
            完成并返回
          </button>
        </div>
      </div>
    `;

    // 绑定删除模板
    overlay.querySelectorAll("[data-del-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-del-preset");
        store.deleteQuickPreset(id);
        playGentleChime(329.63, 0.1);
        renderModalContent();
      });
    });

    // 绑定新增模板
    overlay.querySelector("#add-preset-btn")?.addEventListener("click", () => {
      const cat = overlay.querySelector("#new-preset-cat")?.value;
      const timeVal = overlay.querySelector("#new-preset-time")?.value?.trim() || "全天随时";
      const titleVal = overlay.querySelector("#new-preset-title")?.value?.trim();

      if (!titleVal) {
        alert("请填写模板标题！");
        return;
      }

      store.addQuickPreset({
        category: cat,
        time: timeVal,
        title: titleVal,
        badge: "常用"
      });
      playGentleChime(587.33, 0.15);
      renderModalContent();
    });

    const close = () => overlay.remove();
    overlay.querySelector("#close-modal-x")?.addEventListener("click", close);
    overlay.querySelector("#close-modal-btn")?.addEventListener("click", close);
  }

  renderModalContent();
  return overlay;
}

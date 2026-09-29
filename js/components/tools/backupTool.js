// 本地健康数据归档与备份工具
import { store } from "../../core/store.js";
import { getTodayDisplay } from "../../core/utils.js";

export function renderBackupTool() {
  const container = document.createElement("div");
  container.className = "bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6";

  container.innerHTML = `
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-4">
      <div>
        <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
          <span>💾</span>
          <span>健康数据归档与跨端同步</span>
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">所有打卡与生活数据100%保存在您的浏览器本地，无隐私外泄风险。</p>
      </div>
      <span class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
        无服务器依赖
      </span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- 导出卡片 -->
      <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-750/40 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
        <div>
          <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">导出数据快照 (JSON)</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">将历史连续打卡、饮食履历与饮水记录打包下载为本地JSON文件，用于长期存档或换电脑迁移。</p>
        </div>
        <button id="download-json-btn" class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all text-center">
          立即导出备份文件
        </button>
      </div>

      <!-- 导入卡片 -->
      <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-750/40 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
        <div>
          <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">恢复历史备份文件</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">从此前导出的JSON文件中恢复打卡记录与天数累积，实现跨浏览器数据同步。</p>
        </div>
        <input type="file" id="upload-json-file" class="hidden" accept=".json" />
        <button id="trigger-upload-btn" class="w-full py-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white font-bold text-xs shadow-sm transition-all text-center">
          选择JSON文件恢复
        </button>
      </div>
    </div>
  `;

  // 绑定事件
  container.querySelector("#download-json-btn")?.addEventListener("click", () => {
    const jsonStr = store.exportDataJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `研途健康数据备份_${getTodayDisplay().split(" ")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  const fileInput = container.querySelector("#upload-json-file");
  container.querySelector("#trigger-upload-btn")?.addEventListener("click", () => {
    fileInput?.click();
  });

  fileInput?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        if (store.importDataJson(content)) {
          alert("打卡数据恢复成功！");
        } else {
          alert("恢复失败：文件并非有效的健康数据JSON格式。");
        }
      }
    };
    reader.readAsText(file, "utf-8");
  });

  return container;
}

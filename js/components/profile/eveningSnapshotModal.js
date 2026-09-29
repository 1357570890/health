// 晚间极简自律复盘快照弹窗 (Evening Reflection & Closure Snapshot Modal)
import { store } from "../../core/store.js";
import { healthTracker } from "../../core/healthTrackerService.js";
import { getTodayKey, getTodayDisplay, playGentleChime } from "../../core/utils.js";

export function renderEveningSnapshotModal() {
  const overlay = document.createElement("div");
  overlay.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150";

  const todayStr = getTodayKey();
  const tasks = store.getTasksForDate(todayStr);
  const dietTasks = tasks.filter((t) => t.category === "diet");
  const memoTasks = tasks.filter((t) => t.category !== "diet" && t.category !== "exercise");
  const exTasks = tasks.filter((t) => t.category === "exercise");
  const latestWeight = healthTracker.getLatestWeight();
  const foodCal = healthTracker.getTodayFoodCalories(todayStr);

  const doneDiet = dietTasks.filter((t) => t.completed).length;
  const doneMemo = memoTasks.filter((t) => t.completed).length;
  const exDone = exTasks.some((t) => t.completed);

  // 纯蛋白测算
  let proteinTotal = 0;
  dietTasks.forEach((t) => {
    if (t.completed) {
      if (t.id === "fixed_diet_breakfast") proteinTotal += 28;
      else if (t.id === "fixed_diet_lunch") proteinTotal += 35;
      else if (t.id === "fixed_diet_dinner") proteinTotal += 25;
      else proteinTotal += 5;
    }
  });

  const summaryText = `【全域规划·今日闭环战报 - ${getTodayDisplay()}】
🥗 饮食执行：四餐达成 ${doneDiet}/${dietTasks.length} · 纯蛋白约 ${proteinTotal}g · 外食 ${foodCal} kcal
🏃 体能训练：${exDone ? "✓ 今日体能已达标" : "未记录/休息日"} (${exTasks[0]?.title || "无"})
📝 备忘攻坚：完成 ${doneMemo}/${memoTasks.length} 项${memoTasks.length > doneMemo ? ` (尚存 ${memoTasks.length - doneMemo} 项待顺延)` : ""}
⚖️ 体重测定：${latestWeight.current} kg (${latestWeight.hasLog ? (latestWeight.diff > 0 ? `+${latestWeight.diff}kg` : `${latestWeight.diff}kg`) : "保持"})
🌙 复盘评级：${doneDiet >= 3 && (doneMemo > 0 || memoTasks.length === 0) ? "A+ 全面高效自律" : "B 稳步推进中"}
夜间 23:30 准时熄灯，锁定 5 个深度睡眠周期！`;

  overlay.innerHTML = `
    <div class="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-xl space-y-4">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
        <div class="flex items-center space-x-2">
          <span class="text-xl">🌙</span>
          <div>
            <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white">今日全域自律闭环快照</h3>
            <p class="text-[11px] text-slate-400">30秒扫清全天心智负担，给今天画上笃定句号</p>
          </div>
        </div>
        <button id="close-snapshot-btn" class="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm">
          ✕
        </button>
      </div>

      <div class="space-y-2.5 text-xs">
        <!-- 饮食 -->
        <div class="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-between">
          <div>
            <span class="font-bold text-emerald-900 dark:text-emerald-200 block">🥗 控糖饮食与蛋白质</span>
            <span class="text-[11px] text-emerald-700 dark:text-emerald-400">四餐已完成 ${doneDiet}/${dietTasks.length} · 纯蛋白约 ${proteinTotal}g</span>
          </div>
          <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">${doneDiet === dietTasks.length ? "100% 满分" : `${Math.round((doneDiet / dietTasks.length) * 100)}%`}</span>
        </div>

        <!-- 体能 -->
        <div class="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 flex items-center justify-between">
          <div>
            <span class="font-bold text-amber-900 dark:text-amber-200 block">🏃 3+2体能与运动</span>
            <span class="text-[11px] text-amber-700 dark:text-amber-400 truncate max-w-[200px] block">${exTasks[0]?.title || "体能执行"}</span>
          </div>
          <span class="font-bold font-mono ${exDone ? "text-emerald-600" : "text-amber-600"}">${exDone ? "✓ 已达成" : "待执行"}</span>
        </div>

        <!-- 备忘攻坚 -->
        <div class="p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-800/40 flex items-center justify-between">
          <div>
            <span class="font-bold text-indigo-900 dark:text-indigo-200 block">📝 个人备忘与科研攻坚</span>
            <span class="text-[11px] text-indigo-700 dark:text-indigo-400">已闭环 ${doneMemo}/${memoTasks.length} 项</span>
          </div>
          ${memoTasks.length > doneMemo ? `
            <button id="snapshot-rollover-btn" class="px-2 py-0.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold shadow-xs">
              预排明天 ➔
            </button>
          ` : `
            <span class="text-indigo-600 font-bold font-mono">全部搞定</span>
          `}
        </div>

        <!-- 体重与外食 -->
        <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-750/40 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-slate-600 dark:text-slate-300">
          <span>⚖️ 最新体重: <b class="font-mono text-slate-800 dark:text-slate-100">${latestWeight.current}kg</b></span>
          <span>🍜 外食摄入: <b class="font-mono text-amber-600">${foodCal} kcal</b></span>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center space-x-2">
        <button id="copy-summary-btn" class="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center space-x-1">
          <span>📋 复制战报文本</span>
        </button>
        <button id="dismiss-btn" class="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-650 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all">
          安睡熄灯
        </button>
      </div>
    </div>
  `;

  // 绑定事件
  overlay.querySelector("#close-snapshot-btn")?.addEventListener("click", () => document.body.removeChild(overlay));
  overlay.querySelector("#dismiss-btn")?.addEventListener("click", () => document.body.removeChild(overlay));

  overlay.querySelector("#copy-summary-btn")?.addEventListener("click", () => {
    navigator.clipboard.writeText(summaryText).then(() => {
      playGentleChime(784, 0.2);
      alert("今日闭环战报已复制到剪贴板！可粘贴至备忘录或个人日记。");
    });
  });

  overlay.querySelector("#snapshot-rollover-btn")?.addEventListener("click", () => {
    store.rolloverYesterdayTasks();
    playGentleChime(880, 0.2);
    alert("已将未完成事项预排至明日！");
    document.body.removeChild(overlay);
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) document.body.removeChild(overlay);
  });

  return overlay;
}

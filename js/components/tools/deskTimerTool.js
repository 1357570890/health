// 45分钟工位久坐防瘫番茄钟与拉伸触发器
import { playGentleChime } from "../../core/utils.js";
import { DESK_RECOVERY_ROUTINE } from "../../data/exerciseData.js";

export function renderDeskTimerTool() {
  const container = document.createElement("div");
  container.className = "bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6";

  let defaultMinutes = 45;
  let remainingSeconds = defaultMinutes * 60;
  let timerId = null;
  let isRunning = false;

  container.innerHTML = `
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-4">
      <div>
        <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
          <span>⏳</span>
          <span>工位久坐微干预番茄钟</span>
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">连续坐立超过45分钟，脊柱受压与下肢静脉曲张风险倍增。到点主动提醒微拉伸。</p>
      </div>
      <div class="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-700/50 p-1 rounded-xl">
        <button data-mins="25" class="timer-mode-btn px-2.5 py-1 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-300">25分</button>
        <button data-mins="45" class="timer-mode-btn px-2.5 py-1 text-xs font-bold rounded-lg bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-300 shadow-sm">45分</button>
        <button data-mins="60" class="timer-mode-btn px-2.5 py-1 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-300">60分</button>
      </div>
    </div>

    <!-- 倒计时大表盘 -->
    <div class="flex flex-col items-center justify-center py-6">
      <div class="text-5xl sm:text-6xl font-black font-mono text-slate-800 dark:text-slate-100 tracking-wider mb-4" id="timer-display">
        45:00
      </div>

      <div class="flex items-center space-x-3">
        <button id="toggle-timer-btn" class="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all cursor-pointer">
          开始专注
        </button>
        <button id="reset-timer-btn" class="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-sm font-bold transition-all cursor-pointer">
          重置
        </button>
      </div>
    </div>

    <!-- 到点推荐的微动作推荐 -->
    <div class="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40">
      <div class="text-xs font-bold text-indigo-900 dark:text-indigo-300 mb-2 flex items-center space-x-1.5">
        <span>🧘 到点必练（耗时60秒）：</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
        <div class="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-950">
          <span class="font-bold text-indigo-700 dark:text-indigo-400">1. 下颌回缩10次</span>：挤出双下巴，放松后颈枕下肌群。
        </div>
        <div class="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-950">
          <span class="font-bold text-indigo-700 dark:text-indigo-400">2. 门框/椅背拉伸30秒</span>：扩张胸椎，把肩胛骨拉回中立位。
        </div>
      </div>
    </div>
  `;

  const display = container.querySelector("#timer-display");
  const toggleBtn = container.querySelector("#toggle-timer-btn");
  const resetBtn = container.querySelector("#reset-timer-btn");

  function updateDisplay() {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    display.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function start() {
    isRunning = true;
    toggleBtn.textContent = "暂停专注";
    toggleBtn.className = "px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer";
    timerId = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        updateDisplay();
      } else {
        stop();
        playGentleChime(880, 0.6);
        alert("⏰ 工位久坐时限已到！请立即推开键盘，站起身做1组颈椎下颌回缩与胸肌拉伸！");
      }
    }, 1000);
  }

  function stop() {
    isRunning = false;
    clearInterval(timerId);
    toggleBtn.textContent = "开始专注";
    toggleBtn.className = "px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all cursor-pointer";
  }

  toggleBtn.addEventListener("click", () => {
    if (isRunning) {
      stop();
    } else {
      start();
    }
  });

  resetBtn.addEventListener("click", () => {
    stop();
    remainingSeconds = defaultMinutes * 60;
    updateDisplay();
  });

  container.querySelectorAll(".timer-mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      stop();
      defaultMinutes = parseInt(btn.getAttribute("data-mins"), 10);
      remainingSeconds = defaultMinutes * 60;
      updateDisplay();

      container.querySelectorAll(".timer-mode-btn").forEach((b) => {
        b.className = "timer-mode-btn px-2.5 py-1 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer";
      });
      btn.className = "timer-mode-btn px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-600 text-white shadow-sm cursor-pointer";
    });
  });

  return container;
}

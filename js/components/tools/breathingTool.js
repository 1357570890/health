// 4-7-8 经典迷走神经调谐与副交感神经激活工具
import { BREATHING_CONFIG } from "../../data/mentalData.js";
import { playGentleChime } from "../../core/utils.js";

export function renderBreathingTool() {
  const container = document.createElement("div");
  container.className = "bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col items-center justify-center text-center";

  container.innerHTML = `
    <div class="absolute inset-0 bg-emerald-500/5 backdrop-blur-3xl pointer-events-none"></div>

    <div class="relative z-10 max-w-md w-full flex flex-col items-center">
      <span class="text-xs tracking-widest uppercase font-semibold text-emerald-400 mb-1">工位与睡前速效减压仪</span>
      <h3 class="text-lg sm:text-xl font-bold mb-1">${BREATHING_CONFIG.name}</h3>
      <p class="text-xs text-slate-400 mb-6">${BREATHING_CONFIG.desc}</p>

      <!-- 呼吸动态光晕圆环 -->
      <div class="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center my-4">
        <div id="breath-circle" class="w-28 h-28 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex flex-col items-center justify-center shadow-lg shadow-emerald-500/30 transition-all ease-linear text-white font-bold select-none">
          <span id="breath-status-text" class="text-sm font-semibold">准备开始</span>
          <span id="breath-countdown" class="text-3xl font-extrabold mt-0.5">-</span>
        </div>
      </div>

      <div id="breath-hint" class="text-xs text-emerald-300 font-medium mb-5 h-5">
        点击下方按钮，跟随视觉与节拍进行4轮深度交感神经阻断
      </div>

      <div class="flex items-center space-x-3">
        <button id="start-breath-btn" class="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md shadow-emerald-500/30 transition-all">
          开始呼吸训练
        </button>
        <button id="stop-breath-btn" class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-medium text-sm border border-slate-700 transition-all hidden">
          结束训练
        </button>
      </div>
    </div>
  `;

  let isRunning = false;
  let timerId = null;
  let cycle = 0;

  const circle = container.querySelector("#breath-circle");
  const statusText = container.querySelector("#breath-status-text");
  const countdownText = container.querySelector("#breath-countdown");
  const hintText = container.querySelector("#breath-hint");
  const startBtn = container.querySelector("#start-breath-btn");
  const stopBtn = container.querySelector("#stop-breath-btn");

  const phases = BREATHING_CONFIG.phases;

  function runPhase(phaseIndex) {
    if (!isRunning) return;
    const currentPhase = phases[phaseIndex];
    let remaining = currentPhase.duration;

    statusText.textContent = currentPhase.label.split(" ")[0];
    countdownText.textContent = remaining;
    hintText.textContent = currentPhase.tip;

    if (phaseIndex === 0) {
      playGentleChime(329.63, 0.2);
      circle.style.transitionDuration = `${currentPhase.duration}s`;
      circle.style.transform = "scale(1.7)";
      circle.style.background = "linear-gradient(135deg, #10b981, #06b6d4)";
    } else if (phaseIndex === 1) {
      playGentleChime(440, 0.15);
      circle.style.transitionDuration = "0.3s";
      circle.style.transform = "scale(1.7)";
      circle.style.background = "linear-gradient(135deg, #f59e0b, #d97706)";
    } else if (phaseIndex === 2) {
      playGentleChime(261.63, 0.25);
      circle.style.transitionDuration = `${currentPhase.duration}s`;
      circle.style.transform = "scale(1.0)";
      circle.style.background = "linear-gradient(135deg, #3b82f6, #6366f1)";
    }

    timerId = setInterval(() => {
      if (!isRunning) {
        clearInterval(timerId);
        return;
      }
      remaining--;
      if (remaining > 0) {
        countdownText.textContent = remaining;
      } else {
        clearInterval(timerId);
        const nextIndex = (phaseIndex + 1) % phases.length;
        if (nextIndex === 0) {
          cycle++;
          if (cycle >= BREATHING_CONFIG.recommendedCycles) {
            stopBreathing(true);
            return;
          }
        }
        runPhase(nextIndex);
      }
    }, 1000);
  }

  function startBreathing() {
    isRunning = true;
    cycle = 0;
    startBtn.classList.add("hidden");
    stopBtn.classList.remove("hidden");
    runPhase(0);
  }

  function stopBreathing(completed = false) {
    isRunning = false;
    if (timerId) clearInterval(timerId);
    startBtn.classList.remove("hidden");
    stopBtn.classList.add("hidden");
    circle.style.transitionDuration = "0.5s";
    circle.style.transform = "scale(1.0)";
    circle.style.background = "linear-gradient(135deg, #10b981, #14b8a6)";
    statusText.textContent = completed ? "训练完成" : "准备开始";
    countdownText.textContent = completed ? "✓" : "-";
    hintText.textContent = completed ? "已完成4轮呼吸，迷走神经深度激活。" : "已停止，随时可重新开始。";
  }

  startBtn.addEventListener("click", startBreathing);
  stopBtn.addEventListener("click", () => stopBreathing(false));

  return container;
}

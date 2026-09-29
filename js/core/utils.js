// 基础工具函数模块
export function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
}

export const getTodayString = getTodayKey;

export function getTodayDisplay() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const dayName = weekdays[now.getDay()];
  return `${year}年${month}月${date}日 ${dayName}`;
}

export function playGentleChime(frequency = 440, duration = 0.25) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // 忽略音频权限拦截异常
  }
}

export function safeJsonParse(str, fallback) {
  try {
    return JSON.parse(str) || fallback;
  } catch {
    return fallback;
  }
}

export function showToast(message, duration = 2500) {
  const existing = document.getElementById("global-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "global-toast";
  toast.className = "fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-slate-900/90 dark:bg-white/95 text-white dark:text-slate-900 text-xs sm:text-sm font-bold shadow-2xl backdrop-blur-md transition-all";
  toast.style.cssText = "position: fixed; z-index: 9999;";
  toast.textContent = message;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}


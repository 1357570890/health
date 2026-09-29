// 工位咖啡因代谢半衰期与夜间深睡眠阻断推导仪
import { showToast } from "../../core/utils.js";

export function renderCaffeineTool() {
  const container = document.createElement("div");
  container.className = "space-y-6";

  let drinkType = "black_coffee"; // 'black_coffee' | 'americano' | 'latte' | 'tea' | 'energy'
  let drinkHour = 13.5; // 13:30
  let doseMg = 60; // 默认一条冻干黑咖啡约60mg

  const drinkOptions = [
    { id: "black_coffee", name: "纯黑咖啡冻干条 (1条)", mg: 60, icon: "☕" },
    { id: "americano", name: "现磨美式大杯 (Americano)", mg: 150, icon: "🥤" },
    { id: "latte", name: "拿铁 / 燕麦拿铁大杯", mg: 75, icon: "🥛" },
    { id: "energy", name: "功能饮料 / 红牛 (1罐)", mg: 80, icon: "⚡" },
    { id: "tea", name: "清茶 / 乌龙茶 (300ml)", mg: 35, icon: "🍵" }
  ];

  function calculateMetabolism() {
    // 经典药代动力学：人体肝脏 CYP1A2 酶代谢半衰期通常为 5.5 小时
    const halfLife = 5.5;
    const bedtimeHour = 23.5; // 23:30 睡前

    // 绘制从喝下到睡前的每小时曲线
    const timeline = [];
    const hoursElapsedToBed = Math.max(0, bedtimeHour - drinkHour);
    const remainingAtBed = Math.round(doseMg * Math.pow(0.5, hoursElapsedToBed / halfLife));

    for (let h = Math.floor(drinkHour); h <= 24; h += 2) {
      const elapsed = Math.max(0, h - drinkHour);
      const rem = Math.round(doseMg * Math.pow(0.5, elapsed / halfLife));
      timeline.push({
        time: `${String(h).padStart(2, "0")}:00`,
        mg: rem,
        pct: Math.round((rem / doseMg) * 100)
      });
    }

    return { remainingAtBed, timeline, hoursElapsedToBed };
  }

  function render() {
    const res = calculateMetabolism();
    const isSafe = res.remainingAtBed <= 25;
    const isWarning = res.remainingAtBed > 25 && res.remainingAtBed <= 50;

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <!-- 头部 -->
        <div class="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-700/60 pb-4">
          <div class="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-xl shadow-md shadow-amber-600/20">
            ☕
          </div>
          <div>
            <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white">工位咖啡因代谢半衰期与睡眠阻断推导器</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">药代动力学推算 · 今晚 23:30 入睡时血液残留量 · 守护慢波深睡眠</p>
          </div>
        </div>

        <!-- 饮品与饮用时间选择 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label class="block font-bold text-slate-600 dark:text-slate-300 mb-1.5">摄入饮品类型与估计剂量</label>
            <div class="space-y-1.5">
              ${drinkOptions.map((item) => `
                <button data-drink-id="${item.id}" data-mg="${item.mg}" class="drink-select-btn w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                  drinkType === item.id
                    ? "bg-amber-50 dark:bg-amber-950/30 border-amber-400 dark:border-amber-700 text-amber-900 dark:text-amber-200 font-bold shadow-sm"
                    : "bg-white dark:bg-slate-750 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                }">
                  <span class="flex items-center space-x-2">
                    <span>${item.icon}</span>
                    <span>${item.name}</span>
                  </span>
                  <span class="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500">${item.mg} mg</span>
                </button>
              `).join("")}
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                摄入时间：<span class="text-amber-600 font-bold font-mono text-sm">${formatHour(drinkHour)}</span>
              </label>
              <input type="range" id="caffeine-hour-slider" min="8" max="20" step="0.5" value="${drinkHour}" class="w-full accent-amber-600 cursor-pointer" />
              <div class="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>08:00 (上午早晨)</span>
                <span class="text-rose-500 font-bold">15:00 咖啡因截止红线</span>
                <span>20:00 (傍晚)</span>
              </div>
            </div>

            <!-- 23:30入睡状态预估卡片 -->
            <div class="p-4 rounded-2xl border transition-all ${
              isSafe
                ? "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800"
                : isWarning
                ? "bg-amber-50/70 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800"
                : "bg-rose-50/70 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800"
            }">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold ${isSafe ? 'text-emerald-800 dark:text-emerald-300' : isWarning ? 'text-amber-800 dark:text-amber-300' : 'text-rose-800 dark:text-rose-300'}">
                  🌙 今晚 23:30 入睡时体内残留咖啡因
                </span>
                <span class="text-xs px-2 py-0.5 rounded-full font-bold ${isSafe ? 'bg-emerald-200 text-emerald-900' : isWarning ? 'bg-amber-200 text-amber-900' : 'bg-rose-200 text-rose-900'}">
                  ${isSafe ? "安全无阻断" : isWarning ? "轻度影响入睡" : "高危深睡压制"}
                </span>
              </div>
              <div class="flex items-baseline space-x-2 my-2">
                <span class="text-3xl font-black font-mono ${isSafe ? 'text-emerald-700 dark:text-emerald-400' : isWarning ? 'text-amber-700 dark:text-amber-400' : 'text-rose-700 dark:text-rose-400'}">
                  ${res.remainingAtBed}
                </span>
                <span class="text-xs font-bold text-slate-500">mg (约为初始剂量的 ${Math.round((res.remainingAtBed / doseMg) * 100)}%)</span>
              </div>
              <p class="text-[11px] leading-relaxed ${isSafe ? 'text-emerald-700 dark:text-emerald-400' : isWarning ? 'text-amber-700 dark:text-amber-400' : 'text-rose-700 dark:text-rose-400'}">
                ${isSafe
                  ? "✅ 咖啡因浓度已衰减至腺苷受体安全阈值以下，夜间慢波深睡眠与生长激素释放不受打扰。"
                  : isWarning
                  ? "⚠️ 血液中残存咖啡因仍会微弱阻断腺苷受体，可能推迟入睡15~20分钟，建议睡前温水浴+口服甘氨酸镁。"
                  : "🚨 残留浓度偏高！会显著削减后半夜关键的深睡眠与快速眼动期（REM），导致次日晨起头脑昏沉！"
                }
              </p>
            </div>
          </div>
        </div>

        <!-- 代谢衰减时序轴 -->
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200/80 dark:border-slate-700 space-y-2.5">
          <h4 class="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
            <span>⏱️ 咖啡因体内半衰期衰减进度（半衰期约 5.5 小时）</span>
            <span class="text-[10px] text-slate-400">初始摄入: ${doseMg}mg</span>
          </h4>
          <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
            ${res.timeline.map((item) => `
              <div class="p-2 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/60 dark:border-slate-700">
                <span class="text-[10px] text-slate-400 block font-mono">${item.time}</span>
                <span class="text-base font-black text-slate-800 dark:text-slate-100 font-mono block my-0.5">${item.mg} <span class="text-[10px] font-normal text-slate-400">mg</span></span>
                <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1 overflow-hidden mt-1">
                  <div class="bg-amber-500 h-full rounded-full" style="width: ${item.pct}%"></div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    // 绑定事件
    container.querySelectorAll(".drink-select-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        drinkType = btn.dataset.drinkId;
        doseMg = Number(btn.dataset.mg);
        render();
        showToast(`已选择：${btn.querySelector("span:nth-child(2)").textContent}`);
      });
    });

    const slider = container.querySelector("#caffeine-hour-slider");
    slider?.addEventListener("input", (e) => {
      drinkHour = Number(e.target.value);
      render();
    });
  }

  function formatHour(val) {
    const h = Math.floor(val);
    const m = (val % 1) === 0.5 ? "30" : "00";
    return `${String(h).padStart(2, "0")}:${m}`;
  }

  render();
  return container;
}

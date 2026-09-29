// 工位饮水分段记录与补剂服用追踪器
import { HYDRATION_SCHEDULE } from "../../data/routineData.js";
import { SUPPLEMENT_LIST } from "../../data/supplementData.js";
import { store } from "../../core/store.js";
import { playGentleChime } from "../../core/utils.js";

export function renderWaterTool() {
  const container = document.createElement("div");
  container.className = "space-y-6";

  const todayData = store.getTodayData();
  const currentWater = todayData.waterDrunk || 0;
  const targetWater = 2000;
  const percentage = Math.min(100, Math.round((currentWater / targetWater) * 100));

  container.innerHTML = `
    <!-- 饮水总体进度面板 -->
    <div class="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-sky-900/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm">工位水合平衡</span>
        <h3 class="text-xl sm:text-2xl font-black mt-2">今日饮水量：${currentWater} / ${targetWater}ml</h3>
        <p class="text-xs text-sky-100 mt-1">充足的水分可提升脑脊液循环与代谢废物排泄，显著降低久坐偏头痛概率。</p>
      </div>

      <div class="flex items-center space-x-3">
        <button id="quick-add-150" class="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-bold transition-all">+150ml (纸杯)</button>
        <button id="quick-add-250" class="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-bold transition-all">+250ml (水杯)</button>
        <button id="quick-add-500" class="px-4 py-2 rounded-xl bg-white text-blue-600 hover:bg-blue-50 font-black text-xs shadow-md transition-all">+500ml (保温杯)</button>
      </div>
    </div>

    <!-- 饮水时序分段打卡 -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
          <span>💧</span>
          <span>工位7大黄金饮水时刻（点击即打卡）</span>
        </h4>
        <span class="text-xs text-slate-400">达成率：${percentage}%</span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        ${HYDRATION_SCHEDULE.map((item) => {
          const checked = !!todayData.waterNodes?.[item.time];
          return `
            <div data-time="${item.time}" class="water-card p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              checked
                ? "bg-sky-50 dark:bg-sky-950/30 border-sky-400 dark:border-sky-700 text-sky-900 dark:text-sky-200"
                : "bg-slate-50 dark:bg-slate-750/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300"
            }">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs font-bold">${item.time}</span>
                  <span class="text-[10px] font-bold ${checked ? "text-sky-600" : "text-slate-400"}">${checked ? "✓" : "+"}</span>
                </div>
                <div class="text-xs font-semibold mb-1">${item.title}</div>
                <div class="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">${item.desc}</div>
              </div>
              <div class="mt-2 text-right">
                <span class="text-[11px] font-bold text-sky-600 dark:text-sky-400">${item.amount}ml</span>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <!-- 补剂服用打卡联动 -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
          <span>💊</span>
          <span>今日微量补剂打卡追踪</span>
        </h4>
        <span class="text-xs text-slate-400">点击卡片标记今日已服</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        ${SUPPLEMENT_LIST.map((s) => {
          const checked = !!todayData.supplements[s.id];
          return `
            <div data-supp="${s.id}" class="supp-toggle-card p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
              checked
                ? "bg-teal-50 dark:bg-teal-950/30 border-teal-300 dark:border-teal-700"
                : "bg-slate-50 dark:bg-slate-750/30 border-slate-200 dark:border-slate-700 hover:border-slate-300"
            }">
              <div>
                <div class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">${s.name}</div>
                <div class="text-[11px] text-teal-600 dark:text-teal-400 mt-0.5">${s.dosage.split("，")[0]}</div>
              </div>
              <div class="w-6 h-6 rounded-lg flex items-center justify-center border text-xs font-bold ${
                checked ? "bg-teal-600 text-white border-teal-600" : "border-slate-300 text-transparent"
              }">✓</div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;

  // 绑定事件
  container.querySelector("#quick-add-150")?.addEventListener("click", () => {
    store.addWater(150);
    playGentleChime(493.88, 0.15);
  });
  container.querySelector("#quick-add-250")?.addEventListener("click", () => {
    store.addWater(250);
    playGentleChime(523.25, 0.15);
  });
  container.querySelector("#quick-add-500")?.addEventListener("click", () => {
    store.addWater(500);
    playGentleChime(659.25, 0.2);
  });

  container.querySelectorAll(".water-card").forEach((card) => {
    card.addEventListener("click", () => {
      const time = card.getAttribute("data-time");
      store.toggleWaterNode(time);
      playGentleChime(523.25, 0.15);
    });
  });

  container.querySelectorAll(".supp-toggle-card").forEach((card) => {
    card.addEventListener("click", () => {
      const supp = card.getAttribute("data-supp");
      store.toggleSupplement(supp);
      playGentleChime(587.33, 0.15);
    });
  });

  return container;
}

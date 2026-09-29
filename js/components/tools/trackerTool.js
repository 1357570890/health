// 今日健康综合打卡与状态评估看板工具
import { store } from "../../core/store.js";
import { getTodayDisplay, playGentleChime } from "../../core/utils.js";
import { DESK_RECOVERY_ROUTINE } from "../../data/exerciseData.js";
import { SUPPLEMENT_LIST } from "../../data/supplementData.js";

export function renderTrackerTool() {
  const data = store.getTodayData();
  const score = store.calculateTodayScore();
  const streak = store.calculateStreak();
  const todayText = getTodayDisplay();

  const container = document.createElement("div");
  container.className = "space-y-6";

  const mealsList = [
    { id: "breakfast", label: "早餐 (7:30~8:30)", icon: "🍳" },
    { id: "morning_snack", label: "加餐 (10:00~10:30)", icon: "🥜" },
    { id: "lunch", label: "午餐 (11:30~12:30)", icon: "🍱" },
    { id: "dinner", label: "晚餐 (17:30~18:30)", icon: "🍠" }
  ];

  const waterProgress = Math.min(100, Math.round(((data.waterDrunk || 0) / 2000) * 100));

  container.innerHTML = `
    <!-- 今日总览指标 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="md:col-span-2 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-lg shadow-emerald-950/20 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-emerald-100 text-xs sm:text-sm mb-2">
            <span>📅 ${todayText}</span>
            <span class="bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs font-semibold">自律状态监测</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold mt-1">今日健康身心活力指数</h2>
          <p class="text-emerald-100 text-xs sm:text-sm mt-1">均衡摄入、时序饮水与碎片化拉伸，是维持高产出科研的生理底层支撑。</p>
        </div>
        <div class="mt-6 flex flex-wrap items-center gap-6">
          <div class="flex items-baseline space-x-1">
            <span class="text-4xl sm:text-5xl font-extrabold tracking-tight">${score}</span>
            <span class="text-emerald-200 text-sm font-semibold">/ 100分</span>
          </div>
          <div class="flex items-center space-x-2 bg-black/15 px-3 py-1.5 rounded-xl text-xs sm:text-sm">
            <span>🔥 连续打卡</span>
            <span class="font-bold text-amber-300">${streak}天</span>
          </div>
          <div class="text-xs text-emerald-200">
            ${score >= 80 ? "✨ 状态极佳！身体防御力满格" : score >= 50 ? "🌱 推进平稳，注意保持水分与活动" : "⚠️ 基础生活稍有欠缺，给身体充充电"}
          </div>
        </div>
      </div>

      <!-- 饮水速记卡片 -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center space-x-2">
            <span class="text-xl">💧</span>
            <h3 class="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">今日饮水速记</h3>
          </div>
          <span class="text-xs font-semibold text-sky-600 dark:text-sky-400">${data.waterDrunk || 0} / 2000ml</span>
        </div>
        <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden my-2">
          <div class="bg-sky-500 h-full rounded-full transition-all duration-300" style="width: ${waterProgress}%"></div>
        </div>
        <div class="flex items-center justify-between text-xs text-slate-400 mb-3">
          <span>进度: ${waterProgress}%</span>
          <span>目标: 2000ml</span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button id="add-water-250-btn" class="py-2 bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/40 dark:hover:bg-sky-900/50 text-sky-700 dark:text-sky-300 font-semibold text-xs rounded-xl transition-all text-center">
            + 250ml (1杯)
          </button>
          <button id="add-water-500-btn" class="py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs rounded-xl shadow-sm transition-all text-center">
            + 500ml (保温杯)
          </button>
        </div>
      </div>
    </div>

    <!-- 打卡矩阵 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 饮食打卡 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-2">
            <span class="text-xl">🥗</span>
            <h3 class="font-bold text-slate-800 dark:text-slate-100">今日健康饮食打卡</h3>
          </div>
          <span class="text-xs text-slate-400">点击即标记</span>
        </div>
        <div class="space-y-2.5">
          ${mealsList
            .map((item) => {
              const checked = !!data.meals[item.id];
              return `
                <div data-meal="${item.id}" class="tracker-meal-item flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  checked
                    ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/60"
                    : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300"
                }">
                  <div class="flex items-center space-x-3">
                    <span class="text-lg">${item.icon}</span>
                    <span class="text-xs sm:text-sm font-medium ${checked ? "text-emerald-900 dark:text-emerald-200 line-through opacity-80" : "text-slate-700 dark:text-slate-200"}">${item.label}</span>
                  </div>
                  <div class="w-6 h-6 rounded-lg flex items-center justify-center border text-xs font-bold ${
                    checked
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "border-slate-300 dark:border-slate-600 text-transparent"
                  }">✓</div>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>

      <!-- 久坐微拉伸与运动 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <span class="text-xl">🪑</span>
              <h3 class="font-bold text-slate-800 dark:text-slate-100">工位抗久坐微拉伸</h3>
            </div>
            <span class="text-xs text-slate-400">每45分钟一次</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${DESK_RECOVERY_ROUTINE.map((item) => {
              const checked = !!data.deskStretches[item.id];
              return `
                <div data-stretch="${item.id}" class="tracker-stretch-item p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  checked
                    ? "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-800/60 text-indigo-900 dark:text-indigo-200"
                    : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                }">
                  <span class="text-xs font-semibold truncate mr-2">${item.name}</span>
                  <div class="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center border text-xs font-bold ${
                    checked
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-slate-300 dark:border-slate-600 text-transparent"
                  }">✓</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/60">
          <div class="flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
            data.fitnessDone
              ? "bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/60"
              : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700"
          }" id="tracker-fitness-card">
            <div class="flex items-center space-x-3">
              <span class="text-xl">🏃</span>
              <div>
                <h4 class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">今日有氧/抗阻锻炼 (30分钟)</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400">慢跑、俯卧撑深蹲或快走散步</p>
              </div>
            </div>
            <div class="w-6 h-6 rounded-lg flex items-center justify-center border text-xs font-bold ${
              data.fitnessDone
                ? "bg-amber-500 text-white border-amber-500"
                : "border-slate-300 dark:border-slate-600 text-transparent"
            }">✓</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 补剂微量打卡 -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <span class="text-xl">💊</span>
          <h3 class="font-bold text-slate-800 dark:text-slate-100">基础核心补剂打卡</h3>
        </div>
        <span class="text-xs text-slate-400">抗炎、护眼与深睡眠</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
        ${SUPPLEMENT_LIST.map((item) => {
          const checked = !!data.supplements[item.id];
          return `
            <button data-supp="${item.id}" class="tracker-supp-btn p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
              checked
                ? "bg-teal-50 dark:bg-teal-950/30 border-teal-300 dark:border-teal-800/60 text-teal-800 dark:text-teal-200"
                : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300"
            }">
              <span class="text-base mb-1">${checked ? "✅" : "⚪"}</span>
              <span class="text-xs font-semibold line-clamp-1">${item.name.split("（")[0]}</span>
            </button>
          `;
        }).join("")}
      </div>
    </div>
  `;

  // 绑定事件
  container.querySelector("#add-water-250-btn")?.addEventListener("click", () => {
    store.addWater(250);
    playGentleChime(523.25, 0.15);
  });
  container.querySelector("#add-water-500-btn")?.addEventListener("click", () => {
    store.addWater(500);
    playGentleChime(659.25, 0.2);
  });

  container.querySelectorAll(".tracker-meal-item").forEach((el) => {
    el.addEventListener("click", () => {
      const meal = el.getAttribute("data-meal");
      store.toggleMeal(meal);
      playGentleChime(440, 0.1);
    });
  });

  container.querySelectorAll(".tracker-stretch-item").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.getAttribute("data-stretch");
      store.toggleDeskStretch(id);
      playGentleChime(493.88, 0.1);
    });
  });

  container.querySelector("#tracker-fitness-card")?.addEventListener("click", () => {
    store.toggleFitness();
    playGentleChime(587.33, 0.2);
  });

  container.querySelectorAll(".tracker-supp-btn").forEach((el) => {
    el.addEventListener("click", () => {
      const supp = el.getAttribute("data-supp");
      store.toggleSupplement(supp);
      playGentleChime(523.25, 0.1);
    });
  });

  return container;
}

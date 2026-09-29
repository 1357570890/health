// 健身力量、操场跑步与羽毛球爱好者专项体能方案组件
import { WEEKLY_FITNESS_PLAN, BADMINTON_PROTOCOL, RUNNING_PROTOCOL } from "../../data/exerciseData.js";

export function renderFitnessPlanView() {
  const dayIndex = new Date().getDay();
  const weekdayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const currentWeekday = weekdayNames[dayIndex];

  return `
    <div class="space-y-6">
      <!-- 头部课表总览 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <div class="flex items-center space-x-2">
            <span class="text-xl">🏆</span>
            <div>
              <h3 class="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                “力量 + 跑步 + 羽毛球”每周黄金统筹课表
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                2次抗阻健身（护肩固膝）+ 2次低心率跑（刷脂蓄能）+ 1~2次羽毛球（释放热爱）。
              </p>
            </div>
          </div>
          <span class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
            高亮标记为今日推荐
          </span>
        </div>

        <!-- 7天周期横向/栅格分布 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          ${WEEKLY_FITNESS_PLAN.map((item) => {
            const isToday = item.day === currentWeekday;
            return `
              <div class="p-3.5 rounded-2xl border flex flex-col justify-between transition-all ${
                isToday
                  ? "bg-amber-50/70 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 ring-2 ring-amber-400/40 shadow-sm"
                  : "bg-slate-50 dark:bg-slate-750/30 border-slate-200 dark:border-slate-700"
              }">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-xs sm:text-sm font-black ${isToday ? "text-amber-900 dark:text-amber-300" : "text-slate-800 dark:text-slate-100"}">${item.day}</span>
                    <span class="text-[10px] px-1.5 py-0.5 rounded font-extrabold ${
                      isToday
                        ? "bg-amber-400 text-amber-950"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }">${item.badge}</span>
                  </div>
                  <div class="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mb-1">${item.type}</div>
                  <div class="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 leading-snug">${item.theme.split("（")[0]}</div>
                  <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mb-2">${item.content}</p>
                </div>
                <div>
                  <div class="text-[10px] text-amber-800 dark:text-amber-300/90 bg-amber-100/50 dark:bg-amber-900/20 p-1.5 rounded-lg mb-2">
                    💡 ${item.tips}
                  </div>
                  <div class="text-[10px] text-slate-400 border-t border-slate-200/60 dark:border-slate-700/60 pt-1.5 flex justify-between">
                    <span>时长：</span>
                    <span class="font-bold text-slate-700 dark:text-slate-300">${item.duration}</span>
                  </div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <!-- 羽毛球爱好者专属护航指南 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div class="flex items-center space-x-2">
          <span class="text-xl">🏸</span>
          <h4 class="text-base font-bold text-slate-800 dark:text-slate-100">${BADMINTON_PROTOCOL.title}</h4>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- 热身流程 -->
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-750/40 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
              <span>🔥 进场必做7分钟动态热身（绝不冷启动扣杀）</span>
            </span>
            <div class="space-y-2">
              ${BADMINTON_PROTOCOL.warmup
                .map((w) => `
                <div class="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-xs">
                  <div class="flex justify-between font-bold text-slate-800 dark:text-slate-100 mb-0.5">
                    <span>${w.step}</span>
                    <span class="text-indigo-600 dark:text-indigo-400">${w.time}</span>
                  </div>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400">${w.desc}</p>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- 装备与冷身细节 -->
          <div class="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 flex flex-col justify-between space-y-3">
            <div>
              <span class="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center space-x-1 mb-2">
                <span>👟 装备与实操避坑铁律</span>
              </span>
              <ul class="text-xs text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
                ${BADMINTON_PROTOCOL.gearRules.map((g) => `<li>${g}</li>`).join("")}
              </ul>
            </div>
            <div class="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-900/50 text-[11px] text-slate-600 dark:text-slate-300">
              <span class="font-bold text-emerald-600 dark:text-emerald-400">打后冷身：</span>
              ${BADMINTON_PROTOCOL.cooldown}
            </div>
          </div>
        </div>
      </div>

      <!-- 科学跑步心法 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center space-x-2">
          <span>🏃</span>
          <span>${RUNNING_PROTOCOL.title}</span>
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300">
          ${RUNNING_PROTOCOL.principles.map((p, idx) => `
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-750/30 border border-slate-200/60 dark:border-slate-700">
              <div class="font-bold text-slate-800 dark:text-slate-100 mb-1">原则 ${idx + 1}</div>
              <p class="leading-relaxed">${p}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

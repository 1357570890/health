// 计划体系容器组件：承载各健康维度的规范、长期规划与避坑手册
import { PLANS_REGISTRY } from "../../data/registry.js";
import { DIET_PLAN } from "../../data/dietData.js";
import { SUPPLEMENT_LIST } from "../../data/supplementData.js";
import { DESK_RECOVERY_ROUTINE } from "../../data/exerciseData.js";
import { DAILY_ROUTINE_TIMELINE, SLEEP_HYGIENE_RULES } from "../../data/routineData.js";
import { MENTAL_RESILIENCE_KIT } from "../../data/mentalData.js";
import { renderFitnessPlanView } from "./fitnessPlanView.js";

export function renderPlanContainer(currentPlanId = "diet_plan", onSelectPlan) {
  const container = document.createElement("div");
  container.className = "space-y-6";

  const currentPlan = PLANS_REGISTRY.find((p) => p.id === currentPlanId) || PLANS_REGISTRY[0];

  container.innerHTML = `
    <!-- 头部：计划体系总览卡片 -->
    <div class="bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-800 rounded-3xl p-6 sm:p-7 text-white shadow-lg shadow-emerald-950/20">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm">
          📋 核心健康计划库（知识与行动规范）
        </span>
        <span class="text-xs text-emerald-100">专为在读研究生高压长久坐环境定制</span>
      </div>
      <h2 class="text-xl sm:text-2xl font-black tracking-tight mt-1">系统化健康方案与执行规程</h2>
      <p class="text-xs sm:text-sm text-emerald-100 mt-1.5 max-w-2xl leading-relaxed">
        健康不是零碎的应付，而是严密的科研工程。本板块汇集您生活各维度的确定性方案、1:1替换库与避坑红线，以规划为纲，照章执行。
      </p>

      <!-- 计划横向切换标签栏 -->
      <div class="mt-6 flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
        ${PLANS_REGISTRY.map((item) => {
          const isSelected = item.id === currentPlan.id;
          return `
            <button
              data-plan="${item.id}"
              class="plan-tab-btn flex-shrink-0 flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                isSelected
                  ? "bg-white text-emerald-800 shadow-md scale-105"
                  : "bg-black/20 text-white hover:bg-black/30"
              }"
            >
              <span>${item.icon}</span>
              <span>${item.title}</span>
            </button>
          `;
        }).join("")}
      </div>
    </div>

    <!-- 方案正文区 -->
    <div id="plan-detail-body" class="space-y-6">
      ${renderPlanBody(currentPlan.id)}
    </div>
  `;

  // 绑定点击切换计划
  container.querySelectorAll(".plan-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pid = btn.getAttribute("data-plan");
      onSelectPlan(pid);
    });
  });

  return container;
}

function renderPlanBody(planId) {
  switch (planId) {
    case "research_plan":
      return renderResearchPlanContent();
    case "diet_plan":
      return renderDietPlanContent();
    case "supplement_plan":
      return renderSupplementPlanContent();
    case "fitness_plan":
      return renderFitnessPlanView();
    case "posture_plan":
      return renderPosturePlanContent();
    case "circadian_plan":
      return renderCircadianPlanContent();
    case "mental_plan":
      return renderMentalPlanContent();
    default:
      return renderResearchPlanContent();
  }
}

// 0. 学术科研攻坚规划
function renderResearchPlanContent() {
  return `
    <div class="space-y-4">
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div class="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-700 pb-3">
          <span class="w-3 h-3 rounded-full bg-indigo-500"></span>
          <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">实验室工位坐班作息法则（类上班工作制）</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <span class="font-bold text-indigo-600 dark:text-indigo-400 block">⏰ 上午攻坚黄金期 (9:00~11:30)</span>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
              到工位后严禁刷手机或处理杂务，直奔当日最硬核任务：算法推导、核心代码攻坚或主力实验执行。
            </p>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <span class="font-bold text-indigo-600 dark:text-indigo-400 block">📊 下午琐碎与文献期 (14:00~17:30)</span>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
              午休唤醒后，开展低心智负荷任务：实验数据清洗制图、文献精读笔记、报账或组会材料起草。
            </p>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <span class="font-bold text-indigo-600 dark:text-indigo-400 block">🌙 晚间复盘与进阶期 (19:30~22:00)</span>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
              运动归来后，进行当日实验日志归档、代码版本提交（Git Commit）与明日高优先级任务排期。
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div class="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-700 pb-3">
          <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
          <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">组会汇报与导师协同规程</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-1">
            <span class="font-bold text-emerald-800 dark:text-emerald-300">✅ 汇报铁律：结论先行 + 备选方案</span>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
              先说进度结论与遇到卡点，严禁长篇流水账；遇到难题时必须携带2个预案供导师决策，而非抛出真空问题。
            </p>
          </div>
          <div class="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-1">
            <span class="font-bold text-emerald-800 dark:text-emerald-300">✅ 情绪隔离：事实对事，绝不对人</span>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
              导师情绪化批评时，启动“客观事实过滤网”，仅提取学术建议与修改要求，严禁内耗和当场辩解。
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 1. 饮食规划
function renderDietPlanContent() {
  return `
    <div class="space-y-4">
      ${DIET_PLAN.map((plan) => `
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3 mb-4">
            <div class="flex items-center space-x-2">
              <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
              <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">${plan.title}</h3>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
              时段：${plan.time}
            </span>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div class="space-y-2">
              <h4 class="text-xs font-bold text-slate-400">📋 标配方案：</h4>
              ${plan.standard.map((s) => `
                <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-750/50 border border-slate-200/70 dark:border-slate-700/60 text-xs">
                  <span class="font-semibold text-slate-700 dark:text-slate-200">${s.name}</span>
                  <div class="flex items-center space-x-2">
                    <span class="font-bold text-emerald-600 dark:text-emerald-400">${s.amount}</span>
                    <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">${s.tag}</span>
                  </div>
                </div>
              `).join("")}
              ${plan.gradTips ? `<div class="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-300">💡 研途实操技巧：${plan.gradTips}</div>` : ""}
            </div>

            <div class="space-y-2.5">
              <h4 class="text-xs font-bold text-slate-400">🔄 自由轮换备选库（1:1等量替换）：</h4>
              ${plan.replacements.map((r) => `
                <div class="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 text-xs">
                  <div class="font-bold text-amber-900 dark:text-amber-300 mb-1">平替目标：${r.target}</div>
                  ${r.options.map((o) => `
                    <div class="flex justify-between pl-2 border-l-2 border-amber-400 py-0.5">
                      <span class="text-slate-700 dark:text-slate-300 font-medium">${o.name} <span class="font-bold text-amber-700 dark:text-amber-400">(${o.amount})</span></span>
                      <span class="text-[10px] text-slate-400">${o.note}</span>
                    </div>
                  `).join("")}
                </div>
              `).join("")}

              <div class="p-2.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30 text-xs text-rose-900 dark:text-rose-300">
                <span class="font-bold">⚠️ 实操避坑：</span>
                <ul class="list-disc list-inside mt-1 space-y-0.5 text-[11px] sm:text-xs">
                  ${plan.pitfalls.map((p) => `<li>${p}</li>`).join("")}
                </ul>
              </div>
            </div>
          </div>
        </div>
      `).join("")}

      <!-- 食堂红黑榜 -->
      <div class="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">🏫 高校食堂点餐避坑红黑榜</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
            <span class="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">✅ 绿榜（放心打菜）：</span>
            <p class="text-slate-700 dark:text-slate-300 leading-relaxed">清炒西蓝花、水煮大白菜、清蒸鱼、去皮卤鸡腿、清汤冬瓜。备一小碗开水涮油可减少50%浮油。</p>
          </div>
          <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40">
            <span class="font-bold text-rose-800 dark:text-rose-300 block mb-1">❌ 黑榜（隐形热量炸弹）：</span>
            <p class="text-slate-700 dark:text-slate-300 leading-relaxed">地三鲜、干煸豆角、红烧茄子（吸油率40%）；炸鸡排、水煮肉片、浓芡酸辣土豆丝。</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 2. 补剂规划
function renderSupplementPlanContent() {
  return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      ${SUPPLEMENT_LIST.map((s) => `
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100">${s.name}</h4>
              <span class="text-[10px] px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 font-bold">科学补剂</span>
            </div>
            <div class="text-xs font-bold text-teal-600 dark:text-teal-400 mb-2">${s.necessity}</div>
            <div class="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">用法用量：${s.dosage}</div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">${s.reason}</p>
          </div>
          <div class="text-[11px] p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/30 text-amber-800 dark:text-amber-300">
            💡 实操细节：${s.tips}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// 4. 工位久坐规划
function renderPosturePlanContent() {
  return `
    <div class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${DESK_RECOVERY_ROUTINE.map((d) => `
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div>
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">${d.name}</h4>
              <div class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">🎯 靶向：${d.target}</div>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">${d.steps}</p>
            </div>
            <div class="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700">
              <span>⏱️ ${d.duration}</span>
              <span>📌 ${d.scenario}</span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// 5. 作息规划
function renderCircadianPlanContent() {
  return `
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
      <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100">🌙 研究生 24小时科研精力节奏轴</h4>
      <div class="space-y-2.5">
        ${DAILY_ROUTINE_TIMELINE.map((r) => `
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-750/30 border border-slate-200/60 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex items-center space-x-3">
              <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 w-24 flex-shrink-0">${r.time}</span>
              <div>
                <span class="text-xs font-bold text-slate-800 dark:text-slate-100 mr-2">${r.stage}</span>
                <span class="text-xs text-slate-600 dark:text-slate-300">${r.actions}</span>
              </div>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold self-start sm:self-center">${r.tag}</span>
          </div>
        `).join("")}
      </div>

      <div class="pt-3 border-t border-slate-200 dark:border-slate-700">
        <h5 class="text-xs font-bold text-slate-800 dark:text-slate-100 mb-2">😴 宿舍睡眠卫生守则：</h5>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
          ${SLEEP_HYGIENE_RULES.map((s) => `
            <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200/60 dark:border-slate-700">
              <span class="font-bold text-slate-800 dark:text-slate-100">▪ ${s.rule}：</span>
              <span>${s.detail}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

// 6. 心理韧性规划
function renderMentalPlanContent() {
  return `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      ${MENTAL_RESILIENCE_KIT.map((m) => `
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">${m.title}</h4>
            <div class="text-[11px] text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 p-2 rounded-lg border border-rose-200/50 dark:border-rose-900/30 mb-3">
              ⚡ 触发情境：${m.scenario}
            </div>
            <div class="space-y-1.5 mb-4">
              <span class="text-[11px] font-bold text-slate-400">执行阻断协议：</span>
              <ul class="list-disc list-inside text-xs text-slate-600 dark:text-slate-300 space-y-1">
                ${m.protocol.map((step) => `<li>${step}</li>`).join("")}
              </ul>
            </div>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-750/50 border border-slate-200/60 dark:border-slate-700 text-xs italic text-slate-700 dark:text-slate-300 text-center font-medium">
            “${m.mantra}”
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// 全域计划归类与总览中枢容器 (Master Planning Overview & Executive Cockpit)
import { renderOverviewCockpit } from "./overviewCockpit.js";
import { renderOverviewFocusCards } from "./overviewFocusCards.js";
import { renderOverviewTasksCard } from "./overviewTasksCard.js";
import { store } from "../../core/store.js";

export function renderOverviewContainer(onNavigate) {
  const container = document.createElement("div");
  container.className = "space-y-6 animate-in fade-in duration-150";

  function buildContent() {
    container.innerHTML = "";

    // 1. 顶部驾驶舱：个人状态、实时工位向导、极速打卡与核心导航
    const cockpit = renderOverviewCockpit(onNavigate);
    container.appendChild(cockpit);

    // 2. 核心规程快速查看卡片：今日控糖饮食与今日3+2体能/羽毛球直达卡片
    const focusCards = renderOverviewFocusCards(onNavigate);
    container.appendChild(focusCards);

    // 3. 核心任务汇总看板：本职工作与健康日常双轨打卡，支持主页极速新增待办与JSON素材导出
    const tasksCard = renderOverviewTasksCard(onNavigate);
    container.appendChild(tasksCard);

    // 4. 五大细分领域规划手册索引
    const domainsBlock = renderDomainsSection(onNavigate);
    container.appendChild(domainsBlock);
  }

  buildContent();
  return container;
}

function renderDomainsSection(onNavigate) {
  const wrapper = document.createElement("div");
  wrapper.className = "space-y-3.5 pt-2";

  wrapper.innerHTML = `
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-base font-bold text-slate-900 dark:text-white">
          生活与事业细分规程手册
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400">细分体系独立规划与知识沉淀，点击随时查阅与执行</p>
      </div>
      <button id="overview-go-all-plans" class="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium flex items-center space-x-1">
        <span>全部规程库</span>
        <span>➔</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
      <!-- 专区 1：深度工作与工位本职攻坚 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col justify-between space-y-3 shadow-xs">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-lg">💼</span>
            <span class="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
              事业攻坚
            </span>
          </div>
          <h4 class="text-xs font-bold text-slate-900 dark:text-white">工位深度专注与本职攻坚</h4>
          <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            上午黄金专注块、业务推进与关键汇报协同，事实与情绪解耦。
          </p>
        </div>
        <button data-plan="research_plan" class="domain-btn text-left text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-700/60">
          查看攻坚规程 ➔
        </button>
      </div>

      <!-- 专区 2：科学控糖与营养饮食 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col justify-between space-y-3 shadow-xs">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-lg">🥗</span>
            <span class="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              控糖基石
            </span>
          </div>
          <h4 class="text-xs font-bold text-slate-900 dark:text-white">控糖饮食体系与外卖方案</h4>
          <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            全黑麦与双全蛋、食堂1拳米饭+2份素菜、开自带高蛋白与咖啡因锁死。
          </p>
        </div>
        <button data-plan="diet_plan" class="domain-btn text-left text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-700/60">
          查看饮食方案 ➔
        </button>
      </div>

      <!-- 专区 3：3+2体能与羽毛球 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col justify-between space-y-3 shadow-xs">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-lg">🏸</span>
            <span class="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
              体能羽球
            </span>
          </div>
          <h4 class="text-xs font-bold text-slate-900 dark:text-white">3+2体能课表与羽球实战</h4>
          <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            周一三五力量抗阻护肩、周二四操场4公里慢跑、周六羽球90分钟对决。
          </p>
        </div>
        <button data-plan="fitness_plan" class="domain-btn text-left text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-700/60">
          查看体能方案 ➔
        </button>
      </div>

      <!-- 专区 4：工位久坐与精力作息 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col justify-between space-y-3 shadow-xs">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-lg">🌙</span>
            <span class="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              精力节律
            </span>
          </div>
          <h4 class="text-xs font-bold text-slate-900 dark:text-white">久坐微拉伸与90分钟睡眠</h4>
          <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            45分钟下颌回缩+微伸展、2000ml分段补水、23:30熄灯与4-7-8呼吸。
          </p>
        </div>
        <button data-plan="circadian_plan" class="domain-btn text-left text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-700/60">
          查看作息规程 ➔
        </button>
      </div>
    </div>
  `;

  wrapper.querySelector("#overview-go-all-plans")?.addEventListener("click", () => {
    onNavigate("plans");
  });

  wrapper.querySelectorAll(".domain-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pid = btn.getAttribute("data-plan");
      onNavigate("plans", pid);
    });
  });

  return wrapper;
}

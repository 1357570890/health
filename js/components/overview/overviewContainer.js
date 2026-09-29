// 一屏流极简工位主看板容器 (Single-Screen Minimal Executive Cockpit)
import { renderOverviewCockpit } from "./overviewCockpit.js";
import { renderOverviewDietCard } from "./overviewDietCard.js";
import { renderOverviewMemoCard } from "./overviewMemoCard.js";
import { renderOverviewFooterBar } from "./overviewFooterBar.js";

export function renderOverviewContainer(onNavigate) {
  const container = document.createElement("div");
  // 极简一屏流响应式容器：间距紧凑，电脑与手机均可一屏完整呈现
  container.className = "space-y-3 sm:space-y-3.5 animate-in fade-in duration-150 max-w-6xl mx-auto";

  // 1. 顶部极简状态栏：今日日期、模式与今日闭环进度
  const cockpit = renderOverviewCockpit();
  container.appendChild(cockpit);

  // 2. 核心双栏并排 (手机端单列紧凑排列)：
  // 左侧：系统预置科学控糖饮食规划与打卡 (带修改与详情直达)
  // 右侧：纯净个人备忘与科研待办记事本 (全由用户自由输入，系统不预设任何虚假任务)
  const mainGrid = document.createElement("div");
  mainGrid.className = "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 items-stretch";

  const dietCard = renderOverviewDietCard(onNavigate);
  const memoCard = renderOverviewMemoCard();

  mainGrid.appendChild(dietCard);
  mainGrid.appendChild(memoCard);
  container.appendChild(mainGrid);

  // 3. 底部状态胶囊条：今日体能安排快速入口、常吃食材库存提示与一键数据备份
  const footerBar = renderOverviewFooterBar(onNavigate);
  container.appendChild(footerBar);

  return container;
}

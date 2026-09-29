// 全域计划归类与总览中枢容器 (Master Planning Overview & Executive Cockpit)
import { renderOverviewCockpit } from "./overviewCockpit.js";
import { renderOverviewTasksCard } from "./overviewTasksCard.js";
import { renderOverviewFocusCards } from "./overviewFocusCards.js";

export function renderOverviewContainer(onNavigate) {
  const container = document.createElement("div");
  container.className = "space-y-4 sm:space-y-5 animate-in fade-in duration-150";

  // 1. 顶部极简驾驶舱：今日日期、整体完成度与任务规划入口
  const cockpit = renderOverviewCockpit(onNavigate);
  container.appendChild(cockpit);

  // 2. 核心任务看板：今日事项查看与完成遵守标记 (主页核心聚焦区)
  const tasksCard = renderOverviewTasksCard(onNavigate);
  container.appendChild(tasksCard);

  // 3. 今日核心规程速览：今日控糖饮食与今日3+2体能/羽毛球规程卡片 (按需跳转深度细节)
  const focusCards = renderOverviewFocusCards(onNavigate);
  container.appendChild(focusCards);

  return container;
}

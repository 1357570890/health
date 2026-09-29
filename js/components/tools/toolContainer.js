// 工具箱顶层容器：聚合各类交互式打卡、换算、计时与同步工具
import { TOOLS_REGISTRY } from "../../data/registry.js";
import { renderTrackerTool } from "./trackerTool.js";
import { renderFoodSubTool } from "./foodSubTool.js";
import { renderWaterTool } from "./waterTool.js";
import { renderDeskTimerTool } from "./deskTimerTool.js";
import { renderBreathingTool } from "./breathingTool.js";
import { renderBackupTool } from "./backupTool.js";

export function renderToolContainer(currentToolId = "tracker_tool", onSelectTool) {
  const container = document.createElement("div");
  container.className = "space-y-6";

  const currentTool = TOOLS_REGISTRY.find((t) => t.id === currentToolId) || TOOLS_REGISTRY[0];

  container.innerHTML = `
    <!-- 头部工具箱导航条 -->
    <div class="bg-gradient-to-r from-sky-600 via-indigo-700 to-slate-800 rounded-3xl p-6 sm:p-7 text-white shadow-lg shadow-sky-950/20">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm">
          🧰 辅助执行工具箱（交互与落地辅助）
        </span>
        <span class="text-xs text-sky-100">为计划高效落地赋能</span>
      </div>
      <h2 class="text-xl sm:text-2xl font-black tracking-tight mt-1">日常生活辅助工具与打卡矩阵</h2>
      <p class="text-xs sm:text-sm text-sky-100 mt-1.5 max-w-2xl leading-relaxed">
        工具服务于计划。在这里记录每日饮水、执行微拉伸番茄钟、换算1:1食材或进行4-7-8呼吸放松，让自律变得轻松可视化。
      </p>

      <!-- 工具切换标签栏 -->
      <div class="mt-6 flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
        ${TOOLS_REGISTRY.map((t) => {
          const isSelected = t.id === currentTool.id;
          return `
            <button
              data-tool="${t.id}"
              class="tool-tab-btn flex-shrink-0 flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                isSelected
                  ? "bg-white text-slate-900 shadow-md scale-105"
                  : "bg-black/20 text-white hover:bg-black/30"
              }"
            >
              <span>${t.icon}</span>
              <span>${t.title}</span>
            </button>
          `;
        }).join("")}
      </div>
    </div>

    <!-- 具体工具渲染区 -->
    <div id="tool-render-body"></div>
  `;

  // 渲染选中的子工具
  const toolRenderBody = container.querySelector("#tool-render-body");
  if (toolRenderBody) {
    switch (currentTool.id) {
      case "tracker_tool":
        toolRenderBody.appendChild(renderTrackerTool());
        break;
      case "substitute_tool":
        toolRenderBody.appendChild(renderFoodSubTool());
        break;
      case "water_tool":
        toolRenderBody.appendChild(renderWaterTool());
        break;
      case "desk_timer_tool":
        toolRenderBody.appendChild(renderDeskTimerTool());
        break;
      case "breathing_tool":
        toolRenderBody.appendChild(renderBreathingTool());
        break;
      case "backup_tool":
        toolRenderBody.appendChild(renderBackupTool());
        break;
      default:
        toolRenderBody.appendChild(renderTrackerTool());
    }
  }

  // 绑定切换事件
  container.querySelectorAll(".tool-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tid = btn.getAttribute("data-tool");
      onSelectTool(tid);
    });
  });

  return container;
}

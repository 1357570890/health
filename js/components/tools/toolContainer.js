// 工具箱顶层容器：工具陈列架与交互式工具挂载中枢
import { TOOLS_REGISTRY } from "../../data/registry.js";
import { renderBadmintonTool } from "./badmintonTool.js";
import { renderMacroTdeeTool } from "./macroTdeeTool.js";
import { renderCaffeineTool } from "./caffeineTool.js";
import { renderFoodSubTool } from "./foodSubTool.js";
import { renderWaterTool } from "./waterTool.js";
import { renderDeskTimerTool } from "./deskTimerTool.js";
import { renderBreathingTool } from "./breathingTool.js";
import { renderBackupTool } from "./backupTool.js";

export function renderToolContainer(currentToolId = "gallery", onSelectTool) {
  const container = document.createElement("div");
  container.className = "space-y-5 animate-in fade-in duration-150";

  // 如果没有指定具体子工具，或者指定为 gallery / all，展示工具矩阵架
  const isGalleryView = !currentToolId || currentToolId === "gallery" || currentToolId === "tracker_tool";
  const activeTool = TOOLS_REGISTRY.find((t) => t.id === currentToolId);

  if (isGalleryView || !activeTool) {
    // 1. 工具矩阵陈列架模式 (清晰展示所有8大工具，卡片一目了然)
    container.innerHTML = `
      <!-- 头部介绍条 -->
      <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 sm:p-6 text-white border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center space-x-2 text-xs text-indigo-300 font-mono mb-1">
            <span>🧰 PRACTICAL TOOLBOX</span>
            <span>·</span>
            <span>高频实用工具库</span>
          </div>
          <h2 class="text-lg sm:text-xl font-bold tracking-tight">日常生活与科研体能辅助工具箱</h2>
          <p class="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            专为工位久坐用脑、羽毛球对抗、控糖热量核算与夜间深度睡眠打造的即开即用交互算盘。
          </p>
        </div>
        <div class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white shrink-0 self-start sm:self-auto">
          共收录 8 款专属工具
        </div>
      </div>

      <!-- 8大工具响应式卡片陈列网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        ${TOOLS_REGISTRY.filter((t) => t.id !== "tracker_tool").map((t) => `
          <div data-tool-card="${t.id}" class="tool-card group bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-2xl">${t.icon}</span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                  ${t.badge}
                </span>
              </div>
              <h3 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                ${t.title}
              </h3>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                ${t.summary}
              </p>
            </div>
            <button class="w-full mt-2 py-1.5 px-3 rounded-xl bg-slate-50 group-hover:bg-indigo-600 text-slate-700 group-hover:text-white dark:bg-slate-750 dark:text-slate-200 dark:group-hover:bg-indigo-600 font-bold text-xs transition-all flex items-center justify-center space-x-1">
              <span>打开工具</span>
              <span>➔</span>
            </button>
          </div>
        `).join("")}
      </div>
    `;

    container.querySelectorAll(".tool-card").forEach((card) => {
      card.addEventListener("click", () => {
        const tid = card.getAttribute("data-tool-card");
        onSelectTool(tid);
      });
    });

    return container;
  }

  // 2. 具体子工具运行界面 (带顶部极简返回栏与快速切换药丸条)
  container.innerHTML = `
    <!-- 工具操作顶部导航 -->
    <div class="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-800 p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-xs">
      <div class="flex items-center space-x-2">
        <button id="back-to-gallery-btn" class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-650 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center space-x-1">
          <span>← 工具列表</span>
        </button>
        <span class="text-slate-300 dark:text-slate-600">|</span>
        <div class="flex items-center space-x-1.5">
          <span class="text-lg">${activeTool.icon}</span>
          <span class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">${activeTool.title}</span>
        </div>
      </div>

      <!-- 快速横向切换条 -->
      <div class="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
        ${TOOLS_REGISTRY.filter((t) => t.id !== "tracker_tool").map((t) => `
          <button data-switch-tool="${t.id}" class="px-2 py-1 rounded-lg text-xs font-medium transition-all ${
            t.id === activeTool.id
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750"
          }">
            ${t.icon} ${t.title.split("与")[0].split("与")[0].slice(0, 4)}
          </button>
        `).join("")}
      </div>
    </div>

    <!-- 工具核心操作渲染容器 -->
    <div id="tool-active-canvas"></div>
  `;

  const canvas = container.querySelector("#tool-active-canvas");
  if (canvas) {
    switch (activeTool.id) {
      case "badminton_tool":
        canvas.appendChild(renderBadmintonTool());
        break;
      case "macro_tool":
        canvas.appendChild(renderMacroTdeeTool());
        break;
      case "caffeine_tool":
        canvas.appendChild(renderCaffeineTool());
        break;
      case "substitute_tool":
        canvas.appendChild(renderFoodSubTool());
        break;
      case "water_tool":
        canvas.appendChild(renderWaterTool());
        break;
      case "desk_timer_tool":
        canvas.appendChild(renderDeskTimerTool());
        break;
      case "breathing_tool":
        canvas.appendChild(renderBreathingTool());
        break;
      case "backup_tool":
        canvas.appendChild(renderBackupTool());
        break;
      default:
        canvas.appendChild(renderBadmintonTool());
    }
  }

  container.querySelector("#back-to-gallery-btn")?.addEventListener("click", () => {
    onSelectTool("gallery");
  });

  container.querySelectorAll("[data-switch-tool]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tid = btn.getAttribute("data-switch-tool");
      onSelectTool(tid);
    });
  });

  return container;
}

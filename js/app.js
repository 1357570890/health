// 研途生活健康主控制器：四维联动（今日工作台、全景大课表、长期规程库、辅助工具箱）
import { renderNavBar } from "./components/navBar.js";
import { renderDailyContainer } from "./components/daily/dailyContainer.js";
import { renderTimetableContainer } from "./components/timetable/timetableContainer.js";
import { renderPlanContainer } from "./components/plans/planContainer.js";
import { renderToolContainer } from "./components/tools/toolContainer.js";
import { store } from "./core/store.js";
import { syncService } from "./core/syncService.js";
import { playGentleChime } from "./core/utils.js";

class App {
  constructor() {
    // 默认展示今日全天行动工作台，直达每日执行闭环
    this.activeMode = "daily"; // 'daily' | 'timetable' | 'plans' | 'tools'
    this.activePlanId = "diet_plan";
    this.activeToolId = "tracker_tool";

    this.appRoot = document.getElementById("app");
    this.initTheme();
    this.checkUrlSync();
    this.render();

    // 订阅数据变动
    store.subscribe("stateChanged", () => {
      this.renderMainContent();
    });
  }

  async checkUrlSync() {
    try {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#sync=")) {
        const rawCode = decodeURIComponent(hash.substring(6));
        const decoded = JSON.parse(atob(rawCode));
        if (decoded.token && decoded.gistId) {
          syncService.saveConfig({ token: decoded.token, gistId: decoded.gistId });
          // 清除 URL hash 防止留在浏览器历史记录
          history.replaceState(null, "", window.location.pathname + window.location.search);
          await syncService.pullFromCloud();
          this.render(); // 重新渲染导航栏展示已同步状态
          playGentleChime(659.25, 0.2);
        }
      }
    } catch (e) {
      console.warn("URL sync config parse error:", e);
    }
  }

  initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  navigate(mode, subId) {
    this.activeMode = mode;
    if (mode === "plans" && subId) {
      this.activePlanId = subId;
    } else if (mode === "tools" && subId) {
      this.activeToolId = subId;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.render();
  }

  renderMainContent() {
    const contentArea = document.getElementById("main-content-area");
    if (!contentArea) return;
    contentArea.innerHTML = "";

    switch (this.activeMode) {
      case "daily":
        contentArea.appendChild(renderDailyContainer());
        break;
      case "timetable":
        contentArea.appendChild(renderTimetableContainer());
        break;
      case "plans":
        contentArea.appendChild(
          renderPlanContainer(this.activePlanId, (planId) => {
            this.activePlanId = planId;
            this.renderMainContent();
          })
        );
        break;
      case "tools":
        contentArea.appendChild(
          renderToolContainer(this.activeToolId, (toolId) => {
            this.activeToolId = toolId;
            this.renderMainContent();
          })
        );
        break;
      default:
        contentArea.appendChild(renderDailyContainer());
    }
  }

  render() {
    if (!this.appRoot) return;
    this.appRoot.innerHTML = "";

    // 1. 顶部全局导航
    const currentSubId = this.activeMode === "plans" ? this.activePlanId : this.activeToolId;
    const navBar = renderNavBar(this.activeMode, currentSubId, (mode, subId) => {
      this.navigate(mode, subId);
    });
    this.appRoot.appendChild(navBar);

    // 2. 主内容区域 (加大至 max-w-7xl)
    const mainWrap = document.createElement("main");
    mainWrap.className = "max-w-7xl mx-auto px-3 sm:px-6 py-6 pb-20";
    mainWrap.id = "main-content-area";
    this.appRoot.appendChild(mainWrap);

    // 3. 渲染主业务容器
    this.renderMainContent();
  }
}

// 页面就绪后自适应启动
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => new App());
} else {
  new App();
}

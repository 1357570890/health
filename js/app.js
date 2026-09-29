import { renderNavBar } from "./components/navBar.js";
import { renderOverviewContainer } from "./components/overview/overviewContainer.js?v=3";
import { renderDailyContainer } from "./components/daily/dailyContainer.js";
import { renderTimetableContainer } from "./components/timetable/timetableContainer.js";
import { renderPlanContainer } from "./components/plans/planContainer.js";
import { renderToolContainer } from "./components/tools/toolContainer.js";
import { renderInventoryModal } from "./components/inventory/inventoryModal.js";
import { store } from "./core/store.js";
import { syncService } from "./core/syncService.js";
import { router } from "./core/router.js";
import { playGentleChime } from "./core/utils.js";

class App {
  constructor() {
    // 依据当前 URL 语义推导初始激活的模式与子工具
    const initialRoute = router.getCurrentRoute();
    this.activeMode = initialRoute.mode || "overview";
    this.activePlanId = (initialRoute.mode === "plans" && initialRoute.subId) ? initialRoute.subId : "diet_plan";
    this.activeToolId = (initialRoute.mode === "tools" && initialRoute.subId) ? initialRoute.subId : "tracker_tool";

    this.appRoot = document.getElementById("app");
    this.initTheme();
    this.checkUrlSync();
    this.render();

    // 如果是通过 /pantry 访问，初始化渲染后自动弹出食材储备库
    if (initialRoute.isPantry) {
      setTimeout(() => renderInventoryModal(), 200);
    }

    // 订阅数据变动
    store.subscribe("stateChanged", () => {
      this.renderMainContent();
    });

    // 订阅浏览器前进后退事件
    router.subscribe((route) => {
      this.activeMode = route.mode || "overview";
      if (route.subId) {
        if (route.mode === "plans") this.activePlanId = route.subId;
        if (route.mode === "tools") this.activeToolId = route.subId;
      }
      this.render();
      if (route.isPantry) {
        setTimeout(() => renderInventoryModal(), 150);
      }
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

  navigate(mode, subId, skipPush = false) {
    this.activeMode = mode;
    if (mode === "plans" && subId) {
      this.activePlanId = subId;
    } else if (mode === "tools" && subId) {
      this.activeToolId = subId;
    }
    if (!skipPush) {
      const activeSub = mode === "plans" ? this.activePlanId : (mode === "tools" ? this.activeToolId : null);
      router.push(mode, activeSub);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.render();
  }

  renderMainContent() {
    const contentArea = document.getElementById("main-content-area");
    if (!contentArea) return;
    contentArea.innerHTML = "";

    switch (this.activeMode) {
      case "overview":
        contentArea.appendChild(renderOverviewContainer((mode, subId) => this.navigate(mode, subId)));
        break;
      case "daily":
        contentArea.appendChild(renderDailyContainer());
        break;
      case "timetable":
        contentArea.appendChild(renderTimetableContainer());
        break;
      case "plans":
        contentArea.appendChild(
          renderPlanContainer(this.activePlanId, (planId) => {
            this.navigate("plans", planId);
          })
        );
        break;
      case "tools":
        contentArea.appendChild(
          renderToolContainer(this.activeToolId, (toolId) => {
            this.navigate("tools", toolId);
          })
        );
        break;
      default:
        contentArea.appendChild(renderOverviewContainer((mode, subId) => this.navigate(mode, subId)));
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

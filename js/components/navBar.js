// 响应式导航栏组件：电脑端顶部导航 + 手机端专属底部Dock导航 + 跨端云同步状态按钮
import { syncService } from "../core/syncService.js";
import { renderSyncModal } from "./sync/syncModal.js";

export function renderNavBar(activeMode, activeSubId, onNavigate) {
  const container = document.createElement("div");

  const navModes = [
    { id: "overview", label: "总览中枢", shortLabel: "总览", icon: "🧭" },
    { id: "daily", label: "今日行动", shortLabel: "今日", icon: "⚡" },
    { id: "timetable", label: "日程大课表", shortLabel: "课表", icon: "🎓" },
    { id: "plans", label: "全域计划库", shortLabel: "计划", icon: "📋" },
    { id: "tools", label: "辅助工具箱", shortLabel: "工具", icon: "🧰" }
  ];

  function getSyncBadgeHtml() {
    const info = syncService.getStatus();
    if (!info.isConfigured) {
      return `
        <button id="nav-sync-btn" title="点击配置手机与电脑跨端云同步" class="flex items-center space-x-1 px-2.5 py-1 rounded-xl text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-all">
          <span>☁️</span>
          <span class="hidden sm:inline">未联云</span>
        </button>
      `;
    }
    if (info.status === "syncing") {
      return `
        <button id="nav-sync-btn" title="正在与云端双向同步..." class="flex items-center space-x-1 px-2.5 py-1 rounded-xl text-[11px] font-bold bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 border border-sky-300 dark:border-sky-800 transition-all">
          <span class="animate-spin">🔄</span>
          <span class="hidden sm:inline">同步中</span>
        </button>
      `;
    }
    return `
      <button id="nav-sync-btn" title="跨端实时同步就绪 (上次同步: ${info.lastSyncTime || "刚刚"})" class="flex items-center space-x-1 px-2.5 py-1 rounded-xl text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 transition-all">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="hidden sm:inline">已同步</span>
      </button>
    `;
  }

  container.innerHTML = `
    <!-- 1. 桌面端顶部导航栏 (移动端简化) -->
    <header class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm">
      <div class="max-w-7xl mx-auto px-3 sm:px-6">
        <div class="py-2.5 sm:py-3 flex items-center justify-between gap-2">
          <!-- 品牌标识 -->
          <div class="flex items-center space-x-2.5 cursor-pointer" id="brand-logo">
            <span class="text-xl sm:text-2xl select-none">🧭</span>
            <div>
              <h1 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">研途全域规划中枢</h1>
              <p class="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">研究生科研与生活自律综合中枢</p>
            </div>
          </div>

          <!-- 桌面端横向切换栏 (仅在sm及以上屏幕显示) -->
          <div class="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            ${navModes
              .map((item) => {
                const isActive = activeMode === item.id;
                return `
                  <button
                    data-mode="${item.id}"
                    class="desktop-nav-btn flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }"
                  >
                    <span>${item.icon}</span>
                    <span>${item.label}</span>
                  </button>
                `;
              })
              .join("")}
          </div>

          <!-- 右侧控件：跨端云同步状态 + 主题切换 -->
          <div class="flex items-center space-x-1.5 sm:space-x-2">
            <div id="sync-badge-container">${getSyncBadgeHtml()}</div>

            <button
              id="theme-toggle"
              title="切换明暗色彩主题"
              class="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            >
              <span class="dark:hidden">🌙</span>
              <span class="hidden dark:inline">☀️</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 2. 手机端专属底部Dock导航栏 -->
    <nav class="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 shadow-lg px-2 py-1.5 flex items-center justify-around">
      ${navModes
        .map((item) => {
          const isActive = activeMode === item.id;
          return `
            <button
              data-mode="${item.id}"
              class="mobile-dock-btn flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? "text-emerald-600 dark:text-emerald-400 font-bold scale-105"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
              }"
            >
              <span class="text-lg leading-none mb-1">${item.icon}</span>
              <span class="text-[10px] leading-tight">${item.shortLabel}</span>
            </button>
          `;
        })
        .join("")}
    </nav>
  `;

  // 绑定事件
  const handleNav = (mode) => onNavigate(mode);

  container.querySelectorAll(".desktop-nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => handleNav(btn.getAttribute("data-mode")));
  });

  container.querySelectorAll(".mobile-dock-btn").forEach((btn) => {
    btn.addEventListener("click", () => handleNav(btn.getAttribute("data-mode")));
  });

  container.querySelector("#brand-logo")?.addEventListener("click", () => handleNav("overview"));

  // 打开云同步弹窗
  const attachSyncClick = () => {
    container.querySelector("#nav-sync-btn")?.addEventListener("click", () => {
      const modal = renderSyncModal();
      document.body.appendChild(modal);
    });
  };
  attachSyncClick();

  // 监听云同步状态变动更新右上角徽章
  syncService.subscribe(() => {
    const badgeMount = container.querySelector("#sync-badge-container");
    if (badgeMount) {
      badgeMount.innerHTML = getSyncBadgeHtml();
      attachSyncClick();
    }
  });

  const themeToggle = container.querySelector("#theme-toggle");
  themeToggle?.addEventListener("click", () => {
    const htmlElem = document.documentElement;
    if (htmlElem.classList.contains("dark")) {
      htmlElem.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      htmlElem.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  });

  return container;
}

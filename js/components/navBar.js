// 响应式导航栏组件：电脑端顶部导航 + 手机端专属底部Dock导航 + 跨端云同步状态按钮
import { syncService } from "../core/syncService.js";
import { renderSyncModal } from "./sync/syncModal.js";
import { renderProfileModal } from "./profile/profileModal.js";

export function renderNavBar(activeMode, activeSubId, onNavigate) {
  const container = document.createElement("div");

  const navModes = [
    { id: "overview", label: "总览", shortLabel: "总览" },
    { id: "daily", label: "今日执行", shortLabel: "执行" },
    { id: "timetable", label: "日程课表", shortLabel: "课表" },
    { id: "plans", label: "规程手册", shortLabel: "手册" },
    { id: "tools", label: "工具箱", shortLabel: "工具" }
  ];

  function getSyncBadgeHtml() {
    const info = syncService.getStatus();
    if (!info.isConfigured) {
      return `
        <button id="nav-sync-btn" title="点击配置手机与电脑跨端云同步" class="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-all">
          <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          <span>未联云</span>
        </button>
      `;
    }
    if (info.status === "syncing") {
      return `
        <button id="nav-sync-btn" title="正在与云端双向同步..." class="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 border border-sky-300 dark:border-sky-800 transition-all">
          <span class="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
          <span>同步中</span>
        </button>
      `;
    }
    return `
      <button id="nav-sync-btn" title="跨端实时同步就绪 (上次同步: ${info.lastSyncTime || "刚刚"})" class="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 transition-all">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        <span>已同步</span>
      </button>
    `;
  }

  container.innerHTML = `
    <!-- 1. 桌面端顶部导航栏 (移动端简化) -->
    <header class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-sm">
      <div class="max-w-7xl mx-auto px-3 sm:px-6">
        <div class="py-2.5 flex items-center justify-between gap-3">
          <!-- 品牌标识 -->
          <div class="flex items-center space-x-2.5 cursor-pointer" id="brand-logo">
            <div class="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs tracking-wider shadow-sm">
              GP
            </div>
            <div>
              <div class="flex items-center space-x-1.5">
                <h1 class="text-sm font-bold text-slate-900 dark:text-white leading-tight">GradPlan</h1>
                <span class="text-[10px] px-1.5 py-0.2 rounded font-medium bg-slate-100 dark:bg-slate-800 text-slate-500">研途规划</span>
              </div>
              <p class="text-[10px] text-slate-400 dark:text-slate-500">研究生全域计划与自律中枢</p>
            </div>
          </div>

          <!-- 桌面端横向切换栏 -->
          <div class="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            ${navModes
              .map((item) => {
                const isActive = activeMode === item.id;
                return `
                  <button
                    data-mode="${item.id}"
                    class="desktop-nav-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }"
                  >
                    <span>${item.label}</span>
                  </button>
                `;
              })
              .join("")}
          </div>

          <!-- 右侧控件：工位偏好设置 + 跨端云同步状态 + 主题切换 -->
          <div class="flex items-center space-x-1.5 sm:space-x-2">
            <button
              id="nav-profile-btn"
              title="个人工位偏好与生活画像设置"
              class="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition-all"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <span class="hidden sm:inline">工位偏好</span>
            </button>

            <div id="sync-badge-container">${getSyncBadgeHtml()}</div>

            <button
              id="theme-toggle"
              title="切换明暗色彩主题"
              class="p-1.5 sm:p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            >
              <span class="dark:hidden text-xs">🌙</span>
              <span class="hidden dark:inline text-xs">☀️</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 2. 手机端专属底部Dock导航栏 -->
    <nav class="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 shadow-lg px-2 py-1 flex items-center justify-around">
      ${navModes
        .map((item) => {
          const isActive = activeMode === item.id;
          return `
            <button
              data-mode="${item.id}"
              class="mobile-dock-btn flex-1 py-1.5 px-2 flex flex-col items-center justify-center text-center transition-all ${
                isActive
                  ? "text-slate-900 dark:text-white font-bold"
                  : "text-slate-400 dark:text-slate-500"
              }"
            >
              <span class="text-xs tracking-tight">${item.shortLabel}</span>
              ${isActive ? '<span class="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white mt-0.5"></span>' : '<span class="w-1.5 h-1.5 mt-0.5"></span>'}
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

  // 打开个人偏好与工位设置弹窗
  container.querySelector("#nav-profile-btn")?.addEventListener("click", () => {
    const modal = renderProfileModal();
    document.body.appendChild(modal);
  });

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

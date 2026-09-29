// 跨端云同步设置与连接管理弹窗组件
import { syncService } from "../../core/syncService.js";
import { playGentleChime } from "../../core/utils.js";

export function renderSyncModal(onClose) {
  const overlay = document.createElement("div");
  overlay.className = "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200";
  overlay.style.cssText = "position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100vw !important; height: 100vh !important; z-index: 9999 !important; display: flex !important; align-items: center !important; justify-content: center !important;";

  function renderContent() {
    const info = syncService.getStatus();
    const code = info.isConfigured ? btoa(JSON.stringify(syncService.config)) : "";
    const pairUrl = info.isConfigured ? `${window.location.origin}${window.location.pathname}#sync=${encodeURIComponent(code)}` : "";

    overlay.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4 max-h-[90vh] overflow-y-auto">
        <!-- 弹窗标题 -->
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div>
            <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
              <span>☁️</span>
              <span>手机与工位电脑跨端实时同步</span>
            </h3>
            <p class="text-[11px] text-slate-400 mt-0.5">基于个人私密 GitHub Gist，零中心化、永久免费、到哪都能秒级互通</p>
          </div>
          <button id="sync-modal-close" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold transition-colors">✕</button>
        </div>

        ${
          info.isConfigured
            ? `
          <!-- 已连接状态面板 -->
          <div class="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/60 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center space-x-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>跨端云同步已就绪 (双向对称)</span>
              </span>
              <span class="text-[10px] text-slate-400 font-mono">Gist ID: ${info.gistId.slice(0, 8)}...</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-300">
              手机端打卡后将自动后台静默推送；电脑工位切回网页时将自动静默拉取最新进度，实现全天候无缝同步。
            </p>
            <div class="text-[11px] text-slate-400 pt-1 border-t border-emerald-200/60 dark:border-emerald-900/40 flex justify-between">
              <span>上次同步时间：</span>
              <span class="font-bold text-emerald-700 dark:text-emerald-400">${info.lastSyncTime || "刚刚"}</span>
            </div>
          </div>

          <!-- 手动同步与跨设备串码 -->
          <div class="grid grid-cols-2 gap-2.5">
            <button id="manual-pull-btn" class="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-750 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center space-x-1">
              <span>⬇️</span>
              <span>拉取云端最新</span>
            </button>
            <button id="manual-push-btn" class="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm transition-all flex items-center justify-center space-x-1">
              <span>⬆️</span>
              <span>强制覆盖云端</span>
            </button>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-750/50 border border-slate-200/60 dark:border-slate-700 text-xs space-y-3">
            <div class="font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>📱 手机免输自动配对</span>
              <button id="copy-sync-link-btn" class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-sm transition-all">
                📋 复制一键直连网址
              </button>
            </div>
            
            <div class="flex items-center space-x-3 bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(pairUrl)}" alt="手机扫码直达" class="w-20 h-20 rounded-lg border border-slate-200 shadow-sm shrink-0" />
              <div class="text-[11px] text-slate-500 leading-relaxed space-y-1">
                <p class="font-semibold text-slate-700 dark:text-slate-200">方式 A：手机相机/微信扫码</p>
                <p>直接扫码打开，手机自动激活同步并抹去密钥，零输入即刻互通！</p>
                <p class="pt-0.5"><a href="javascript:void(0)" id="copy-sync-code-btn" class="text-blue-600 dark:text-blue-400 hover:underline">方式 B：点击复制原始串码手动导入</a></p>
              </div>
            </div>
          </div>

          <div class="pt-2 flex justify-between items-center border-t border-slate-100 dark:border-slate-700">
            <button id="disconnect-sync-btn" class="text-xs text-rose-500 hover:underline font-semibold">
              断开云同步
            </button>
            <button id="sync-done-btn" class="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs">
              完成并返回
            </button>
          </div>
        `
            : `
          <!-- 未连接配置面板 -->
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-300 space-y-1">
              <span class="font-bold block">💡 首次配置只需30秒（两步即可）：</span>
              <p class="text-[11px] leading-relaxed">
                1. 打开 GitHub ➜ Settings ➜ Developer settings ➜ Personal access tokens ➜ 勾选 <b>gist</b> 权限生成 Token；<br>
                2. 将 Token 粘贴在下方，点击一键创建私密云库即可，系统会自动帮您托管。
              </p>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">GitHub Personal Access Token</label>
              <input
                type="password"
                id="sync-token-input"
                placeholder="ghp_xxxxxxxxxxxxxx"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-slate-100 text-xs font-mono outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <!-- 方式A：一键自动创建私密库 -->
            <button
              id="auto-create-btn"
              class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>🚀</span>
              <span>一键自动创建私密云库并连接</span>
            </button>

            <!-- 方式B：导入其他设备生成的同步码 -->
            <div class="pt-2 border-t border-slate-100 dark:border-slate-700">
              <span class="block text-[11px] font-bold text-slate-400 mb-1.5">或者粘贴另一台设备分享的【快速同步串码】：</span>
              <div class="flex space-x-2">
                <input
                  type="text"
                  id="paste-sync-code-input"
                  placeholder="粘贴由电脑复制的完整同步串码..."
                  class="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-xs font-mono outline-none"
                />
                <button id="import-code-btn" class="px-3.5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs">
                  导入绑定
                </button>
              </div>
            </div>
          </div>
        `
        }
      </div>
    `;

    // 绑定关闭
    const close = () => {
      overlay.remove();
      onClose?.();
    };

    overlay.querySelector("#sync-modal-close")?.addEventListener("click", close);
    overlay.querySelector("#sync-done-btn")?.addEventListener("click", close);

    // 一键创建
    overlay.querySelector("#auto-create-btn")?.addEventListener("click", async () => {
      const token = overlay.querySelector("#sync-token-input")?.value?.trim();
      if (!token) {
        alert("请输入有效的 GitHub Token！");
        return;
      }
      try {
        overlay.querySelector("#auto-create-btn").textContent = "正在云端初始化私密存储库...";
        overlay.querySelector("#auto-create-btn").disabled = true;
        await syncService.autoCreatePrivateGist(token);
        playGentleChime(659.25, 0.2);
        alert("🎉 跨端私密云库创建成功！手机与电脑已建立双向实时同步通道。");
        renderContent();
      } catch (e) {
        alert("连接失败：" + e.message);
        renderContent();
      }
    });

    // 复制手机一键免输直连网址
    overlay.querySelector("#copy-sync-link-btn")?.addEventListener("click", () => {
      const code = btoa(JSON.stringify(syncService.config));
      const pairUrl = `${window.location.origin}${window.location.pathname}#sync=${encodeURIComponent(code)}`;
      navigator.clipboard?.writeText(pairUrl).then(() => {
        alert("✅ 一键直连网址已复制到剪贴板！发送给微信/QQ并在手机打开，即可自动完成配对。");
      });
    });

    // 复制快速同步串码
    overlay.querySelector("#copy-sync-code-btn")?.addEventListener("click", () => {
      const code = btoa(JSON.stringify(syncService.config));
      navigator.clipboard?.writeText(code).then(() => {
        alert("✅ 快速同步串码已复制到剪贴板！发送至手机网页端粘贴即可一键完成配对。");
      });
    });

    // 导入同步串码
    overlay.querySelector("#import-code-btn")?.addEventListener("click", async () => {
      const rawCode = overlay.querySelector("#paste-sync-code-input")?.value?.trim();
      if (!rawCode) return;
      try {
        const decoded = JSON.parse(atob(rawCode));
        if (decoded.token && decoded.gistId) {
          syncService.saveConfig({ token: decoded.token, gistId: decoded.gistId });
          await syncService.pullFromCloud();
          alert("🎉 跨端配置导入成功！已与电脑端实时互通。");
          renderContent();
        } else {
          alert("同步串码无效。");
        }
      } catch (err) {
        alert("解析失败，请确保复制的是完整同步串码。");
      }
    });

    // 手动拉取
    overlay.querySelector("#manual-pull-btn")?.addEventListener("click", async () => {
      const btn = overlay.querySelector("#manual-pull-btn");
      btn.textContent = "正在从云端拉取...";
      const ok = await syncService.pullFromCloud();
      if (ok) {
        playGentleChime(523.25, 0.15);
        alert("已成功从云端拉取最新打卡与日程数据！");
      } else {
        alert("拉取失败，请检查网络连接。");
      }
      renderContent();
    });

    // 手动推送
    overlay.querySelector("#manual-push-btn")?.addEventListener("click", async () => {
      const btn = overlay.querySelector("#manual-push-btn");
      btn.textContent = "正在覆盖上传...";
      const ok = await syncService.pushToCloud();
      if (ok) {
        playGentleChime(659.25, 0.2);
        alert("本地全部数据已成功推送到云端私密存储库！");
      } else {
        alert("推送失败，请检查网络。");
      }
      renderContent();
    });

    // 断开连接
    overlay.querySelector("#disconnect-sync-btn")?.addEventListener("click", () => {
      if (confirm("确定断开云端同步吗？（本地数据不会丢失）")) {
        syncService.disconnect();
        renderContent();
      }
    });
  }

  renderContent();
  return overlay;
}

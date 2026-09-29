// 跨端秒级云同步服务引擎 (基于 GitHub 私有 Gist)
import { store } from "./store.js";
import { safeJsonParse } from "./utils.js";

const SYNC_CONFIG_KEY = "grad_health_hub_sync_config_v1";

class SyncService {
  constructor() {
    this.config = this.loadConfig();
    this.status = "idle"; // 'idle' | 'syncing' | 'synced' | 'error'
    this.lastSyncTime = this.config.lastSyncTime || null;
    this.listeners = [];
    this.autoSyncTimer = null;

    // 监听数据变动，自动防抖静默同步到云端
    store.subscribe("tasksChanged", () => this.scheduleAutoPush());
    store.subscribe("stateChanged", () => this.scheduleAutoPush());
    store.subscribe("presetsChanged", () => this.scheduleAutoPush());

    // 页面切回前台（手机切回浏览器/电脑切回标签页）时自动拉取最新云端数据
    if (typeof window !== "undefined") {
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible" && this.isConfigured()) {
          this.pullFromCloud(true);
        }
      });
      window.addEventListener("focus", () => {
        if (this.isConfigured()) {
          this.pullFromCloud(true);
        }
      });
    }
  }

  loadConfig() {
    const raw = localStorage.getItem(SYNC_CONFIG_KEY);
    return safeJsonParse(raw, { token: "", gistId: "" });
  }

  saveConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    localStorage.setItem(SYNC_CONFIG_KEY, JSON.stringify(this.config));
    this.notify();
  }

  isConfigured() {
    return !!(this.config.token && this.config.gistId);
  }

  getStatus() {
    return {
      status: this.status,
      isConfigured: this.isConfigured(),
      lastSyncTime: this.lastSyncTime,
      gistId: this.config.gistId
    };
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((fn) => fn !== callback);
    };
  }

  notify() {
    this.listeners.forEach((fn) => {
      try {
        fn(this.getStatus());
      } catch (e) {
        console.error("Sync listener error:", e);
      }
    });
  }

  scheduleAutoPush() {
    if (!this.isConfigured()) return;
    if (this.autoSyncTimer) clearTimeout(this.autoSyncTimer);
    // 防抖1.2秒，避免频繁打字或连续点击触发API限频
    this.autoSyncTimer = setTimeout(() => {
      this.pushToCloud(true);
    }, 1200);
  }

  // 1. 从云端拉取最新数据
  async pullFromCloud(silent = false) {
    if (!this.isConfigured()) return false;
    this.status = "syncing";
    this.notify();

    try {
      const resp = await fetch(`https://api.github.com/gists/${this.config.gistId}`, {
        headers: {
          Authorization: `token ${this.config.token}`,
          Accept: "application/vnd.github.v3+json"
        }
      });

      if (!resp.ok) {
        throw new Error(`云端拉取失败 (HTTP ${resp.status})`);
      }

      const gist = await resp.json();
      const file = gist.files["lifeplan_hub_data.json"] || gist.files["grad_health_hub_data.json"];
      if (!file || !file.content) {
        throw new Error("云端数据文件不存在");
      }

      // 将云端数据合并进本地store
      const success = store.importDataJson(file.content);
      if (success) {
        this.status = "synced";
        this.lastSyncTime = new Date().toLocaleTimeString("zh-CN", { hour12: false });
        this.saveConfig({ lastSyncTime: this.lastSyncTime });
      } else {
        this.status = "error";
      }
      this.notify();
      return success;
    } catch (err) {
      this.status = "error";
      this.notify();
      if (!silent) console.error("Pull from cloud error:", err);
      return false;
    }
  }

  // 2. 将本地数据推送到云端
  async pushToCloud(silent = false) {
    if (!this.isConfigured()) return false;
    this.status = "syncing";
    this.notify();

    try {
      const jsonContent = store.exportDataJson();
      const payload = {
        description: "LifePlan 全域规划中枢 - 跨端自律数据同步 (Private Gist)",
        files: {
          "lifeplan_hub_data.json": {
            content: jsonContent
          },
          "grad_health_hub_data.json": {
            content: jsonContent
          }
        }
      };

      const resp = await fetch(`https://api.github.com/gists/${this.config.gistId}`, {
        method: "PATCH",
        headers: {
          Authorization: `token ${this.config.token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) {
        throw new Error(`云端推送失败 (HTTP ${resp.status})`);
      }

      this.status = "synced";
      this.lastSyncTime = new Date().toLocaleTimeString("zh-CN", { hour12: false });
      this.saveConfig({ lastSyncTime: this.lastSyncTime });
      this.notify();
      return true;
    } catch (err) {
      this.status = "error";
      this.notify();
      if (!silent) console.error("Push to cloud error:", err);
      return false;
    }
  }

  // 3. 用户填入Token后，自动在用户GitHub上一键创建私密Gist
  async autoCreatePrivateGist(token) {
    if (!token) throw new Error("请输入有效的 GitHub Token！");

    const jsonContent = store.exportDataJson();
    const payload = {
      description: "LifePlan 全域规划中枢 - 个人专属跨端私密存储库",
      public: false, // 保证100%私密，外人不可见
      files: {
        "lifeplan_hub_data.json": {
          content: jsonContent
        },
        "grad_health_hub_data.json": {
          content: jsonContent
        }
      }
    };

    const resp = await fetch("https://api.github.com/gists", {
      method: "POST",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      throw new Error(`创建私密Gist失败 (HTTP ${resp.status})，请检查Token是否有勾选 gist 权限`);
    }

    const created = await resp.json();
    this.saveConfig({ token, gistId: created.id });
    this.status = "synced";
    this.lastSyncTime = new Date().toLocaleTimeString("zh-CN", { hour12: false });
    this.notify();
    return created.id;
  }

  // 清除配置断开连接
  disconnect() {
    this.config = { token: "", gistId: "" };
    localStorage.removeItem(SYNC_CONFIG_KEY);
    this.status = "idle";
    this.lastSyncTime = null;
    this.notify();
  }
}

export const syncService = new SyncService();

// 语义化 SPA 路由分发器 (适配 GitHub Pages /plan/ 二级目录直达与前进后退)

class Router {
  constructor() {
    this.listeners = [];
    this.basePath = this.detectBasePath();

    if (typeof window !== "undefined") {
      window.addEventListener("popstate", () => {
        const route = this.getCurrentRoute();
        this.notify(route);
      });
    }
  }

  detectBasePath() {
    if (typeof window === "undefined") return "/plan";
    const path = window.location.pathname;
    if (path.startsWith("/plan")) {
      return "/plan";
    }
    return "";
  }

  // 根据当前浏览器 URL 推导激活的模式与子工具
  getCurrentRoute() {
    if (typeof window === "undefined") return { mode: "overview" };

    const fullPath = window.location.pathname;
    let relPath = fullPath;
    if (this.basePath && relPath.startsWith(this.basePath)) {
      relPath = relPath.substring(this.basePath.length);
    }
    // 清理尾部与首部斜杠
    relPath = relPath.replace(/\/+$/, "").toLowerCase();
    if (!relPath || relPath === "") relPath = "/";

    // 路由映射规则字典
    if (relPath === "/" || relPath === "/overview") {
      return { mode: "overview" };
    }
    if (relPath === "/daily" || relPath === "/today") {
      return { mode: "daily" };
    }
    if (relPath === "/timetable" || relPath === "/schedule" || relPath === "/kebiao") {
      return { mode: "timetable" };
    }
    // 方案手册规程
    if (relPath === "/diet" || relPath === "/nutrition" || relPath === "/eat" || relPath === "/food") {
      return { mode: "plans", subId: "diet_plan" };
    }
    if (relPath === "/workout" || relPath === "/fitness" || relPath === "/badminton" || relPath === "/sport") {
      return { mode: "plans", subId: "fitness_plan" };
    }
    if (relPath === "/posture" || relPath === "/stretch") {
      return { mode: "plans", subId: "posture_plan" };
    }
    if (relPath === "/circadian" || relPath === "/sleep") {
      return { mode: "plans", subId: "circadian_plan" };
    }
    if (relPath === "/mental" || relPath === "/mind") {
      return { mode: "plans", subId: "mental_plan" };
    }
    if (relPath === "/work" || relPath === "/focus") {
      return { mode: "plans", subId: "research_plan" };
    }
    // 储备库直达
    if (relPath === "/pantry" || relPath === "/inventory" || relPath === "/stock") {
      return { mode: "plans", subId: "diet_plan", isPantry: true };
    }
    // 工具箱及子工具
    if (relPath === "/tools" || relPath === "/toolbox") {
      return { mode: "tools", subId: "tracker_tool" };
    }
    if (relPath === "/tools/badminton" || relPath === "/tools/score") {
      return { mode: "tools", subId: "badminton_tool" };
    }
    if (relPath === "/tools/macro" || relPath === "/tools/tdee" || relPath === "/tools/calorie") {
      return { mode: "tools", subId: "macro_tool" };
    }
    if (relPath === "/tools/caffeine" || relPath === "/tools/coffee") {
      return { mode: "tools", subId: "caffeine_tool" };
    }
    if (relPath === "/tools/water") {
      return { mode: "tools", subId: "water_tool" };
    }
    if (relPath === "/tools/substitute" || relPath === "/tools/sub") {
      return { mode: "tools", subId: "substitute_tool" };
    }
    if (relPath === "/tools/breathing" || relPath === "/tools/breath") {
      return { mode: "tools", subId: "breathing_tool" };
    }
    if (relPath === "/tools/timer") {
      return { mode: "tools", subId: "desk_timer_tool" };
    }
    if (relPath === "/tools/backup") {
      return { mode: "tools", subId: "backup_tool" };
    }

    return { mode: "overview" };
  }

  // 根据模式与子ID生成对应干净的二级URL
  getUrl(mode, subId) {
    let rel = "";
    if (mode === "overview") rel = "/";
    else if (mode === "daily") rel = "/daily";
    else if (mode === "timetable") rel = "/timetable";
    else if (mode === "plans") {
      if (subId === "diet_plan") rel = "/diet";
      else if (subId === "fitness_plan") rel = "/workout";
      else if (subId === "posture_plan") rel = "/posture";
      else if (subId === "circadian_plan") rel = "/circadian";
      else if (subId === "mental_plan") rel = "/mental";
      else if (subId === "research_plan") rel = "/work";
      else rel = "/diet";
    } else if (mode === "tools") {
      if (subId === "badminton_tool") rel = "/tools/badminton";
      else if (subId === "macro_tool") rel = "/tools/macro";
      else if (subId === "caffeine_tool") rel = "/tools/caffeine";
      else if (subId === "water_tool") rel = "/tools/water";
      else if (subId === "substitute_tool") rel = "/tools/substitute";
      else if (subId === "breathing_tool") rel = "/tools/breathing";
      else if (subId === "desk_timer_tool") rel = "/tools/timer";
      else if (subId === "backup_tool") rel = "/tools/backup";
      else rel = "/tools";
    }

    const full = (this.basePath + rel).replace(/\/+$/, "") || "/";
    return full;
  }

  push(mode, subId) {
    if (typeof window === "undefined") return;
    const targetUrl = this.getUrl(mode, subId);
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, "", targetUrl);
    }
  }

  subscribe(fn) {
    this.listeners.push(fn);
  }

  notify(route) {
    this.listeners.forEach((fn) => {
      try { fn(route); } catch (e) { console.error("Router listener error:", e); }
    });
  }
}

export const router = new Router();

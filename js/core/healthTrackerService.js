// 体重追踪与外食热量记录核心服务 (Weight & Dining Out Calorie Tracking Service)
import { getTodayKey, safeJsonParse } from "./utils.js";
import { store } from "./store.js";

const WEIGHT_STORAGE_KEY = "grad_plan_weight_logs_v1";
const FOOD_LOGS_STORAGE_KEY = "grad_plan_food_logs_v1";

class HealthTrackerService {
  constructor() {
    this.weightLogs = this.loadWeightLogs();
    this.foodLogs = this.loadFoodLogs();
    this.listeners = new Map();
  }

  loadWeightLogs() {
    const raw = localStorage.getItem(WEIGHT_STORAGE_KEY);
    const parsed = safeJsonParse(raw, []);
    return Array.isArray(parsed) ? parsed : [];
  }

  saveWeightLogs() {
    localStorage.setItem(WEIGHT_STORAGE_KEY, JSON.stringify(this.weightLogs));
    store.emit("stateChanged", null);
  }

  loadFoodLogs() {
    const raw = localStorage.getItem(FOOD_LOGS_STORAGE_KEY);
    const parsed = safeJsonParse(raw, []);
    return Array.isArray(parsed) ? parsed : [];
  }

  saveFoodLogs() {
    localStorage.setItem(FOOD_LOGS_STORAGE_KEY, JSON.stringify(this.foodLogs));
    store.emit("stateChanged", null);
  }

  // --- 体重管理 ---
  logWeight(weightKg, note = "", date = getTodayKey()) {
    const val = parseFloat(Number(weightKg).toFixed(1));
    if (isNaN(val) || val <= 0) return null;

    // 若同一天已有记录，覆盖更新；否则新增
    const existingIndex = this.weightLogs.findIndex((w) => w.date === date);
    const entry = {
      id: "wt_" + Date.now(),
      date,
      weight: val,
      note: note.trim(),
      timestamp: Date.now()
    };

    if (existingIndex >= 0) {
      this.weightLogs[existingIndex] = entry;
    } else {
      this.weightLogs.unshift(entry);
    }

    // 按日期降序排序
    this.weightLogs.sort((a, b) => b.date.localeCompare(a.date));
    this.saveWeightLogs();
    this.emit("weightChanged", this.weightLogs);
    return entry;
  }

  getWeightLogs() {
    return [...this.weightLogs];
  }

  getLatestWeight() {
    if (this.weightLogs.length === 0) {
      const defaultWt = store.getUserProfile().targetWeight || 70.0;
      return { current: defaultWt, previous: defaultWt, diff: 0, date: getTodayKey(), hasLog: false };
    }
    const current = this.weightLogs[0];
    const previous = this.weightLogs.length > 1 ? this.weightLogs[1] : current;
    const diff = parseFloat((current.weight - previous.weight).toFixed(1));
    return {
      current: current.weight,
      previous: previous.weight,
      diff,
      date: current.date,
      note: current.note,
      hasLog: true
    };
  }

  deleteWeightLog(id) {
    this.weightLogs = this.weightLogs.filter((w) => w.id !== id);
    this.saveWeightLogs();
    this.emit("weightChanged", this.weightLogs);
  }

  // --- 外食与卡路里记录 ---
  logFood(entry, date = getTodayKey()) {
    const newEntry = {
      id: "food_" + Date.now(),
      date,
      name: entry.name.trim(),
      calories: Math.max(0, parseInt(entry.calories, 10) || 0),
      mealType: entry.mealType || "外食",
      note: entry.note ? entry.note.trim() : "",
      timestamp: Date.now()
    };
    this.foodLogs.unshift(newEntry);
    this.saveFoodLogs();
    this.emit("foodLogsChanged", this.foodLogs);
    return newEntry;
  }

  getFoodLogs(filterDate = null) {
    if (filterDate) {
      return this.foodLogs.filter((f) => f.date === filterDate);
    }
    return [...this.foodLogs];
  }

  getTodayFoodCalories(date = getTodayKey()) {
    const logs = this.getFoodLogs(date);
    return logs.reduce((sum, item) => sum + (item.calories || 0), 0);
  }

  deleteFoodLog(id) {
    this.foodLogs = this.foodLogs.filter((f) => f.id !== id);
    this.saveFoodLogs();
    this.emit("foodLogsChanged", this.foodLogs);
  }

  // --- 事件总线 ---
  subscribe(event, callback) {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event).push(callback);
    return () => {
      const arr = this.listeners.get(event) || [];
      this.listeners.set(event, arr.filter((fn) => fn !== callback));
    };
  }

  emit(event, data) {
    const arr = this.listeners.get(event) || [];
    arr.forEach((fn) => {
      try { fn(data); } catch (e) { console.error("HealthTrackerService error:", e); }
    });
  }
}

export const healthTracker = new HealthTrackerService();

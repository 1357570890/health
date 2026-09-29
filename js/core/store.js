// 研途健康数据中心：双轨持久化存储与历史任务档案服务
import { getTodayKey, safeJsonParse } from "./utils.js";
import { TIMETABLE_SLOTS, getTimetableCell } from "../data/timetableData.js";
import defaultInventoryJson from "../../data/inventory_default.json";
import defaultProfileJson from "../../data/profile_default.json";
import defaultPresetsJson from "../../data/presets_default.json";

const RECORDS_STORAGE_KEY = "grad_health_hub_records_v1";
const TASKS_STORAGE_KEY = "grad_health_hub_daily_tasks_v1";
const PRESETS_STORAGE_KEY = "grad_health_hub_quick_presets_v1";
const PROFILE_STORAGE_KEY = "grad_plan_user_profile_v1";
const INVENTORY_STORAGE_KEY = "grad_plan_inventory_v1";

export const DEFAULT_INVENTORY = defaultInventoryJson;
export const DEFAULT_PROFILE = defaultProfileJson;
const DEFAULT_PRESETS = defaultPresetsJson;

class Store {
  constructor() {
    this.listeners = new Map();
    this.records = this.loadRecords();
    this.tasksByDate = this.loadTasks();
    this.presets = this.loadPresets();
    this.profile = this.loadProfile();
    this.inventory = this.loadInventory();
    this.selectedDate = getTodayKey();
    this.ensureDateTasks(this.selectedDate);
  }

  loadRecords() {
    return safeJsonParse(localStorage.getItem(RECORDS_STORAGE_KEY), {});
  }
  saveRecords() {
    localStorage.setItem(RECORDS_STORAGE_KEY, JSON.stringify(this.records));
  }

  loadTasks() {
    return safeJsonParse(localStorage.getItem(TASKS_STORAGE_KEY), {});
  }
  saveTasks() {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(this.tasksByDate));
  }

  loadPresets() {
    const raw = localStorage.getItem(PRESETS_STORAGE_KEY);
    return safeJsonParse(raw, DEFAULT_PRESETS);
  }
  savePresets() {
    localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(this.presets));
  }

  loadProfile() {
    return safeJsonParse(localStorage.getItem(PROFILE_STORAGE_KEY), DEFAULT_PROFILE);
  }
  saveProfile() {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(this.profile));
  }

  getUserProfile() {
    return this.profile || DEFAULT_PROFILE;
  }
  updateUserProfile(updates) {
    this.profile = { ...this.profile, ...updates };
    this.saveProfile();
    this.emit("profileChanged", this.profile);
    this.emit("stateChanged", null);
  }

  generateBaselineTasks(dayName) {
    let exerciseTitle = "力量抗阻训练（俯卧撑+划船+面拉护肩4组）";
    let exerciseTime = "19:00~20:00";
    let exerciseBadge = "力量护肩";
    if (dayName === "周二" || dayName === "周四") {
      exerciseTitle = "操场低心率慢跑（4公里 Zone 2 有氧）";
      exerciseBadge = "慢跑心肺";
    } else if (dayName === "周六") {
      exerciseTitle = "球馆羽毛球对抗（90分钟实战对局）";
      exerciseTime = "14:30~17:00";
      exerciseBadge = "羽球实战";
    } else if (dayName === "周日") {
      exerciseTitle = "主动身心重启与户外排酸（漫游散步）";
      exerciseTime = "16:00~17:00";
      exerciseBadge = "身心重启";
    }

    return [
      {
        id: "fixed_diet_breakfast",
        time: "07:30~08:30",
        label: "控糖早餐",
        title: "全黑麦面包2片 + 纯牛奶250ml + 鸡蛋2个",
        category: "diet",
        isFixed: true,
        completed: false,
        details: "补充约28g优质蛋白，蛋黄富含胆碱供给脑力",
        brief: "全黑麦+纯牛奶+双鸡蛋",
        badge: "早餐规划"
      },
      {
        id: "fixed_diet_lunch",
        time: "11:30~12:30",
        label: "控糖午餐",
        title: "食堂1拳米饭 + 2份蔬菜(涮油) + 开自带鸡胸肉",
        category: "diet",
        isFixed: true,
        completed: false,
        details: "控糖黄金序：先喝汤吃菜肉，最后吃米饭，下午不犯困",
        brief: "1拳米饭+2份素菜+自带蛋白",
        badge: "午餐规划"
      },
      {
        id: "fixed_diet_snack",
        time: "13:30~15:00",
        label: "加餐节律",
        title: "黑咖啡1杯（15:00锁死红线）+ 每日温水2000ml",
        category: "diet",
        isFixed: true,
        completed: false,
        details: "15:00后严禁摄入任何咖啡因，保护夜间深度睡眠",
        brief: "黑咖啡+分段小口温水",
        badge: "加餐规划"
      },
      {
        id: "fixed_diet_dinner",
        time: "17:30~18:30",
        label: "低GI晚餐",
        title: "蒸红薯150g + 即食鸡胸肉100g + 黄瓜1根",
        category: "diet",
        isFixed: true,
        completed: false,
        details: "低碳水控能，睡前3小时严格禁食（20:30后只饮清水）",
        brief: "红薯+鸡胸肉+黄瓜",
        badge: "晚餐规划"
      },
      {
        id: "fixed_routine_exercise",
        time: exerciseTime,
        label: "今日体能",
        title: exerciseTitle,
        category: "exercise",
        isFixed: true,
        completed: false,
        details: "按计划执行，不力竭重在维持心肺代谢与精力充沛",
        brief: "3+2体能与羽球实操",
        badge: exerciseBadge
      }
    ];
  }

  ensureDateTasks(dateKey) {
    const targetDate = new Date(dateKey + "T00:00:00");
    const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const dayName = weekdays[targetDate.getDay()];

    if (!this.tasksByDate[dateKey]) {
      this.tasksByDate[dateKey] = this.generateBaselineTasks(dayName);
      this.saveTasks();
    } else {
      const currentList = this.tasksByDate[dateKey];
      const hasOldSlots = currentList.some((t) => t.id && t.id.startsWith("fixed_slot_"));
      if (hasOldSlots) {
        const customTasks = currentList.filter((t) => !t.isFixed || !t.id.startsWith("fixed_slot_"));
        const baseDietTasks = this.generateBaselineTasks(dayName);
        this.tasksByDate[dateKey] = [...baseDietTasks, ...customTasks.filter((t) => !t.id.startsWith("fixed_"))];
        this.saveTasks();
      }
    }
  }

  getSelectedDate() {
    return this.selectedDate;
  }

  getTasksForToday() {
    return this.getTasksForSelectedDate();
  }

  isViewingToday() {
    return this.selectedDate === getTodayKey();
  }

  setSelectedDate(dateKey) {
    this.selectedDate = dateKey;
    this.ensureDateTasks(dateKey);
    this.emit("dateChanged", dateKey);
    this.emit("tasksChanged", this.getTasksForSelectedDate());
  }

  getTasksForDate(dateKey) {
    this.ensureDateTasks(dateKey);
    return this.tasksByDate[dateKey] || [];
  }

  getTasksForSelectedDate() {
    this.ensureDateTasks(this.selectedDate);
    return this.tasksByDate[this.selectedDate] || [];
  }

  getTomorrowKey(baseDate = getTodayKey()) {
    const d = new Date(baseDate + "T00:00:00");
    d.setDate(d.getDate() + 1);
    const yr = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, "0");
    const da = String(d.getDate()).padStart(2, "0");
    return `${yr}-${mo}-${da}`;
  }

  getYesterdayKey(baseDate = getTodayKey()) {
    const d = new Date(baseDate + "T00:00:00");
    d.setDate(d.getDate() - 1);
    const yr = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, "0");
    const da = String(d.getDate()).padStart(2, "0");
    return `${yr}-${mo}-${da}`;
  }

  getYesterdayUnfinishedTasks() {
    const yestKey = this.getYesterdayKey();
    if (!this.tasksByDate[yestKey]) return [];
    return this.tasksByDate[yestKey].filter((t) => !t.isFixed && !t.completed);
  }

  rolloverYesterdayTasks() {
    const todayKey = getTodayKey();
    const uncompleted = this.getYesterdayUnfinishedTasks();
    if (uncompleted.length === 0) return 0;

    this.ensureDateTasks(todayKey);
    const currentToday = this.tasksByDate[todayKey] || [];
    uncompleted.forEach((t) => {
      const alreadyExists = currentToday.some((ct) => ct.title === t.title);
      if (!alreadyExists) {
        currentToday.push({
          ...t,
          id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          badge: "昨日顺延",
          completed: false
        });
      }
    });

    this.saveTasks();
    this.emit("tasksChanged", this.tasksByDate[todayKey]);
    this.emit("stateChanged", null);
    return uncompleted.length;
  }

  addTask(task, targetDate = this.selectedDate) {
    this.ensureDateTasks(targetDate);
    const isWork = task.category === "research" || task.category === "work";
    const newTask = {
      id: `custom_${Date.now()}`,
      time: task.time || "全天随时",
      label: task.label || (isWork ? "本职工作" : "生活规划"),
      title: task.title,
      category: task.category || (isWork ? "work" : "habit"),
      isFixed: false,
      completed: false,
      details: task.details || "待办事项",
      brief: task.brief || "",
      badge: task.badge || (isWork ? "核心职责" : "自律日常"),
      sub: "",
      tips: ""
    };
    this.tasksByDate[targetDate].push(newTask);
    this.saveTasks();
    this.emit("tasksChanged", this.tasksByDate[targetDate]);
    this.emit("stateChanged", null);
    return newTask;
  }

  updateTask(taskId, updates, targetDate = this.selectedDate) {
    this.ensureDateTasks(targetDate);
    const list = this.tasksByDate[targetDate] || [];
    this.tasksByDate[targetDate] = list.map((item) => (item.id === taskId ? { ...item, ...updates } : item));
    this.saveTasks();
    this.emit("tasksChanged", this.tasksByDate[targetDate]);
    this.emit("stateChanged", null);
  }

  deleteTask(taskId, targetDate = this.selectedDate) {
    this.ensureDateTasks(targetDate);
    const list = this.tasksByDate[targetDate] || [];
    this.tasksByDate[targetDate] = list.filter((item) => item.id !== taskId);
    this.saveTasks();
    this.emit("tasksChanged", this.tasksByDate[targetDate]);
    this.emit("stateChanged", null);
  }

  toggleTask(taskId, targetDate = this.selectedDate) {
    this.ensureDateTasks(targetDate);
    const list = this.tasksByDate[targetDate] || [];
    this.tasksByDate[targetDate] = list.map((item) => (item.id === taskId ? { ...item, completed: !item.completed } : item));
    this.saveTasks();
    this.emit("tasksChanged", this.tasksByDate[targetDate]);
    this.emit("stateChanged", null);
  }

  resetDateToBaseline(targetDate = this.selectedDate) {
    const d = new Date(targetDate + "T00:00:00");
    const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const dayName = weekdays[d.getDay()];
    this.tasksByDate[targetDate] = this.generateBaselineTasks(dayName);
    this.saveTasks();
    this.emit("tasksChanged", this.tasksByDate[targetDate]);
  }

  calculateProgress(targetDate = this.selectedDate) {
    const tasks = this.tasksByDate[targetDate] || [];
    if (tasks.length === 0) return { total: 0, done: 0, percent: 0 };
    const done = tasks.filter((t) => t.completed).length;
    const total = tasks.length;
    return { total, done, percent: Math.round((done / total) * 100) };
  }

  getQuickPresets() {
    return this.presets || [];
  }

  addQuickPreset(preset) {
    const newPreset = {
      id: `preset_${Date.now()}`,
      title: preset.title,
      time: preset.time || "全天随时",
      category: preset.category || "research",
      badge: preset.badge || "快捷",
      details: preset.details || ""
    };
    this.presets.push(newPreset);
    this.savePresets();
    this.emit("presetsChanged", this.presets);
    return newPreset;
  }

  deleteQuickPreset(presetId) {
    this.presets = this.presets.filter((p) => p.id !== presetId);
    this.savePresets();
    this.emit("presetsChanged", this.presets);
  }

  // --- 食材储备与补货管理 ---
  loadInventory() {
    const raw = localStorage.getItem(INVENTORY_STORAGE_KEY);
    return safeJsonParse(raw, DEFAULT_INVENTORY);
  }

  saveInventory() {
    localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(this.inventory));
  }

  getInventory() {
    return [...this.inventory];
  }

  getLowStockItems() {
    return this.inventory.filter((item) => Number(item.stock) <= Number(item.threshold));
  }

  consumeInventory(id, amount = 1) {
    const item = this.inventory.find((i) => i.id === id);
    if (!item) return null;
    item.stock = Math.max(0, Number(item.stock) - Number(amount));
    this.saveInventory();
    this.emit("inventoryChanged", this.inventory);
    return item;
  }

  restockInventory(id, amount) {
    const item = this.inventory.find((i) => i.id === id);
    if (!item) return null;
    item.stock = Math.max(0, Number(item.stock) + Number(amount));
    this.saveInventory();
    this.emit("inventoryChanged", this.inventory);
    return item;
  }

  updateInventoryItem(id, updates) {
    const idx = this.inventory.findIndex((i) => i.id === id);
    if (idx === -1) return null;
    this.inventory[idx] = { ...this.inventory[idx], ...updates };
    this.saveInventory();
    this.emit("inventoryChanged", this.inventory);
    return this.inventory[idx];
  }

  addInventoryItem(item) {
    const newItem = {
      id: "inv_" + Date.now(),
      name: item.name.trim(),
      category: item.category || "优质蛋白",
      stock: Math.max(0, Number(item.stock) || 0),
      unit: item.unit || "份",
      threshold: Math.max(0, Number(item.threshold) || 2),
      dailyUsage: Math.max(0.1, Number(item.dailyUsage) || 1),
      icon: item.icon || "🥗"
    };
    this.inventory.push(newItem);
    this.saveInventory();
    this.emit("inventoryChanged", this.inventory);
    return newItem;
  }

  deleteInventoryItem(id) {
    this.inventory = this.inventory.filter((i) => i.id !== id);
    this.saveInventory();
    this.emit("inventoryChanged", this.inventory);
  }

  exportDataJson() {
    const rawWeight = localStorage.getItem("grad_plan_weight_logs_v1");
    const rawFood = localStorage.getItem("grad_plan_food_logs_v1");
    return JSON.stringify(
      {
        records: this.records,
        tasksByDate: this.tasksByDate,
        presets: this.presets,
        profile: this.profile,
        inventory: this.inventory,
        weightLogs: safeJsonParse(rawWeight, []),
        foodLogs: safeJsonParse(rawFood, []),
        exportedAt: new Date().toISOString()
      },
      null,
      2
    );
  }

  importDataJson(jsonString) {
    const parsed = safeJsonParse(jsonString, null);
    if (parsed && typeof parsed === "object") {
      if (parsed.records) this.records = parsed.records;
      if (parsed.tasksByDate) this.tasksByDate = parsed.tasksByDate;
      if (parsed.presets) this.presets = parsed.presets;
      if (parsed.profile) this.profile = parsed.profile;
      if (parsed.inventory) this.inventory = parsed.inventory;
      if (parsed.weightLogs) {
        localStorage.setItem("grad_plan_weight_logs_v1", JSON.stringify(parsed.weightLogs));
      }
      if (parsed.foodLogs) {
        localStorage.setItem("grad_plan_food_logs_v1", JSON.stringify(parsed.foodLogs));
      }
      this.saveRecords();
      this.saveTasks();
      this.savePresets();
      this.saveProfile();
      this.saveInventory();
      this.emit("tasksChanged", this.getTasksForSelectedDate());
      this.emit("presetsChanged", this.presets);
      this.emit("profileChanged", this.profile);
      this.emit("inventoryChanged", this.inventory);
      return true;
    }
    return false;
  }

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
      try { fn(data); } catch (err) { console.error("EventBus error:", err); }
    });
  }
}

export const store = new Store();

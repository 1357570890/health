// 研途健康数据中心：双轨持久化存储与历史任务档案服务
import { getTodayKey, safeJsonParse } from "./utils.js";
import { TIMETABLE_SLOTS, getTimetableCell } from "../data/timetableData.js";

const RECORDS_STORAGE_KEY = "grad_health_hub_records_v1";
const TASKS_STORAGE_KEY = "grad_health_hub_daily_tasks_v1";
const PRESETS_STORAGE_KEY = "grad_health_hub_quick_presets_v1";
const PROFILE_STORAGE_KEY = "grad_plan_user_profile_v1";
const INVENTORY_STORAGE_KEY = "grad_plan_inventory_v1";

export const DEFAULT_INVENTORY = [
  { id: "inv_egg", name: "水煮蛋 / 鲜鸡蛋", category: "优质蛋白", stock: 12, unit: "个", threshold: 4, dailyUsage: 2, icon: "🥚" },
  { id: "inv_bread", name: "全黑麦面包 / 谷物切片", category: "健康主食", stock: 8, unit: "片", threshold: 3, dailyUsage: 2, icon: "🍞" },
  { id: "inv_milk", name: "低脂纯牛奶 (250ml)", category: "乳品饮品", stock: 6, unit: "盒", threshold: 3, dailyUsage: 1, icon: "🥛" },
  { id: "inv_chicken", name: "即食鸡胸肉 (100g)", category: "优质蛋白", stock: 7, unit: "袋", threshold: 2, dailyUsage: 1, icon: "🍗" },
  { id: "inv_cucumber", name: "生脆黄瓜 / 鲜果蔬", category: "轻食果蔬", stock: 4, unit: "根", threshold: 2, dailyUsage: 1, icon: "🥒" },
  { id: "inv_coffee", name: "纯黑咖啡 / 冻干条", category: "工位补给", stock: 15, unit: "条", threshold: 5, dailyUsage: 1, icon: "☕" },
  { id: "inv_vit_d3", name: "维生素D3 (1000~2000IU)", category: "核心补剂", stock: 40, unit: "粒", threshold: 10, dailyUsage: 1, icon: "💊" },
  { id: "inv_fish_oil", name: "高纯Omega-3深海鱼油", category: "核心补剂", stock: 35, unit: "粒", threshold: 10, dailyUsage: 1, icon: "🐟" },
  { id: "inv_magnesium", name: "甘氨酸镁 (晚间安睡)", category: "核心补剂", stock: 25, unit: "粒", threshold: 7, dailyUsage: 1, icon: "🌙" }
];

export const DEFAULT_PROFILE = {
  stage: "专注工作与工位自律模式",
  diet: {
    breakfast: "全黑麦面包2片 + 纯牛奶250ml + 水煮蛋2个",
    lunchProtein: "即食鸡胸肉100g",
    dinner: "蒸红薯150g + 即食鸡胸肉100g + 黄瓜1根",
    coffeeCutoff: "15:00",
    fastingCutoff: "20:30"
  },
  exercise: {
    strengthDays: ["周一", "周三", "周五"],
    runDays: ["周二", "周四"],
    runDistanceKm: "4公里",
    badmintonDays: ["周六", "周日"],
    badmintonDuration: "90分钟"
  },
  routine: {
    waterDaily: "2000ml (8杯)",
    sleepTarget: "23:30 (5个周期)",
    deskStretchIntervalMin: 45
  }
};

const DEFAULT_PRESETS = [
  { id: "preset_chicken", title: "开一包自带高蛋白（即食鸡胸肉100g/酱牛肉70g）", time: "午餐/晚餐", category: "diet", badge: "优质蛋白", details: "满足每餐25~30g蛋白，先菜肉后米饭" },
  { id: "preset_coffee", title: "午后黑咖啡1杯（200~250ml，15:00前截止锁死）", time: "13:30~15:00", category: "diet", badge: "黑咖啡", details: "提升下午工位专注度，过15:00严禁饮用" },
  { id: "preset_desk_stretch", title: "工位颈椎下颌微回缩与门框扩胸拉伸", time: "每45分钟", category: "habit", badge: "工位微动", details: "下颌回缩10次+门框拉伸30秒+接水250ml" },
  { id: "preset_run", title: "操场低心率慢跑4公里（Zone 2，步频180）", time: "19:00~19:40", category: "sport", badge: "跑步心肺", details: "微喘能对话，步频180，全脚掌滚动着地" },
  { id: "preset_badminton", title: "球馆羽毛球实战对抗90分钟", time: "19:00~20:30", category: "sport", badge: "羽球高燃", details: "穿专业生胶底羽球鞋，动态热身7分钟防崴脚" },
  { id: "preset_strength", title: "力量抗阻：俯卧撑+划船+面拉护肩袖4组", time: "19:00~19:45", category: "sport", badge: "力量抗阻", details: "面拉强效保护肩袖小圆肌，核心抗旋转" },
  { id: "preset_paper_read", title: "深度文献与前沿技术精读笔记", time: "14:00~15:30", category: "research", badge: "深度研读", details: "拆解创新点、架构设计与对比实验" },
  { id: "preset_code_debug", title: "核心系统代码调试与业务实操攻坚", time: "09:00~11:30", category: "research", badge: "核心实操", details: "关闭无关弹窗，专注45分钟工位专注块" },
  { id: "preset_meeting", title: "关键汇报沟通（提问题自带2个备选方案）", time: "15:00~16:30", category: "research", badge: "关键汇报", details: "事实与情绪解耦，提炼关键讨论点" },
  { id: "preset_sleep", title: "睡前4-7-8呼吸法3组与23:30熄灯入眠", time: "23:00~23:30", category: "habit", badge: "睡眠节律", details: "锁定5个完整90分钟睡眠周期，远离蓝光" }
];

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
    const categoryMap = { meal: "diet", sport: "sport", research: "research", water: "habit", sleep: "habit" };
    return TIMETABLE_SLOTS.map((slot) => {
      const cell = getTimetableCell(dayName, slot.id);
      return {
        id: `fixed_${slot.id}`,
        time: slot.time,
        label: slot.label,
        title: cell.title,
        category: categoryMap[cell.type] || "habit",
        isFixed: true,
        completed: false,
        details: cell.details,
        brief: cell.brief,
        badge: cell.badge,
        sub: cell.sub || "",
        tips: cell.tips || ""
      };
    });
  }

  ensureDateTasks(dateKey) {
    if (!this.tasksByDate[dateKey]) {
      const targetDate = new Date(dateKey + "T00:00:00");
      const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      const dayName = weekdays[targetDate.getDay()];
      this.tasksByDate[dateKey] = this.generateBaselineTasks(dayName);
      this.saveTasks();
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

  addTask(task, targetDate = this.selectedDate) {
    this.ensureDateTasks(targetDate);
    const newTask = {
      id: `custom_${Date.now()}`,
      time: task.time || "全天随时",
      label: task.label || "临时任务",
      title: task.title,
      category: task.category || "research",
      isFixed: false,
      completed: false,
      details: task.details || "手动添加的待办",
      brief: task.brief || "",
      badge: task.badge || "自建任务",
      sub: "",
      tips: ""
    };
    this.tasksByDate[targetDate].push(newTask);
    this.saveTasks();
    this.emit("tasksChanged", this.tasksByDate[targetDate]);
    return newTask;
  }

  updateTask(taskId, updates, targetDate = this.selectedDate) {
    this.ensureDateTasks(targetDate);
    const list = this.tasksByDate[targetDate] || [];
    this.tasksByDate[targetDate] = list.map((item) => (item.id === taskId ? { ...item, ...updates } : item));
    this.saveTasks();
    this.emit("tasksChanged", this.tasksByDate[targetDate]);
  }

  deleteTask(taskId, targetDate = this.selectedDate) {
    this.ensureDateTasks(targetDate);
    const list = this.tasksByDate[targetDate] || [];
    this.tasksByDate[targetDate] = list.filter((item) => item.id !== taskId);
    this.saveTasks();
    this.emit("tasksChanged", this.tasksByDate[targetDate]);
  }

  toggleTask(taskId, targetDate = this.selectedDate) {
    this.ensureDateTasks(targetDate);
    const list = this.tasksByDate[targetDate] || [];
    this.tasksByDate[targetDate] = list.map((item) => (item.id === taskId ? { ...item, completed: !item.completed } : item));
    this.saveTasks();
    this.emit("tasksChanged", this.tasksByDate[targetDate]);
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
    return JSON.stringify(
      {
        records: this.records,
        tasksByDate: this.tasksByDate,
        presets: this.presets,
        profile: this.profile,
        inventory: this.inventory,
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

// 研途健康数据中心：双轨持久化存储与历史任务档案服务
import { getTodayKey, safeJsonParse } from "./utils.js";
import { TIMETABLE_SLOTS, getTimetableCell } from "../data/timetableData.js";

const RECORDS_STORAGE_KEY = "grad_health_hub_records_v1";
const TASKS_STORAGE_KEY = "grad_health_hub_daily_tasks_v1";
const PRESETS_STORAGE_KEY = "grad_health_hub_quick_presets_v1";

const DEFAULT_PRESETS = [
  { id: "preset_run", title: "操场低心率慢跑3~4公里", time: "19:00~19:40", category: "sport", badge: "跑步心肺", details: "Zone 2配速，步频180，微喘能对话" },
  { id: "preset_badminton", title: "高校球馆羽毛球对抗90分钟", time: "19:00~20:30", category: "sport", badge: "羽球暴汗", details: "穿专业生胶底羽球鞋，打前热身7分钟" },
  { id: "preset_strength", title: "力量健身：上肢俯卧撑划船面拉", time: "19:00~19:45", category: "sport", badge: "力量抗阻", details: "面拉4组护肩袖，配合核心抗旋转" },
  { id: "preset_paper_read", title: "精读顶会论文1篇并做文献笔记", time: "14:00~15:30", category: "research", badge: "文献精读", details: "拆解Method创新点与实验对比设计" },
  { id: "preset_code_debug", title: "核心模型算法代码调试与跑数", time: "09:00~11:30", category: "research", badge: "实验实操", details: "关闭社交弹窗，专注45分钟番茄钟" },
  { id: "preset_meeting", title: "导师面对面沟通与组会汇报准备", time: "15:00~16:30", category: "research", badge: "组会汇报", details: "事实与情绪解耦，提炼关键讨论点" },
  { id: "preset_english", title: "学术英文写作词句积累与速读", time: "21:00~21:40", category: "growth", badge: "语言复利", details: "积累论文地道表达句式10条" },
  { id: "preset_desk_stretch", title: "工位颈椎下颌微回缩与胸肌拉伸", time: "全天随时", category: "habit", badge: "久坐抗瘫", details: "下颌回缩10次+门框拉伸30秒" }
];

class Store {
  constructor() {
    this.listeners = new Map();
    this.records = this.loadRecords();
    this.tasksByDate = this.loadTasks();
    this.presets = this.loadPresets();
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

  // 快捷常用任务模板库管理
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

  exportDataJson() {
    return JSON.stringify({ records: this.records, tasksByDate: this.tasksByDate, presets: this.presets, exportedAt: new Date().toISOString() }, null, 2);
  }

  importDataJson(jsonString) {
    const parsed = safeJsonParse(jsonString, null);
    if (parsed && typeof parsed === "object") {
      if (parsed.records) this.records = parsed.records;
      if (parsed.tasksByDate) this.tasksByDate = parsed.tasksByDate;
      if (parsed.presets) this.presets = parsed.presets;
      this.saveRecords();
      this.saveTasks();
      this.savePresets();
      this.emit("tasksChanged", this.getTasksForSelectedDate());
      this.emit("presetsChanged", this.presets);
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

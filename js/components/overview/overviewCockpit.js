// 工位极简顶栏状态模块 (Compact One-Screen Status Bar)
import { store } from "../../core/store.js";
import { getTodayKey, getTodayDisplay } from "../../core/utils.js";

export function renderOverviewCockpit() {
  const container = document.createElement("div");
  container.className = "bg-white dark:bg-slate-800 rounded-2xl px-4 py-2.5 sm:py-3 border border-slate-200/90 dark:border-slate-700/80 shadow-xs flex flex-wrap items-center justify-between gap-2.5 transition-all text-xs";

  const todayStr = getTodayKey();
  const tasks = store.getTasksForDate(todayStr);
  const totalCount = tasks.length;
  const doneCount = tasks.filter((t) => t.completed).length;
  const percent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
  const profile = store.getUserProfile();

  // 动态工位实时单行指引
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeVal = hour + minute / 60;

  let advice = "深度专注工作攻坚：开启45分钟无干扰专注块，坐姿挺直，分段小口补水。";
  if (timeVal >= 7.0 && timeVal < 8.5) {
    advice = "高蛋白控糖早餐时段：黑麦面包+纯牛奶+鸡蛋2个，平稳开启全天精力。";
  } else if (timeVal >= 8.5 && timeVal < 11.5) {
    advice = "上午高认知深度攻坚：皮质醇峰值期，攻坚最难架构与代码，避免多任务打扰。";
  } else if (timeVal >= 11.5 && timeVal < 12.75) {
    advice = `食堂控糖午餐：先吃菜肉后吃1拳米饭，自带高蛋白（${profile.diet?.lunchProtein || "鸡胸肉100g"}），下午不犯困。`;
  } else if (timeVal >= 12.75 && timeVal < 13.5) {
    advice = "黄金微午休（20分钟）：闭目清空脑内腺苷，随餐补充深海鱼油。";
  } else if (timeVal >= 13.5 && timeVal < 15.0) {
    advice = "午后黑咖啡与代码实操：饮用咖啡1杯。⚠️ 15:00咖啡因锁死红线前享用！";
  } else if (timeVal >= 15.0 && timeVal < 17.5) {
    advice = "下午攻坚：已过15:00严禁饮用咖啡因！工位做贴墙W-Y滑行拉伸背肌。";
  } else if (timeVal >= 17.5 && timeVal < 19.0) {
    advice = "晚餐轻量控能：蒸红薯150g+鸡胸肉+黄瓜，20:30后只饮清水。";
  } else if (timeVal >= 19.0 && timeVal < 21.0) {
    advice = "体能与运动释放：按课表执行慢跑/羽球/力量训练，释放脑力压力。";
  } else if (timeVal >= 21.0 && timeVal < 23.0) {
    advice = "晚间复盘备忘：梳理今日进展，远离蓝光屏幕，准备4-7-8呼吸放松。";
  } else {
    advice = "夜间深度修复：目标23:30熄灯，保障生长激素分泌与脑部代谢排毒。";
  }

  container.innerHTML = `
    <!-- 左侧：日期与个人模式 -->
    <div class="flex items-center space-x-2 shrink-0">
      <span class="font-bold text-slate-900 dark:text-white">${getTodayDisplay()}</span>
      <span class="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
        ${profile.stage || "自律模式"}
      </span>
    </div>

    <!-- 中部：紧凑实时工位单行提示 -->
    <div class="hidden md:flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 min-w-0 flex-1 truncate px-2">
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
      <span class="truncate font-medium text-[11px]">${advice}</span>
    </div>

    <!-- 右侧：今日闭环完成进度 -->
    <div class="flex items-center space-x-2.5 shrink-0 ml-auto">
      <div class="flex items-baseline space-x-1 text-slate-700 dark:text-slate-200">
        <span class="text-[11px] text-slate-400">今日完成</span>
        <span class="font-extrabold text-slate-900 dark:text-white font-mono">${doneCount}/${totalCount}</span>
        <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">(${percent}%)</span>
      </div>
      <div class="w-16 sm:w-20 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div class="h-full bg-emerald-500 rounded-full transition-all duration-300" style="width: ${percent}%;"></div>
      </div>
    </div>
  `;

  return container;
}

// 工位总览极简驾驶舱模块 (Overview Minimal Executive Cockpit)
import { store } from "../../core/store.js";
import { getTodayKey, getTodayDisplay } from "../../core/utils.js";

export function renderOverviewCockpit(onNavigate) {
  const container = document.createElement("div");
  container.className = "bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-700/80 shadow-xs space-y-3.5 transition-all";

  const todayStr = getTodayKey();
  const tasks = store.getTasksForDate(todayStr);
  const totalCount = tasks.length;
  const doneCount = tasks.filter((t) => t.completed).length;
  const percent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
  const profile = store.getUserProfile();

  // 动态推导当前工位实时指引
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeVal = hour + minute / 60;
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const dayName = weekdays[now.getDay()];

  let adviceText = "深度专注工作攻坚：开启45分钟无干扰专注块，坐姿挺直，小口补水。";

  if (timeVal >= 7.0 && timeVal < 8.5) {
    adviceText = "高蛋白控糖早餐：全黑麦面包2片 + 纯牛奶250ml + 鸡蛋2个，平稳唤醒全天代谢。";
  } else if (timeVal >= 8.5 && timeVal < 10.0) {
    adviceText = "上午高认知深度攻坚：皮质醇峰值期，攻坚核心业务与关键架构，专注45分钟番茄钟。";
  } else if (timeVal >= 10.0 && timeVal < 10.5) {
    adviceText = "工位间歇微伸展：原味坚果10~15g + 颈椎下颌微回缩10次，缓解用脑紧绷感。";
  } else if (timeVal >= 10.5 && timeVal < 11.5) {
    adviceText = "重点事项攻坚与汇报协同：事实与情绪解耦，提问题务必自带2个备选方案。";
  } else if (timeVal >= 11.5 && timeVal < 12.75) {
    adviceText = `食堂控糖执行：米饭1拳头 + 低油素菜2份 + 自带高蛋白（${profile.diet?.lunchProtein || "即食鸡胸肉100g"}），先吃菜肉后米饭。`;
  } else if (timeVal >= 12.75 && timeVal < 13.5) {
    adviceText = "黄金微午休（20~25分钟）：静卧闭目清空腺苷，防止深睡醒后头晕。随餐随水补充深海鱼油。";
  } else if (timeVal >= 13.5 && timeVal < 15.0) {
    adviceText = "午后黑咖啡与代码实操：饮用黑咖啡1杯（200~250ml）。⚠️ 15:00咖啡因锁死红线前享用，保护夜间深睡！";
  } else if (timeVal >= 15.0 && timeVal < 17.5) {
    adviceText = "下午实操推进与贴墙拉伸：已过15:00严禁饮用咖啡因！做贴墙W-Y滑行15次激活背肌。";
  } else if (timeVal >= 17.5 && timeVal < 18.75) {
    adviceText = "晚餐低GI控能：蒸红薯150g + 鸡胸肉100g + 黄瓜1根。睡前3小时严格禁食（20:30后只喝清水）。";
  } else if (timeVal >= 18.75 && timeVal < 20.75) {
    if (["周一", "周三", "周五"].includes(dayName)) {
      adviceText = "今日体能：力量抗阻训练（俯卧撑+划船+面拉护肩袖4组），为周末羽球扣杀筑牢基底。";
    } else if (["周二", "周四"].includes(dayName)) {
      adviceText = `今日体能：操场低心率慢跑 (${profile.exercise?.runDistanceKm || "4公里"})，Zone 2心率微喘能交谈，跑后小腿拉伸。`;
    } else if (dayName === "周六") {
      adviceText = `今日实战：球馆羽毛球对抗 (${profile.exercise?.badmintonDuration || "90分钟"})，穿专业生胶底羽球鞋，动态热身7分钟。`;
    } else {
      adviceText = "周日身心重启与主动排酸：户外慢走或阳光漫游，放下工作屏幕，重置身心状态。";
    }
  } else if (timeVal >= 20.75 && timeVal < 22.5) {
    adviceText = "晚间复盘与地道表达积累：沉淀关键技术心得，梳理明日核心待办3项。20:30后只饮清水。";
  } else if (timeVal >= 22.5 && timeVal < 23.5) {
    adviceText = "睡前降温与褪黑素保护：远离蓝光屏幕，做4-7-8呼吸法3组，目标23:30准时熄灯安睡。";
  } else {
    adviceText = "深度睡眠与脑部排毒：保持黑暗静谧环境，生长激素分泌，明天继续高效掌控全天！";
  }

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="space-y-0.5">
        <div class="flex items-center space-x-2">
          <span class="text-xs text-slate-400 font-mono">${getTodayDisplay()}</span>
          <span class="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
            ${profile.stage || "工位自律模式"}
          </span>
        </div>
        <h2 class="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          今日专注执行与遵守看板
        </h2>
      </div>

      <!-- 紧凑完成进度条与任务管理入口 -->
      <div class="flex items-center space-x-3 shrink-0">
        <div class="text-right space-y-0.5">
          <div class="text-xs font-bold text-slate-900 dark:text-white">
            <span>今日闭环 </span>
            <span class="text-emerald-600 dark:text-emerald-400 font-extrabold">${doneCount}/${totalCount}</span>
            <span class="text-[11px] text-slate-400 font-normal"> (${percent}%)</span>
          </div>
          <div class="w-24 sm:w-28 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div class="h-full bg-emerald-500 rounded-full transition-all duration-300" style="width: ${percent}%;"></div>
          </div>
        </div>

        <button id="overview-go-manage-tasks" class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-650 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-all flex items-center space-x-1" title="跳转至每日规划工作台新增、修改或配置任务">
          <span>⚙️ 规划与增改</span>
          <span>➔</span>
        </button>
      </div>
    </div>

    <!-- 极简工位贴心建议单行条 -->
    <div class="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-750/40 border border-slate-100 dark:border-slate-700/50 flex items-center space-x-2 text-xs">
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
      <span class="font-medium text-slate-600 dark:text-slate-300 truncate">
        ${adviceText}
      </span>
    </div>
  `;

  container.querySelector("#overview-go-manage-tasks")?.addEventListener("click", () => {
    onNavigate("daily");
  });

  return container;
}

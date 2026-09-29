// 主页面快速查看核心规程卡片 (Diet, Workout & Pantry Quick Look Cards)
import { store } from "../../core/store.js";
import { renderInventoryModal } from "../inventory/inventoryModal.js";

export function renderOverviewFocusCards(onNavigate) {
  const container = document.createElement("div");
  container.className = "space-y-4";

  const lowStockItems = store.getLowStockItems();
  const profile = store.getUserProfile();

  // 根据当前周几动态推导今日体能方案
  const now = new Date();
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const dayName = weekdays[now.getDay()];

  let workoutTitle = "力量抗阻训练日（护肩固膝）";
  let workoutBadge = "力量抗阻";
  let workoutDesc = "俯卧撑×4组 + 坐姿划船×4组 + 面拉(护肩袖)×4组 + 核心死虫式。为周末羽球击球筑牢肩胛基底。";
  let workoutTarget = "时长约45分钟 · 训练后30分钟补充25g优质蛋白";
  let workoutTagClass = "bg-amber-500 text-white";

  if (dayName === "周二" || dayName === "周四") {
    workoutTitle = `操场低心率慢跑日 (${profile.exercise?.runDistanceKm || "4公里"})`;
    workoutBadge = "Zone 2 有氧";
    workoutDesc = "操场刷圈，控制步频180，全脚掌滚动着地。微喘能交谈状态，有效激活线粒体并刷脂。";
    workoutTarget = "时长约30~35分钟 · 跑后小腿腓肠肌/比目鱼肌拉伸各30秒";
    workoutTagClass = "bg-emerald-600 text-white";
  } else if (dayName === "周六") {
    workoutTitle = `球馆羽毛球实战对抗 (${profile.exercise?.badmintonDuration || "90分钟"})`;
    workoutBadge = "羽球实战";
    workoutDesc = "穿专业生胶底羽球鞋！赛前7分钟动态热身唤醒脚踝膝盖，对抗拉吊突击，释放全周脑力压力。";
    workoutTarget = "高燃耗能约650~750大卡 · 等效跑步8.2公里 · 补充水分1000ml+";
    workoutTagClass = "bg-indigo-600 text-white";
  } else if (dayName === "周日") {
    workoutTitle = "主动身心重启与户外排酸";
    workoutBadge = "主动恢复";
    workoutDesc = "公园阳光漫游或草地散步，放松中枢神经系统与视神经。彻底放下屏幕，享受微风阳光。";
    workoutTarget = "时长约40分钟 · 慢节奏拉伸 · 重置皮质醇节律";
    workoutTagClass = "bg-slate-600 text-white";
  }

  container.innerHTML = `
    ${lowStockItems.length > 0 ? `
      <!-- 常吃食材储备预警通栏 -->
      <div id="overview-inventory-alert-bar" class="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-300/80 dark:border-amber-800/60 flex items-center justify-between gap-3 cursor-pointer hover:bg-amber-500/15 transition-all">
        <div class="flex items-center space-x-3">
          <span class="text-xl sm:text-2xl animate-bounce">🛒</span>
          <div>
            <div class="text-xs sm:text-sm font-black text-amber-900 dark:text-amber-200 flex items-center space-x-2">
              <span>常吃食材储备告急</span>
              <span class="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">${lowStockItems.length}项见底</span>
            </div>
            <p class="text-[11px] sm:text-xs text-amber-700 dark:text-amber-400 mt-0.5">
              ${lowStockItems.slice(0, 3).map((i) => `${i.name}仅剩${i.stock}${i.unit}`).join("、")}已低于安全线，点击一键查看采买清单。
            </p>
          </div>
        </div>
        <button class="shrink-0 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs shadow-sm transition-all">
          补货清单 ➔
        </button>
      </div>
    ` : ""}

    <!-- 饮食与运动两大核心维度快速卡片并列 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- 1. 营养饮食快速卡片 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-700/80 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-600 transition-all">
        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="text-lg">🥗</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">今日营养与控糖饮食</h3>
            </div>
            <span class="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              控糖黄金序
            </span>
          </div>

          <div class="space-y-1.5 text-xs">
            <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-750/50 border border-slate-100 dark:border-slate-700/60">
              <div class="font-bold text-slate-800 dark:text-slate-100 flex justify-between">
                <span>早餐：全黑麦面包2片 + 纯牛奶250ml + 鸡蛋2个</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">~28g蛋白</span>
              </div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">平稳血糖波动，蛋黄供给胆碱保障脑力注意力。</p>
            </div>

            <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-750/50 border border-slate-100 dark:border-slate-700/60">
              <div class="font-bold text-slate-800 dark:text-slate-100 flex justify-between">
                <span>午餐：食堂1拳米饭 + 2份蔬菜 + 开自带鸡胸肉</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">~35g蛋白</span>
              </div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">清汤涮去浮油，先吃菜肉再吃饭，下午绝不发困。</p>
            </div>

            <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-750/50 border border-slate-100 dark:border-slate-700/60">
              <div class="font-bold text-slate-800 dark:text-slate-100 flex justify-between">
                <span>加餐与节律：15:00咖啡因锁死 + 晚餐150g薯类</span>
                <span class="text-amber-600 dark:text-amber-400 font-mono text-[11px]">低GI控能</span>
              </div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">晚间20:30后只饮清水，保障睡眠深睡期生长激素分泌。</p>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
          <button id="overview-jump-diet-btn" class="font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center space-x-1">
            <span>查看完整饮食方案与外卖指南</span>
            <span>➔</span>
          </button>
          <button id="overview-jump-sub-tool-btn" class="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 font-medium">
            食材平替器
          </button>
        </div>
      </div>

      <!-- 2. 运动与体能快速卡片 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-700/80 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-600 transition-all">
        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="text-lg">🏋️</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">今日体能与运动规程</h3>
            </div>
            <span class="text-[11px] font-bold px-2 py-0.5 rounded-md ${workoutTagClass}">
              ${workoutBadge}
            </span>
          </div>

          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-750/50 border border-slate-100 dark:border-slate-700/60 space-y-2">
            <div>
              <div class="text-xs font-bold text-slate-900 dark:text-slate-100">${workoutTitle}</div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">${workoutDesc}</p>
            </div>
            <div class="text-[11px] text-amber-700 dark:text-amber-300/90 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg font-medium">
              🎯 ${workoutTarget}
            </div>
          </div>

          <!-- 3+2运动互通说明 -->
          <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-750/30 border border-slate-100 dark:border-slate-700/40 text-xs">
            <div class="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
              <span>🏸 羽球与慢跑替换法则</span>
              <span class="text-[11px] text-indigo-500 font-medium">90分羽球 ≈ 8.2km有氧跑</span>
            </div>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              周末约球打满90分钟即可无缝替代当周1次慢跑；力量训练专注核心抗旋转与面拉护肩，为扣杀筑牢基底。
            </p>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
          <button id="overview-jump-workout-btn" class="font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center space-x-1">
            <span>查看完整动作与羽球方案</span>
            <span>➔</span>
          </button>
          <button id="overview-jump-badminton-btn" class="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-medium">
            羽球记分能耗器
          </button>
        </div>
      </div>
    </div>
  `;

  // 绑定事件
  container.querySelector("#overview-jump-diet-btn")?.addEventListener("click", () => {
    onNavigate("plans", "diet_plan");
  });

  container.querySelector("#overview-jump-sub-tool-btn")?.addEventListener("click", () => {
    onNavigate("tools", "substitute_tool");
  });

  container.querySelector("#overview-jump-workout-btn")?.addEventListener("click", () => {
    onNavigate("plans", "fitness_plan");
  });

  container.querySelector("#overview-jump-badminton-btn")?.addEventListener("click", () => {
    onNavigate("tools", "badminton_tool");
  });

  container.querySelector("#overview-inventory-alert-bar")?.addEventListener("click", () => {
    renderInventoryModal();
  });

  return container;
}

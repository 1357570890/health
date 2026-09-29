// 工位高脑力者专属 TDEE 与三大营养素精准换算计算器
import { showToast } from "../../core/utils.js";

export function renderMacroTdeeTool() {
  const container = document.createElement("div");
  container.className = "space-y-6";

  let weight = 70;
  let height = 175;
  let age = 24;
  let gender = "male";
  let goal = "maintain"; // 'cut' | 'maintain' | 'bulk'

  function calculate() {
    // 经典 Mifflin-St Jeor 基础代谢公式
    const bmr = gender === "male"
      ? Math.round(10 * weight + 6.25 * height - 5 * age + 5)
      : Math.round(10 * weight + 6.25 * height - 5 * age - 161);

    // 工位坐班 + 3次力量 + 2次跑步 + 1次羽毛球：活动乘数约为 1.50~1.55
    const activityFactor = 1.52;
    const tdee = Math.round(bmr * activityFactor);

    // 目标热量微调
    let targetCalories = tdee;
    if (goal === "cut") targetCalories = Math.round(tdee - 350); // 温和刷脂赤字
    if (goal === "bulk") targetCalories = Math.round(tdee + 250); // 洁净增肌盈余

    // 蛋白质配比：运动自律人群 1.6g ~ 1.8g / kg
    const proteinGrams = Math.round(weight * 1.6);
    const proteinCal = proteinGrams * 4;

    // 优质脂肪：占总热量 25%
    const fatCal = Math.round(targetCalories * 0.25);
    const fatGrams = Math.round(fatCal / 9);

    // 复合碳水：剩余全部给碳水化合物（保障脑力高强度运转与羽球瞬时爆发力）
    const carbCal = Math.max(0, targetCalories - proteinCal - fatCal);
    const carbGrams = Math.round(carbCal / 4);

    // 推荐饮水量：体重(kg) * 35~40ml
    const waterTarget = Math.round(weight * 36);

    return { bmr, tdee, targetCalories, proteinGrams, fatGrams, carbGrams, waterTarget };
  }

  function render() {
    const res = calculate();

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <!-- 头部 -->
        <div class="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-700/60 pb-4">
          <div class="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-md shadow-emerald-600/20">
            ⚖️
          </div>
          <div>
            <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white">工位脑力与体能总消耗 (TDEE) 与三大营养素计算器</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">结合久坐工位特征与每周 3+2 运动，计算每日蛋白质与碳水精确克数</p>
          </div>
        </div>

        <!-- 参数输入区 -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label class="block font-bold text-slate-600 dark:text-slate-300 mb-1">体重 (kg)</label>
            <input type="number" id="tdee-weight" value="${weight}" min="40" max="150" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-750 font-bold text-sm" />
          </div>
          <div>
            <label class="block font-bold text-slate-600 dark:text-slate-300 mb-1">身高 (cm)</label>
            <input type="number" id="tdee-height" value="${height}" min="140" max="210" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-750 font-bold text-sm" />
          </div>
          <div>
            <label class="block font-bold text-slate-600 dark:text-slate-300 mb-1">年龄 (岁)</label>
            <input type="number" id="tdee-age" value="${age}" min="16" max="90" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-750 font-bold text-sm" />
          </div>
          <div>
            <label class="block font-bold text-slate-600 dark:text-slate-300 mb-1">当前身心目标</label>
            <select id="tdee-goal" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-750 font-bold text-sm">
              <option value="maintain" ${goal === "maintain" ? "selected" : ""}>维持稳态精力 (平衡)</option>
              <option value="cut" ${goal === "cut" ? "selected" : ""}>健康温和控脂 (-350kcal)</option>
              <option value="bulk" ${goal === "bulk" ? "selected" : ""}>体能强化储备 (+250kcal)</option>
            </select>
          </div>
        </div>

        <!-- 核心代谢推导结果卡片 -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200/80 dark:border-slate-700">
            <span class="text-xs font-bold text-slate-400 block mb-1">基础代谢 (BMR)</span>
            <div class="flex items-baseline space-x-1.5">
              <span class="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 font-mono">${res.bmr}</span>
              <span class="text-xs text-slate-500">kcal/天</span>
            </div>
            <p class="text-[10px] text-slate-400 mt-1">完全静止不动维持器官存活的最低热量底线</p>
          </div>

          <div class="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
            <span class="text-xs font-bold text-emerald-800 dark:text-emerald-300 block mb-1">每日总能量消耗 (TDEE)</span>
            <div class="flex items-baseline space-x-1.5">
              <span class="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-300 font-mono">${res.tdee}</span>
              <span class="text-xs text-emerald-600">kcal/天</span>
            </div>
            <p class="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">工位坐班叠加 3+2 运动后的真实全天总热量</p>
          </div>

          <div class="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800">
            <span class="text-xs font-bold text-indigo-800 dark:text-indigo-300 block mb-1">目标摄入热量</span>
            <div class="flex items-baseline space-x-1.5">
              <span class="text-2xl sm:text-3xl font-black text-indigo-700 dark:text-indigo-300 font-mono">${res.targetCalories}</span>
              <span class="text-xs text-indigo-600">kcal/天</span>
            </div>
            <p class="text-[10px] text-indigo-600 dark:text-indigo-400 mt-1">达成当前目标推荐每日摄入的目标线</p>
          </div>
        </div>

        <!-- 三大营养素克数精确切分 -->
        <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 text-white space-y-4 shadow-lg">
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 class="text-sm font-bold flex items-center space-x-2">
              <span>🎯</span>
              <span>每日三大营养素精准目标克数</span>
            </h4>
            <span class="text-xs text-indigo-300 font-mono">建议全天纯净饮水: ${res.waterTarget} ml</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <!-- 蛋白质 -->
            <div class="p-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-emerald-300">🥩 纯蛋白质</span>
                <span class="text-xs font-bold font-mono text-emerald-400">${res.proteinGrams} g</span>
              </div>
              <p class="text-[11px] text-slate-300 leading-relaxed">
                按 1.6g/kg 严格保证。相当于：<span class="text-white font-bold">2个水煮蛋 + 1盒牛奶 + 2包即食鸡胸肉</span>
              </p>
            </div>

            <!-- 复合碳水 -->
            <div class="p-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-amber-300">🍞 复合碳水</span>
                <span class="text-xs font-bold font-mono text-amber-400">${res.carbGrams} g</span>
              </div>
              <p class="text-[11px] text-slate-300 leading-relaxed">
                保障大脑高认知运转与羽球冲刺。黑麦面包、燕麦与蒸红薯为主，拒绝精制糖。
              </p>
            </div>

            <!-- 优质脂肪 -->
            <div class="p-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-sky-300">🥑 优质脂肪</span>
                <span class="text-xs font-bold font-mono text-sky-400">${res.fatGrams} g</span>
              </div>
              <p class="text-[11px] text-slate-300 leading-relaxed">
                维持内分泌与细胞膜流动性。深海鱼油Omega-3、每日坚果与蛋黄纯净摄入。
              </p>
            </div>
          </div>

          <button id="save-macro-to-profile" class="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-sm active:scale-95">
            <span>📥 设定为今日全天营养目标 (${res.targetCalories} kcal · 蛋白质 ${res.proteinGrams}g)</span>
          </button>
        </div>
      </div>
    `;

    container.querySelector("#save-macro-to-profile")?.addEventListener("click", () => {
      store.updateUserProfile({
        targetCalories: res.targetCalories,
        proteinTarget: res.proteinGrams,
        waterTarget: res.waterTarget
      });
      playGentleChime(784, 0.2);
      showToast(`✓ 已成功将全天目标同步设定为 ${res.targetCalories} kcal！`);
    });

    // 绑定事件
    ["tdee-weight", "tdee-height", "tdee-age"].forEach((id) => {
      container.querySelector("#" + id)?.addEventListener("input", (e) => {
        const val = Number(e.target.value);
        if (id === "tdee-weight") weight = val;
        if (id === "tdee-height") height = val;
        if (id === "tdee-age") age = val;
        render();
      });
    });

    container.querySelector("#tdee-goal")?.addEventListener("change", (e) => {
      goal = e.target.value;
      render();
      showToast("已更新身心热量与营养目标！");
    });
  }

  render();
  return container;
}

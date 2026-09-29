// 羽毛球专项工具：能耗与脱水测算器 + 场上双打对抗记分板
import { playGentleChime, showToast } from "../../core/utils.js";

export function renderBadmintonTool() {
  const container = document.createElement("div");
  container.className = "space-y-6";

  // 内部状态
  let activeTab = "score"; // 'score' | 'calc'
  let scoreA = 0;
  let scoreB = 0;
  let matchMinutes = 0;
  let timerInterval = null;

  function render() {
    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <!-- 头部 -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700/60 pb-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-md shadow-amber-500/20">
              🏸
            </div>
            <div>
              <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white">羽毛球专项竞技与能耗工具</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">场上大字号双打记分板 · 击球能耗与脱水补液精准测算</p>
            </div>
          </div>

          <!-- 子模式切换 -->
          <div class="flex items-center bg-slate-100 dark:bg-slate-700 p-1 rounded-2xl text-xs font-bold">
            <button id="tab-score-btn" class="px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === "score" ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400"
            }">
              🏆 比赛记分板
            </button>
            <button id="tab-calc-btn" class="px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === "calc" ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400"
            }">
              🔥 能耗与补液换算
            </button>
          </div>
        </div>

        <!-- 模式一：双打对抗比赛记分板 -->
        ${activeTab === "score" ? `
          <div class="space-y-5">
            <!-- 比赛状态与发球提示 -->
            <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200/80 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div class="flex items-center space-x-2">
                <span class="w-2.5 h-2.5 rounded-full ${timerInterval ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}"></span>
                <span class="font-bold text-slate-700 dark:text-slate-300">比赛计时：<span id="match-timer-display" class="font-mono text-sm">${formatTime(matchMinutes)}</span></span>
              </div>
              <div class="text-slate-500 dark:text-slate-400">
                发球区规则：<span class="font-bold text-amber-600 dark:text-amber-400">${(scoreA + scoreB) % 2 === 0 ? "👉 右半区发球 (偶数分)" : "👈 左半区发球 (奇数分)"}</span>
              </div>
              <div class="flex items-center space-x-2">
                <button id="toggle-match-timer-btn" class="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-650 hover:bg-slate-300 font-bold">
                  ${timerInterval ? "暂停比赛" : "开始计时"}
                </button>
                <button id="reset-score-btn" class="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold">
                  重置比分
                </button>
              </div>
            </div>

            <!-- 双方大比分点击板 -->
            <div class="grid grid-cols-2 gap-3 sm:gap-6">
              <!-- 我方/队伍A -->
              <div class="bg-gradient-to-br from-emerald-50 to-teal-100/60 dark:from-emerald-950/30 dark:to-teal-900/30 rounded-3xl p-5 sm:p-7 border border-emerald-300 dark:border-emerald-800 text-center space-y-3">
                <span class="text-xs font-bold text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                  我方 / Team A
                </span>
                <div id="score-a-display" class="text-6xl sm:text-8xl font-black font-mono text-emerald-700 dark:text-emerald-300 select-none py-2 cursor-pointer hover:scale-105 active:scale-95 transition-transform" title="点击 +1 分">
                  ${scoreA}
                </div>
                <div class="flex justify-center space-x-2">
                  <button id="sub-a-btn" class="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-lg hover:bg-slate-100 active:scale-90 shadow-sm">-1</button>
                  <button id="add-a-btn" class="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md shadow-emerald-600/30 active:scale-95 transition-all">+1 得分</button>
                </div>
              </div>

              <!-- 对手/队伍B -->
              <div class="bg-gradient-to-br from-indigo-50 to-blue-100/60 dark:from-indigo-950/30 dark:to-blue-900/30 rounded-3xl p-5 sm:p-7 border border-indigo-300 dark:border-indigo-800 text-center space-y-3">
                <span class="text-xs font-bold text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                  对手 / Team B
                </span>
                <div id="score-b-display" class="text-6xl sm:text-8xl font-black font-mono text-indigo-700 dark:text-indigo-300 select-none py-2 cursor-pointer hover:scale-105 active:scale-95 transition-transform" title="点击 +1 分">
                  ${scoreB}
                </div>
                <div class="flex justify-center space-x-2">
                  <button id="sub-b-btn" class="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-lg hover:bg-slate-100 active:scale-90 shadow-sm">-1</button>
                  <button id="add-b-btn" class="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md shadow-indigo-600/30 active:scale-95 transition-all">+1 得分</button>
                </div>
              </div>
            </div>

            <!-- 关键节点提醒卡片 -->
            <div class="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span>💡</span>
                <span>${getMatchTip(scoreA, scoreB)}</span>
              </div>
              <span class="font-bold text-[11px] text-amber-600">标准21分制 (30分封顶)</span>
            </div>
          </div>
        ` : `
          <!-- 模式二：能耗与出汗补水计算器 -->
          <div class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">您的体重 (kg)</label>
                <input type="number" id="calc-weight" value="70" min="40" max="150" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-750 font-bold text-sm" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">打球总时长 (分钟)</label>
                <input type="number" id="calc-duration" value="90" min="15" max="300" step="15" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-750 font-bold text-sm" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">对抗强度 / 模式</label>
                <select id="calc-intensity" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-750 font-bold text-sm">
                  <option value="7.0">双打战术比赛 (中高间歇，MET 7.0)</option>
                  <option value="9.5">单打激烈对抗 (高燃爆发，MET 9.5)</option>
                  <option value="5.5">定点多球与热身拉拉 (低负荷，MET 5.5)</option>
                </select>
              </div>
            </div>

            <!-- 实时推导计算看板 -->
            <div id="calc-results-mount" class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <!-- 动态注入结果 -->
            </div>

            <!-- 羽球装备与球线磅数指南 -->
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200/80 dark:border-slate-700 space-y-2 text-xs">
              <h4 class="font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-1.5">
                <span>🏸</span>
                <span>羽毛球球线磅数与打法匹配建议</span>
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] text-slate-600 dark:text-slate-300">
                <div class="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                  <span class="font-bold text-emerald-600 block mb-1">🟢 24~25磅 (黄金护腕磅数)</span>
                  弹性大、借力轻松、甜区大；强效吸收击球震动，保护手腕与肩袖，不易断线。
                </div>
                <div class="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                  <span class="font-bold text-amber-600 block mb-1">🟡 26~27磅 (进阶控球磅数)</span>
                  击球音清脆，出球指向精准，杀球初速快，适合具备规范发力习惯的球友。
                </div>
                <div class="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                  <span class="font-bold text-rose-600 block mb-1">🔴 28磅以上 (专业高磅)</span>
                  对小臂内旋和手指发力爆发力要求极高；发力不当极易损伤肘关节韧带与手腕三角软骨。
                </div>
              </div>
            </div>
          </div>
        `}
      </div>
    `;

    // 绑定事件
    container.querySelector("#tab-score-btn")?.addEventListener("click", () => {
      activeTab = "score";
      render();
    });
    container.querySelector("#tab-calc-btn")?.addEventListener("click", () => {
      activeTab = "calc";
      render();
      updateCalcs();
    });

    if (activeTab === "score") {
      container.querySelector("#add-a-btn")?.addEventListener("click", () => addScore("A", 1));
      container.querySelector("#score-a-display")?.addEventListener("click", () => addScore("A", 1));
      container.querySelector("#sub-a-btn")?.addEventListener("click", () => addScore("A", -1));

      container.querySelector("#add-b-btn")?.addEventListener("click", () => addScore("B", 1));
      container.querySelector("#score-b-display")?.addEventListener("click", () => addScore("B", 1));
      container.querySelector("#sub-b-btn")?.addEventListener("click", () => addScore("B", -1));

      container.querySelector("#reset-score-btn")?.addEventListener("click", () => {
        if (confirm("确定重置当前比分？")) {
          scoreA = 0;
          scoreB = 0;
          render();
        }
      });

      container.querySelector("#toggle-match-timer-btn")?.addEventListener("click", () => {
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        } else {
          timerInterval = setInterval(() => {
            matchMinutes += 1;
            const el = container.querySelector("#match-timer-display");
            if (el) el.textContent = formatTime(matchMinutes);
          }, 1000);
        }
        render();
      });
    } else {
      ["calc-weight", "calc-duration", "calc-intensity"].forEach((id) => {
        container.querySelector("#" + id)?.addEventListener("input", updateCalcs);
      });
      updateCalcs();
    }
  }

  function addScore(team, delta) {
    if (team === "A") scoreA = Math.max(0, Math.min(30, scoreA + delta));
    if (team === "B") scoreB = Math.max(0, Math.min(30, scoreB + delta));
    playGentleChime(delta > 0 ? 659.25 : 329.63, 0.1);

    if (scoreA === 11 || scoreB === 11) showToast("🔔 达到11分！建议双方交换场地与饮水补液！");
    if (scoreA >= 20 || scoreB >= 20) {
      if (Math.abs(scoreA - scoreB) >= 2 || scoreA === 30 || scoreB === 30) {
        showToast(`🎉 比赛结束！${scoreA > scoreB ? "我方 Team A 获胜" : "对手 Team B 获胜"}！`);
      }
    }
    render();
  }

  function updateCalcs() {
    const w = Number(container.querySelector("#calc-weight")?.value) || 70;
    const durMin = Number(container.querySelector("#calc-duration")?.value) || 90;
    const met = Number(container.querySelector("#calc-intensity")?.value) || 7.0;

    // 经典运动代谢公式：Calories = MET * Weight(kg) * (Duration/60)
    const calories = Math.round(met * w * (durMin / 60));
    // 出汗量估算：约 10~15ml / kg / 小时
    const sweatMl = Math.round((durMin / 60) * w * 12);
    // 等效操场4公里低心率慢跑圈数 (4公里约消耗 280~320大卡)
    const equivalentKm = (calories / 70).toFixed(1);
    const avgBpm = met > 8 ? "150~175 bpm (高强度)" : "135~155 bpm (中高强度)";

    const mount = container.querySelector("#calc-results-mount");
    if (mount) {
      mount.innerHTML = `
        <div class="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-center">
          <span class="text-[11px] font-bold text-amber-800 dark:text-amber-300 block">🔥 净消耗热量</span>
          <span class="text-2xl font-black text-amber-700 dark:text-amber-300 font-mono">${calories}</span>
          <span class="text-[10px] text-amber-600 block">千卡 (kcal)</span>
        </div>
        <div class="p-3.5 rounded-2xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800 text-center">
          <span class="text-[11px] font-bold text-sky-800 dark:text-sky-300 block">💧 预估出汗脱水</span>
          <span class="text-2xl font-black text-sky-700 dark:text-sky-300 font-mono">${sweatMl}</span>
          <span class="text-[10px] text-sky-600 block">ml (建议分段补齐)</span>
        </div>
        <div class="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-center">
          <span class="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block">🏃 等效慢跑里程</span>
          <span class="text-2xl font-black text-emerald-700 dark:text-emerald-300 font-mono">${equivalentKm}</span>
          <span class="text-[10px] text-emerald-600 block">公里 (Zone 2)</span>
        </div>
        <div class="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 text-center">
          <span class="text-[11px] font-bold text-indigo-800 dark:text-indigo-300 block">💓 预期平均心率</span>
          <span class="text-xs font-black text-indigo-700 dark:text-indigo-300 block mt-2">${avgBpm}</span>
          <span class="text-[10px] text-indigo-500 block mt-1">间歇无氧为主</span>
        </div>
      `;
    }
  }

  function getMatchTip(a, b) {
    if (a === 0 && b === 0) return "比赛准备就绪，任意点击数字或得分按钮开始计分！";
    if (a === 11 || b === 11) return "🚨 11分技术间歇：交换场地，抓紧喝两口电解质水！";
    if (a >= 20 && b >= 20) return "⚡ 进入追平加分阶段（需领先2分获胜，30分封顶）！";
    if (a === 20 || b === 20) return "🔥 局点（Game Point）！发接发保持专注！";
    return `当前总分 ${a + b} 分，注意体能分配与脚下侧滑步防崴脚。`;
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  render();
  return container;
}

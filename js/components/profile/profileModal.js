// 研途个人生活档案与专属偏好设置模态框
import { store } from "../../core/store.js";
import { syncService } from "../../core/syncService.js";
import { playGentleChime } from "../../core/utils.js";

export function renderProfileModal() {
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150";
  modal.style.cssText = "position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100vw !important; height: 100vh !important; z-index: 9999 !important; display: flex !important; align-items: center !important; justify-content: center !important;";

  const profile = store.getUserProfile();

  modal.innerHTML = `
    <div class="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-700 shadow-xl space-y-5 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
        <div>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">
            个人专属偏好与工位档案
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">系统将依据此配置动态计算专属提醒与计划</p>
        </div>
        <button id="close-profile-btn" class="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <form id="profile-form" class="space-y-4 text-xs">
        <!-- 身份阶段 -->
        <div class="space-y-1.5">
          <label class="block font-semibold text-slate-700 dark:text-slate-300">当前身份状态</label>
          <input type="text" id="prof-stage" value="${profile.stage || "在读研究生（工位坐班模式·无课程）"}" class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white">
        </div>

        <!-- 饮食配置 -->
        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200/70 dark:border-slate-700/60 space-y-3">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">控糖饮食标配参数</span>
          <div class="space-y-1">
            <label class="block text-slate-500 dark:text-slate-400">午餐自带高蛋白首选</label>
            <select id="prof-protein" class="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200">
              <option value="即食鸡胸肉100g" ${profile.diet?.lunchProtein === "即食鸡胸肉100g" ? "selected" : ""}>即食鸡胸肉100g（随拆随吃）</option>
              <option value="原味酱牛肉70g" ${profile.diet?.lunchProtein === "原味酱牛肉70g" ? "selected" : ""}>原味酱牛肉70g（耐饥抗饿）</option>
              <option value="水浸金枪鱼罐头1罐" ${profile.diet?.lunchProtein === "水浸金枪鱼罐头1罐" ? "selected" : ""}>水浸金枪鱼罐头1罐（DHA与高蛋白）</option>
              <option value="去皮卤鸡腿1个" ${profile.diet?.lunchProtein === "去皮卤鸡腿1个" ? "selected" : ""}>去皮卤鸡腿1个（剥皮去油）</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-500 dark:text-slate-400">咖啡因摄入截止时间</label>
              <input type="text" id="prof-coffee-cutoff" value="${profile.diet?.coffeeCutoff || "15:00"}" placeholder="15:00" class="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200">
            </div>
            <div>
              <label class="block text-slate-500 dark:text-slate-400">晚餐晚间禁食线</label>
              <input type="text" id="prof-fasting-cutoff" value="${profile.diet?.fastingCutoff || "20:30"}" placeholder="20:30" class="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200">
            </div>
          </div>
        </div>

        <!-- 体能与运动配置 -->
        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200/70 dark:border-slate-700/60 space-y-3">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">3+2体能与羽球配置</span>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-500 dark:text-slate-400">操场慢跑目标里程</label>
              <input type="text" id="prof-run-distance" value="${profile.exercise?.runDistanceKm || "4公里"}" placeholder="4公里" class="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200">
            </div>
            <div>
              <label class="block text-slate-500 dark:text-slate-400">羽毛球单次时长</label>
              <input type="text" id="prof-badminton-duration" value="${profile.exercise?.badmintonDuration || "90分钟"}" placeholder="90分钟" class="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200">
            </div>
          </div>
        </div>

        <!-- 睡眠作息与补水 -->
        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200/70 dark:border-slate-700/60 space-y-3">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">工位作息与补水目标</span>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-500 dark:text-slate-400">全天饮水目标</label>
              <input type="text" id="prof-water-target" value="${profile.routine?.waterDaily || "2000ml (8杯)"}" placeholder="2000ml" class="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200">
            </div>
            <div>
              <label class="block text-slate-500 dark:text-slate-400">目标熄灯就寝时间</label>
              <input type="text" id="prof-sleep-time" value="${profile.routine?.sleepTarget || "23:30 (5个周期)"}" placeholder="23:30" class="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200">
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-2.5 pt-2">
          <button type="button" id="cancel-profile-btn" class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
            取消
          </button>
          <button type="submit" class="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm">
            保存并立即生效
          </button>
        </div>
      </form>
    </div>
  `;

  const close = () => modal.remove();
  modal.querySelector("#close-profile-btn")?.addEventListener("click", close);
  modal.querySelector("#cancel-profile-btn")?.addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  const form = modal.querySelector("#profile-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const stage = modal.querySelector("#prof-stage").value.trim();
    const protein = modal.querySelector("#prof-protein").value;
    const coffeeCutoff = modal.querySelector("#prof-coffee-cutoff").value.trim();
    const fastingCutoff = modal.querySelector("#prof-fasting-cutoff").value.trim();
    const runDistance = modal.querySelector("#prof-run-distance").value.trim();
    const badmintonDuration = modal.querySelector("#prof-badminton-duration").value.trim();
    const waterTarget = modal.querySelector("#prof-water-target").value.trim();
    const sleepTime = modal.querySelector("#prof-sleep-time").value.trim();

    store.updateUserProfile({
      stage,
      diet: {
        ...profile.diet,
        lunchProtein: protein,
        coffeeCutoff,
        fastingCutoff
      },
      exercise: {
        ...profile.exercise,
        runDistanceKm: runDistance,
        badmintonDuration
      },
      routine: {
        ...profile.routine,
        waterDaily: waterTarget,
        sleepTarget: sleepTime
      }
    });

    // 触发云同步
    if (syncService.isConfigured()) {
      syncService.pushToCloud();
    }
    playGentleChime(784, 0.15);
    close();
  });

  return modal;
}

// 常吃食材与补剂储备管理 & 补货预警弹窗组件
import { store } from "../../core/store.js";
import { showToast } from "../../core/utils.js";

export function renderInventoryModal() {
  const existing = document.getElementById("inventory-modal-backdrop");
  if (existing) existing.remove();

  const backdrop = document.createElement("div");
  backdrop.id = "inventory-modal-backdrop";
  backdrop.className = "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in";
  backdrop.style.cssText = "position: fixed; inset: 0px; z-index: 50;";

  let activeCategory = "all";

  function renderContent() {
    const items = store.getInventory();
    const lowStockItems = store.getLowStockItems();
    const categories = ["all", "优质蛋白", "健康主食", "乳品饮品", "轻食果蔬", "核心补剂", "工位补给"];

    const filtered = activeCategory === "all"
      ? items
      : items.filter((i) => i.category === activeCategory);

    backdrop.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col animate-scale-up" onclick="event.stopPropagation()">
        <!-- 头部 -->
        <div class="p-5 sm:p-6 bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 text-white flex items-center justify-between">
          <div>
            <div class="flex items-center space-x-2 text-xs text-emerald-200 font-semibold mb-1">
              <span>🛒 生活物资管理</span>
              <span>•</span>
              <span class="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[10px]">
                ${lowStockItems.length > 0 ? `🚨 ${lowStockItems.length}件急需补货` : "🟢 储备状态健康"}
              </span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black">常吃食材储备与补货提醒</h2>
            <p class="text-xs text-emerald-100 mt-1">
              自动追踪高频食材与补剂存量，吃完随手扣减，见底智能预警，一键生成采买清单。
            </p>
          </div>
          <button id="close-inventory-btn" class="p-2 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 顶部操作条：分类筛选与采买单生成 -->
        <div class="p-4 bg-slate-50 dark:bg-slate-750/50 border-b border-slate-200/80 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2.5">
          <div class="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            ${categories.map((cat) => `
              <button data-cat="${cat}" class="cat-filter-btn px-2.5 py-1 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              }">
                ${cat === "all" ? "全部物资" : cat}
              </button>
            `).join("")}
          </div>

          <button id="copy-shopping-list-btn" class="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-bold transition-all shadow-sm">
            <span>📋</span>
            <span>复制补货采买单 (${lowStockItems.length})</span>
          </button>
        </div>

        <!-- 列表滚动区 -->
        <div class="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          ${filtered.length === 0 ? `
            <div class="text-center py-10 text-slate-400 text-xs">
              该分类下暂无储备物品，点击下方即可添加！
            </div>
          ` : `
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${filtered.map((item) => {
                const stock = Number(item.stock);
                const threshold = Number(item.threshold);
                const isOut = stock === 0;
                const isLow = stock > 0 && stock <= threshold;
                const daily = Number(item.dailyUsage) || 1;
                const daysLeft = stock > 0 ? Math.floor(stock / daily) : 0;

                return `
                  <div class="p-3.5 rounded-2xl border transition-all ${
                    isOut
                      ? "bg-rose-50/70 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/60"
                      : isLow
                      ? "bg-amber-50/70 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60"
                      : "bg-white dark:bg-slate-750 border-slate-200/80 dark:border-slate-700/80 shadow-sm"
                  }">
                    <div class="flex items-start justify-between gap-2">
                      <div class="flex items-center space-x-2.5">
                        <span class="text-2xl">${item.icon || "🥗"}</span>
                        <div>
                          <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                            ${item.name}
                            ${isOut
                              ? `<span class="text-[10px] px-1.5 py-0.2 rounded bg-rose-500 text-white font-semibold">断货</span>`
                              : isLow
                              ? `<span class="text-[10px] px-1.5 py-0.2 rounded bg-amber-500 text-white font-semibold">偏低</span>`
                              : ""
                            }
                          </h4>
                          <span class="text-[10px] text-slate-400">${item.category} • 每日约用 ${daily}${item.unit}</span>
                        </div>
                      </div>
                      <button data-delete-id="${item.id}" class="text-slate-300 hover:text-rose-500 text-xs p-1" title="删除该物品">✕</button>
                    </div>

                    <!-- 数量与天数 -->
                    <div class="mt-3 flex items-baseline justify-between border-t border-slate-100 dark:border-slate-700/60 pt-2.5">
                      <div>
                        <span class="text-xs text-slate-400">当前剩余：</span>
                        <span class="text-base sm:text-lg font-black ${
                          isOut ? "text-rose-600 dark:text-rose-400" : isLow ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"
                        }">
                          ${stock}
                        </span>
                        <span class="text-xs font-semibold text-slate-500">${item.unit}</span>
                      </div>
                      <div class="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        ${isOut
                          ? `<span class="text-rose-600 font-bold">⚠️ 建议即刻采购</span>`
                          : `可支撑约 <span class="font-bold ${isLow ? 'text-amber-600' : 'text-slate-700 dark:text-slate-200'}">${daysLeft}</span> 天`
                        }
                      </div>
                    </div>

                    <!-- 快捷操作区 -->
                    <div class="mt-3 pt-2 border-t border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-between gap-1">
                      <div class="flex items-center space-x-1">
                        <span class="text-[10px] text-slate-400 mr-0.5">吃了/用掉:</span>
                        <button data-consume-id="${item.id}" data-amount="1" class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 active:scale-95 text-xs font-bold text-slate-700 dark:text-slate-200">
                          -1
                        </button>
                        ${daily >= 2 ? `
                          <button data-consume-id="${item.id}" data-amount="2" class="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 active:scale-95 text-xs font-bold text-slate-700 dark:text-slate-200">
                            -2
                          </button>
                        ` : ""}
                      </div>

                      <div class="flex items-center space-x-1">
                        <span class="text-[10px] text-slate-400 mr-0.5">采购入库:</span>
                        <button data-restock-id="${item.id}" data-amount="5" class="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 active:scale-95 text-xs font-bold">
                          +5
                        </button>
                        <button data-restock-id="${item.id}" data-amount="10" class="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 active:scale-95 text-xs font-bold">
                          +10
                        </button>
                      </div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          `}

          <!-- 新增食材物品展开表单 -->
          <div class="pt-4 border-t border-slate-200 dark:border-slate-700">
            <details class="group bg-slate-50 dark:bg-slate-750 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
              <summary class="font-bold text-xs text-slate-700 dark:text-slate-200 cursor-pointer list-none flex items-center justify-between">
                <span class="flex items-center space-x-1.5">
                  <span>➕</span>
                  <span>添加常吃食材或微量补剂</span>
                </span>
                <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <form id="add-inventory-form" class="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div class="col-span-2">
                  <label class="block text-slate-400 mb-1 font-semibold">物品名称</label>
                  <input type="text" id="new-inv-name" required placeholder="如：即食牛肉片 / 蓝莓 / 蛋白棒" class="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label class="block text-slate-400 mb-1 font-semibold">分类</label>
                  <select id="new-inv-cat" class="w-full px-2 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none">
                    <option value="优质蛋白">优质蛋白</option>
                    <option value="健康主食">健康主食</option>
                    <option value="乳品饮品">乳品饮品</option>
                    <option value="轻食果蔬">轻食果蔬</option>
                    <option value="核心补剂">核心补剂</option>
                    <option value="工位补给">工位补给</option>
                  </select>
                </div>
                <div>
                  <label class="block text-slate-400 mb-1 font-semibold">图标</label>
                  <input type="text" id="new-inv-icon" value="🥗" class="w-full px-2 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-center" />
                </div>
                <div>
                  <label class="block text-slate-400 mb-1 font-semibold">初始库存</label>
                  <input type="number" id="new-inv-stock" required value="10" min="0" class="w-full px-2 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-800" />
                </div>
                <div>
                  <label class="block text-slate-400 mb-1 font-semibold">单位</label>
                  <input type="text" id="new-inv-unit" required value="袋" class="w-full px-2 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-800" />
                </div>
                <div>
                  <label class="block text-slate-400 mb-1 font-semibold">预警线 (低于报警)</label>
                  <input type="number" id="new-inv-thresh" required value="3" min="1" class="w-full px-2 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-800" />
                </div>
                <div>
                  <label class="block text-slate-400 mb-1 font-semibold">每日消耗估算</label>
                  <input type="number" id="new-inv-usage" required value="1" min="0.1" step="0.5" class="w-full px-2 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-800" />
                </div>
                <div class="col-span-2 sm:col-span-4 pt-1">
                  <button type="submit" class="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs transition-all shadow-sm">
                    💾 保存并加入我的储备清单
                  </button>
                </div>
              </form>
            </details>
          </div>
        </div>

        <!-- 底部 -->
        <div class="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-750/70 border-t border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-xs text-slate-400">
          <span>💡 每日在工作台完成打卡后，随时顺手扣减库存</span>
          <button id="footer-close-btn" class="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 font-bold transition-all">
            完成关闭
          </button>
        </div>
      </div>
    `;

    // 绑定事件
    backdrop.querySelector("#close-inventory-btn")?.addEventListener("click", () => backdrop.remove());
    backdrop.querySelector("#footer-close-btn")?.addEventListener("click", () => backdrop.remove());

    backdrop.querySelectorAll(".cat-filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeCategory = btn.dataset.cat;
        renderContent();
      });
    });

    // 扣减操作
    backdrop.querySelectorAll("[data-consume-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.consumeId;
        const amount = Number(btn.dataset.amount) || 1;
        const item = store.consumeInventory(id, amount);
        if (item && item.stock <= item.threshold) {
          showToast(`⚠️ [${item.name}] 仅剩 ${item.stock}${item.unit}，已达预警线！`);
        } else {
          showToast(`已扣减 ${amount}${item.unit} ${item.name}`);
        }
        renderContent();
      });
    });

    // 入库增加
    backdrop.querySelectorAll("[data-restock-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.restockId;
        const amount = Number(btn.dataset.amount) || 1;
        const item = store.restockInventory(id, amount);
        showToast(`已为 [${item.name}] 补货 +${amount}${item.unit}！`);
        renderContent();
      });
    });

    // 删除
    backdrop.querySelectorAll("[data-delete-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.deleteId;
        if (confirm("确定从物资储备库中移除该物品？")) {
          store.deleteInventoryItem(id);
          showToast("已移除该物资条目");
          renderContent();
        }
      });
    });

    // 复制采买清单
    backdrop.querySelector("#copy-shopping-list-btn")?.addEventListener("click", async () => {
      const lows = store.getLowStockItems();
      if (lows.length === 0) {
        showToast("🎉 目前所有物资储备充裕，无需补货！");
        return;
      }

      let text = `🛒 LifePlan 食材物资补货清单 (${lows.length}项缺货/偏低)：\n`;
      lows.forEach((item, idx) => {
        const isOut = Number(item.stock) === 0;
        text += `${idx + 1}. [${isOut ? "已断货" : "储备低"}] ${item.name}：当前剩余 ${item.stock}${item.unit}（预警线 ${item.threshold}${item.unit}）\n`;
      });
      text += `\n📅 生成时间：${new Date().toLocaleDateString("zh-CN")}`;

      try {
        await navigator.clipboard.writeText(text);
        showToast("📋 补货清单已复制！去超市或美团买菜直接用！");
      } catch {
        prompt("请复制以下补货清单：", text);
      }
    });

    // 表单提交
    backdrop.querySelector("#add-inventory-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = backdrop.querySelector("#new-inv-name").value;
      const category = backdrop.querySelector("#new-inv-cat").value;
      const icon = backdrop.querySelector("#new-inv-icon").value || "🥗";
      const stock = Number(backdrop.querySelector("#new-inv-stock").value) || 0;
      const unit = backdrop.querySelector("#new-inv-unit").value || "份";
      const threshold = Number(backdrop.querySelector("#new-inv-thresh").value) || 2;
      const dailyUsage = Number(backdrop.querySelector("#new-inv-usage").value) || 1;

      store.addInventoryItem({ name, category, icon, stock, unit, threshold, dailyUsage });
      showToast(`已新增物资 [${name}]`);
      renderContent();
    });
  }

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) backdrop.remove();
  });

  renderContent();
  document.body.appendChild(backdrop);
}

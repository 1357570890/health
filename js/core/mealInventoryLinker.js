// 饮食打卡与食材储备自动扣减联动器 (Meal & Inventory Automation Linker)
import { store } from "./store.js";

export function handleMealInventoryLinkage(taskId, isNowCompleted) {
  const inventory = store.getInventory();
  if (!inventory || inventory.length === 0) return;

  // 辅助查找与扣减函数
  const adjustStock = (nameKeyword, delta) => {
    const item = inventory.find((i) => i.name.includes(nameKeyword));
    if (item) {
      if (delta < 0) {
        store.consumeInventory(item.id, Math.abs(delta));
      } else {
        store.restockInventory(item.id, delta);
      }
    }
  };

  const multiplier = isNowCompleted ? -1 : 1; // 打卡扣减，取消打卡归还

  if (taskId === "fixed_diet_breakfast") {
    // 早餐消耗：鸡蛋2个 + 牛奶1盒 + 黑麦面包2片
    adjustStock("鸡蛋", 2 * multiplier);
    adjustStock("牛奶", 1 * multiplier);
    adjustStock("黑麦", 2 * multiplier);
  } else if (taskId === "fixed_diet_lunch") {
    // 午餐消耗：自带高蛋白鸡胸肉1袋
    adjustStock("鸡胸肉", 1 * multiplier);
  } else if (taskId === "fixed_diet_dinner") {
    // 晚餐消耗：鸡胸肉1袋
    adjustStock("鸡胸肉", 1 * multiplier);
  }
}

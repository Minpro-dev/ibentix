import cron from "node-cron";
import { handleAutoCancelOrders } from "../services/orderTask.service";

export const initCronJobs = () => {
  // Menit 0 setiap jam (0 * * * *)
  cron.schedule("*/1 * * * *", async () => {
    console.log("[CRON] Checking for stuck admin confirmations...");
    try {
      const count = await handleAutoCancelOrders();
      if (count > 0)
        console.log(`[CRON] Successfully cancelled ${count} orders.`);
    } catch (error) {
      console.error("[CRON] Error during auto-cancel:", error);
    }
  });

  console.log("🚀 Cron Jobs Initialized");
};

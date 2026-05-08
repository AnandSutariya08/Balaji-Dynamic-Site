import { Router, type IRouter } from "express";
import { refreshCache, getCacheStatus } from "../lib/cache";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.post("/refresh", async (_req, res) => {
  try {
    await refreshCache();
    const status = getCacheStatus();
    logger.info(status, "Cache refreshed via API");
    res.json({ ok: true, cache: status });
  } catch (err) {
    logger.error({ err }, "Cache refresh failed");
    res.status(500).json({ error: "Refresh failed" });
  }
});

router.get("/cache-status", (_req, res) => {
  res.json(getCacheStatus());
});

export default router;

import { Router, type IRouter } from "express";
import { getServices } from "../lib/cache.js";

const router: IRouter = Router();

router.get("/services", async (_req, res) => {
  const services = await getServices();
  if (!services) {
    res.status(503).json({ error: "Firebase not configured" });
    return;
  }
  res.json(services);
});

export default router;

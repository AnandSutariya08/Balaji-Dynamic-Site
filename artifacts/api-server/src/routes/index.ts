import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import blogsRouter from "./blogs.js";
import servicesRouter from "./services.js";
import refreshRouter from "./refresh.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(blogsRouter);
router.use(servicesRouter);
router.use(refreshRouter);

export default router;

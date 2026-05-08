import { Router, type IRouter } from "express";
import healthRouter from "./health";
import blogsRouter from "./blogs";
import servicesRouter from "./services";
import refreshRouter from "./refresh";

const router: IRouter = Router();

router.use(healthRouter);
router.use(blogsRouter);
router.use(servicesRouter);
router.use(refreshRouter);

export default router;

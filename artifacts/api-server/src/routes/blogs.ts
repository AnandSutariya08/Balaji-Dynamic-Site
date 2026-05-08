import { Router, type IRouter } from "express";
import { getBlogs } from "../lib/cache";

const router: IRouter = Router();

router.get("/blogs", async (_req, res) => {
  const blogs = await getBlogs();
  if (!blogs) {
    res.status(503).json({ error: "Firebase not configured" });
    return;
  }
  res.json(blogs);
});

router.get("/blogs/:slug", async (req, res) => {
  const blogs = await getBlogs();
  if (!blogs) {
    res.status(503).json({ error: "Firebase not configured" });
    return;
  }
  const post = blogs.find((b) => b.slug === req.params["slug"]);
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json(post);
});

export default router;

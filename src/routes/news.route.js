import { Router } from 'express';
import { createNews, 
         findAllNews, 
         topNews, 
         findById, 
         searchByTitle, 
         searchByUser,
         updateNews,
         deleteNews, 
         likeNews } from "../controllers/news.controller.js";
import { authMiddleware } from '../middlewares/auth.middlewares.js';

const router = Router();

router.post("/", authMiddleware, createNews);
router.get("/", findAllNews);
router.get("/top", topNews);
router.get("/search", searchByTitle)
router.get("/byUser", findById, authMiddleware, searchByUser);
router.get("/:id", authMiddleware, findById);
router.patch("/:id", authMiddleware, updateNews);
router.delete("/:id", authMiddleware, deleteNews);
router.patch("/like/:id", authMiddleware, likeNews);

export default router;
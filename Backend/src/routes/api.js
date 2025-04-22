import express from 'express';
import authMiddleware from "../middlewares/auth.js";
import { genreTextGet } from "../controllers/GenresText/genreTextGetController.js";
import { getAllGenresText } from "../controllers/GenresText/genreTextGetAllController.js";
import { createPost } from '../controllers/Posts/postMakeController.js';
import { deletePost } from '../controllers/Posts/postDeleteController.js';

const router = express.Router();


router.get("/genreText", authMiddleware, genreTextGet);
router.get("/genreTextAll", getAllGenresText);
router.post("/post", authMiddleware, createPost);
router.delete("/postDelete/:postId", authMiddleware, deletePost);

export default router;
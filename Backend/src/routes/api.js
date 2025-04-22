import express from 'express';
import authMiddleware from "../middlewares/auth.js";
import { genreTextGet } from "../controllers/GenresText/genreTextGetController.js";
import { getAllGenresText } from "../controllers/GenresText/genreTextGetAllController.js";
import { createPost } from '../controllers/Posts/postMakeController.js';
import { deletePost } from '../controllers/Posts/postDeleteController.js';
import { getPostById } from '../controllers/Posts/postGetController.js';
import {getAllPostsByUser} from '../controllers/Posts/postGetAllUserController.js';



const router = express.Router();


router.get("/genreText", authMiddleware, genreTextGet);
router.get("/genreTextAll", getAllGenresText);

router.post("/post", authMiddleware, createPost);
router.delete("/postDelete/:postId", authMiddleware, deletePost);
router.get("/postGet/:postId", authMiddleware, getPostById);
router.get("/postGetAllUser", authMiddleware, getAllPostsByUser);



export default router;
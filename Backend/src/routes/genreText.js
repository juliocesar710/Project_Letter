import express from 'express';
import { genreTextGet } from '../controllers/GenresText/genreTextGetController.js';
import { getAllGenresText } from '../controllers/GenresText/genreTextGetAllController.js';
import authMiddleware from '../middlewares/auth.js';



const router = express.Router();

router.get("/user", authMiddleware, genreTextGet);
router.get("/all", getAllGenresText);

export default router;


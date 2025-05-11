import express from "express";
import { genreTextGet } from "../controllers/GenresText/genreTextGetController.js";
import { getAllGenresText } from "../controllers/GenresText/genreTextGetAllController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllGenresText);
router.get("/user", authMiddleware, genreTextGet);

export default router;

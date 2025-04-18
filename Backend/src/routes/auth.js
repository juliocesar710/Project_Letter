import express from "express";
import { createUser } from "../controllers/User/userRegisterController.js";
import { getUser } from "../controllers/User/userLoginController.js";
import { updateUser } from "../controllers/User/userUpdateController.js";
import { deleteUser } from "../controllers/User/userDeleteController.js";
import authMiddleware from "../middlewares/auth.js";
import { genreTextGet } from "../controllers/GenresText/genreTextGetController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", getUser);
router.patch("/update", authMiddleware, updateUser);
router.delete("/delete", authMiddleware, deleteUser); 

router.get("/genreText", authMiddleware, genreTextGet);


export default router;

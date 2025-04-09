import express from 'express';
import { getUser, registerUser } from '../controllers/userController.js';
import  authMiddleware  from '../middlewares/auth.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', getUser);


router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: 'Perfil do usuário', user: req.user });
});

export default router; 
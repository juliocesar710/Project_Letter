import express from 'express';
import { registerUser } from '../controllers/userRegisterController.js';
import { getUser } from '../controllers/userLoginController.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', getUser);



export default router;
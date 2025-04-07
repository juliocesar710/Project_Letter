import express from 'express';
import { registerUser } from '../controllers/userController.js';
//import app from '../server';

const router = express.Router();

router.post('/register', registerUser);

//app.use('/', registerUser);

export default router;
import express from 'express';
import dotenv from 'dotenv';
import publicRoutes from './routes/public.js';
import authRoutes from './routes/auth.js';
import authMiddleware from './middlewares/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Rotas públicas
app.use('/user', publicRoutes);

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rota protegida de exemplo
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Esta é uma rota protegida', user: req.user });
});

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

 const authMiddleware = (req, res, next) => {
    try {
        
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        
        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

export default authMiddleware;


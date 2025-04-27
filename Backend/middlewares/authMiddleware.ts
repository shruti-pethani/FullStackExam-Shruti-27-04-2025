import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const protect: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      (req as AuthRequest).user = decoded;
      return next(); 
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
      return; 
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
    return; 
  }
};

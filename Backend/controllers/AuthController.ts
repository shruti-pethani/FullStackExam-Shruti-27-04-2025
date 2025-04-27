import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/sql/User';
import { generateToken } from '../utils/generateToken';

export const register = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed });

    const token = generateToken(newUser.id, newUser.email);

    res.status(201).json({ token, user: { id: newUser.id, name, email } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user.id, user.email);

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    next(error);
  }
};

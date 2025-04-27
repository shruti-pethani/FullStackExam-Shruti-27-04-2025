import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongo from './config/mongo';
import sequelize from './config/sql';

import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

connectMongo();            

sequelize.sync({ alter: true })
  .then(() => console.log('SQL tables synchronized'))
  .catch((error) => console.error('SQL sync error:', error));

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); 
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (_req, res) => {
  res.send('E-Commerce API is running...');
});


app.use(errorHandler);
export default app;

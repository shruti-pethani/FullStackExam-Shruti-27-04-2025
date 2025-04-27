import { Request, Response, NextFunction } from 'express';
import Product from '../models/mongo/Product';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;

    const query: any = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' }; 
    }

    if (category) {
      query.category = { $regex: category, $options: 'i' }; 
    }

    const pageNumber = parseInt(page as string) || 1;
    const pageSize = parseInt(limit as string) || 10;

    const products = await Product.find(query)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .exec();

    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      totalProducts,
      totalPages: Math.ceil(totalProducts / pageSize),
      currentPage: pageNumber,
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ success: true,product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, category, brand, stock, imageUrl } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      brand,
      stock,
      imageUrl,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, description, price, category, brand, stock, imageUrl } = req.body;
  
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.stock = stock ?? product.stock; // careful if stock = 0
      product.imageUrl = imageUrl || product.imageUrl;
  
      const updatedProduct = await product.save();
  
      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        product: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      await product.deleteOne();
  
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
  
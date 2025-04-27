import mongoose, { Schema, Document } from 'mongoose';

export interface ProductInterface extends Document {
  _id:string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand?: string;
  stock: number;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    stock: { type: Number, required: true, default: 0 },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ProductInterface>('Product', ProductSchema);

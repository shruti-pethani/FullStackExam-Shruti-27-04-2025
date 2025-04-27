import mongoose, { Schema, Document, Types } from 'mongoose';

export interface CartItemInterface {
  productId: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  userId: Number;
  items: CartItemInterface[];
  createdAt?: Date;
  updatedAt?: Date;
}

const CartSchema: Schema = new Schema(
  {
    userId: { type: Number, required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 },
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ICart>('Cart', CartSchema);

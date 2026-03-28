import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  fabric: string;
  images: string[];
  page: string;
  pageType: 'hero' | 'home' | 'shop';
  featured: boolean;
  sortOrder: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, min: 0 },
    category: { type: String, required: true },
    fabric: { type: String, required: true },
    images: [{ type: String }],
    page: { type: String, default: 'shop' },
    pageType: { type: String, enum: ['hero', 'home', 'shop'], default: 'shop' },
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    enabled: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ category: 1, enabled: 1 });
ProductSchema.index({ featured: 1, sortOrder: 1 });
ProductSchema.index({ pageType: 1, enabled: 1 });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

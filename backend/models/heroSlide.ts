import mongoose, { Schema, Document } from 'mongoose';

export interface IHeroSlide extends Document {
  title: string;
  subtitle: string;
  image: string;
  sortOrder: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const HeroSlideSchema = new Schema<IHeroSlide>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
    enabled: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

HeroSlideSchema.index({ sortOrder: 1, enabled: 1 });

export default mongoose.models.HeroSlide || mongoose.model<IHeroSlide>('HeroSlide', HeroSlideSchema);

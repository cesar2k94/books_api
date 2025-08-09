import { Schema, model, Document, Types } from 'mongoose';

export interface IBook extends Document {
  title: string;
  chapters: number;
  pages: number;
  authors: Types.ObjectId[];
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  chapters: { type: Number, required: true, min: 0 },
  pages: { type: Number, required: true, min: 0 },
  authors: [{ type: Schema.Types.ObjectId, ref: 'Author' }],
}, { timestamps: true });

export const Book = model<IBook>('Book', BookSchema);

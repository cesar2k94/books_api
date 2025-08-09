import { Schema, model, Document, Types } from 'mongoose';

export interface IAuthor extends Document {
  name: string;
  books: Types.ObjectId[];
}

const AuthorSchema = new Schema<IAuthor>({
  name: { type: String, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
}, { timestamps: true });

export const Author = model<IAuthor>('Author', AuthorSchema);

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { Book } from '../models/bookModel';
import { Author } from '../models/authorModel';

export const createBook = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, chapters, pages, authors } = req.body;

  try {
    //authors puede ser por IDo nombre del autor
    const authorIds: mongoose.Types.ObjectId[] = [];

    for (const a of authors) {
      if (typeof a === 'string' && mongoose.Types.ObjectId.isValid(a)) {
        authorIds.push(new mongoose.Types.ObjectId(a));
      } else if (typeof a === 'string') {
        let existing = await Author.findOne({ name: a });
        if (!existing) existing = await Author.create({ name: a });
        authorIds.push(existing._id as mongoose.Types.ObjectId);
      } else {
        return res.status(400).json({ message: 'Authors debe ser un ID o nombre de autor' });
      }
    }

    const book = await Book.create({ title, chapters, pages, authors: authorIds });

    //actualizar autores para agregar el libro recién creado
    await Author.updateMany({ _id: { $in: authorIds } }, { $addToSet: { books: book._id } });

    const populated = await Book.findById(book._id).populate('authors', 'name');
    return res.status(201).json(populated);
  } catch (err) {
    return res.status(500).json({ message: 'Error del servidor', error: err });
  }
};

export const listBooks = async (_req: Request, res: Response) => {
  try {
    const books = await Book.find().populate('authors', 'name');
    return res.json(books);
  } catch (err) {
    return res.status(500).json({ message: 'Error del servidor', error: err });
  }
};

export const avgPagesPerChapter = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'ID de libro inválido' });

  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });

    const chapters = book.chapters;
    const pages = book.pages;

    //si chapters es 0 devuelvo 0.00
    const avg = chapters === 0 ? 0 : pages / chapters;
    const avgTwoDecimals = parseFloat(avg.toFixed(2));

    return res.json({ bookId: id, avgPagesPerChapter: avgTwoDecimals });
  } catch (err) {
    return res.status(500).json({ message: 'Error del servidor', error: err });
  }
};

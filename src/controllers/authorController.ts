import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Author } from '../models/authorModel';

export const createAuthor = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name } = req.body;
    const author = await Author.create({ name });
    return res.status(201).json(author);
  } catch (err) {
    return res.status(500).json({ message: 'Error del servidor', error: err });
  }
};

export const listAuthors = async (_req: Request, res: Response) => {
  try {
    const authors = await Author.find().populate('books', 'title chapters pages');
    return res.json(authors);
  } catch (err) {
    return res.status(500).json({ message: 'Error del servidor', error: err });
  }
};

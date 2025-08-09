import { Router } from 'express';
import { body } from 'express-validator';
import { createBook, listBooks, avgPagesPerChapter } from '../controllers/bookController';

const router = Router();

router.post('/',
  [
    body('title').isString().notEmpty(),
    body('chapters').isInt({ min: 0 }),
    body('pages').isInt({ min: 0 }),
    body('authors').isArray()
  ],
  createBook
);

router.get('/', listBooks);
router.get('/:id/avg-pages-per-chapter', avgPagesPerChapter);

export default router;

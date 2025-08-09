import { Router } from 'express';
import { body } from 'express-validator';
import { createAuthor, listAuthors } from '../controllers/authorController';

const router = Router();

router.post('/', [body('name').isString().notEmpty()], createAuthor);
router.get('/', listAuthors);

export default router;

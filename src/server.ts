import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes';
import authorRoutes from './routes/authorRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

const PORT = process.env.PORT || 3000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/booksdb';

mongoose.connect(MONGO)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(PORT, () => console.log(`Server en http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Error conectando a MongoDB', err);
    process.exit(1);
  });

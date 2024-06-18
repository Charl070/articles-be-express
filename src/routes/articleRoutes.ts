import express from 'express';
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  patchArticle,
  deleteArticle
} from '../controllers/articleController';

const router = express.Router();

router.post('/articles', createArticle);
router.get('/articles', getArticles);
router.get('/articles/:id', getArticleById);
router.put('/articles/:id', updateArticle);
router.put('articles/:id', patchArticle);
router.delete('/articles/:id', deleteArticle);

export default router;
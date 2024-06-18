import express from 'express';
import { ArticleController } from '../controllers/articleController';

const router = express.Router();
const articleController = new ArticleController();

router.post('/articles', articleController.createArticle);
router.get('/articles', articleController.getArticles);
router.get('/articles/:id', articleController.getArticleById);
router.put('/articles/:id', articleController.updateArticle);
router.patch('/articles/:id', articleController.patchArticle);
router.delete('/articles/:id', articleController.deleteArticle);

export default router;
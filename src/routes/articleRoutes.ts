import express from 'express';
import { ArticleController } from '../controllers/articleController';

export default function(articleController: ArticleController) {
    const router = express.Router();

    router.post('/articles', articleController.createArticle);
    router.get('/articles', articleController.getArticles);
    router.get('/articles/:id', articleController.getArticleById);
    router.put('/articles/:id', articleController.updateArticle);
    router.patch('/articles/:id', articleController.patchArticle);
    router.delete('/articles/:id', articleController.deleteArticle);

    return router;
}
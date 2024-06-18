import { Request, Response } from 'express';
import { Article } from '../models/article';
import { Logger } from '../services/Logger';

export class ArticleController {
    private articles: Article[] = [];
    private currentId: number = 1;
    private logger: Logger;

    constructor(logger: Logger){
        this.logger = logger
    }

    public createArticle = (req: Request, res: Response): void => {
        const article = new Article(this.currentId++, req.body.title, req.body.content);
        this.articles.push(article);
        this.logger.log('Article created');
        res.status(201).json(article);
    };

    public getArticles = (req: Request, res: Response): void => {
        res.json(this.articles);
    };

    public getArticleById = (req: Request, res: Response): void => {
        const article = this.articles.find(a => a.id === parseInt(req.params.id));
        if (article) {
            res.json(article);
        } else {
            this.logger.warn(`Article with id ${req.params.id} not found`);
            res.status(404).json({ message: 'Article not found' });
        }
    };

    public updateArticle = (req: Request, res: Response): void => {
        const index = this.articles.findIndex(a => a.id === parseInt(req.params.id));
        if (index !== -1) {
            this.articles[index] = new Article(parseInt(req.params.id), req.body.title, req.body.content);
            this.logger.log(`Article with id ${req.params.id} updated`);
            res.json(this.articles[index]);
        } else {
            this.logger.warn(`Article with id ${req.params.id} not found`);
            res.status(404).json({ message: 'Article not found' });
        }
    };

    public patchArticle = (req: Request, res: Response): void => {
        const index = this.articles.findIndex(a => a.id === parseInt(req.params.id));
        if (index !== -1) {
            const existingArticle = this.articles[index];
            this.articles[index] = { ...existingArticle, ...req.body };
            this.logger.log(`Article with id ${req.params.id} patched`);
            res.json(this.articles[index]);
        } else {
            this.logger.warn(`Article with id ${req.params.id} not found`);
            res.status(404).json({ message: 'Article not found' });
        }
    };

    public deleteArticle = (req: Request, res: Response): void => {
        const index = this.articles.findIndex(a => a.id === parseInt(req.params.id));
        if (index !== -1) {
            this.articles.splice(index, 1);
            this.logger.log(`Article with id ${req.params.id} deleted`);
            res.status(204).end();
        } else {
            this.logger.warn(`Article with id ${req.params.id} not found`);
            res.status(404).json({ message: 'Article not found' });
        }
    };
}
import { Request, Response } from 'express';
import { Article } from '../models/article';

let articles: Article[] = [];
let currentId = 1;

export const createArticle = (req: Request, res: Response) => {
  const article: Article = { id: currentId++, ...req.body };
  articles.push(article);
  res.status(201).json(article);
};

export const getArticles = (req: Request, res: Response) => {
  res.json(articles);
};

export const getArticleById = (req: Request, res: Response) => {
  const article = articles.find(a => a.id === parseInt(req.params.id));
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
};

export const updateArticle = (req: Request, res: Response) => {
  const index = articles.findIndex(a => a.id === parseInt(req.params.id));
  if (index !== -1) {
    articles[index] = { id: parseInt(req.params.id), ...req.body };
    res.json(articles[index]);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
};

export const patchArticle = (req: Request, res: Response) => {
    const index = articles.findIndex(a => a.id === parseInt(req.params.id));
    if (index !== -1) {
      articles[index] = { ...articles[index], ...req.body };
      res.json(articles[index]);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  };

export const deleteArticle = (req: Request, res: Response) => {
  const index = articles.findIndex(a => a.id === parseInt(req.params.id));
  if (index !== -1) {
    articles.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
};
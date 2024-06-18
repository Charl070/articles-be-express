import { Request, Response } from 'express';
import { ArticleController } from '../controllers/articleController';
import { Logger } from '../services/Logger';
import { Article } from '../models/article';

describe('ArticleControllerTest', () => {
    let mockLogger: Logger;
    let articleController: ArticleController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockLogger = new Logger(); // You can mock Logger as needed
        articleController = new ArticleController(mockLogger);
        mockRequest = {};
        mockResponse = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            end: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createArticle', () => {
        it('should create a new article', () => {
            // Mock request body
            mockRequest.body = { title: 'Test Article', content: 'Test Content' };

            // Simulate controller method call
            articleController.createArticle(mockRequest as Request, mockResponse as Response);

            // Expectations
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({ title: 'Test Article', content: 'Test Content' }));
            expect(articleController['articles']).toHaveLength(1); // Check if article was added
        });
    });

    describe('getArticles', () => {
        it('should return all articles', () => {
            // Initialize some articles
            articleController['articles'] = [
                { id: 1, title: 'Article 1', content: 'Content 1' },
                { id: 2, title: 'Article 2', content: 'Content 2' },
            ];

            // Simulate controller method call
            articleController.getArticles(mockRequest as Request, mockResponse as Response);

            // Expectations
            expect(mockResponse.json).toHaveBeenCalledWith(articleController['articles']);
        });

        it('should return an empty array if no articles exist', () => {
            // Simulate controller method call
            articleController.getArticles(mockRequest as Request, mockResponse as Response);

            // Expectations
            expect(mockResponse.json).toHaveBeenCalledWith([]);
        });
    });

    describe('getArticleById', () => {
        it('should return the article with the given ID', () => {
            // Initialize some articles
            articleController['articles'] = [
                { id: 1, title: 'Article 1', content: 'Content 1' },
                { id: 2, title: 'Article 2', content: 'Content 2' },
            ];

            // Mock request parameters
            mockRequest.params = { id: '2' };

            // Simulate controller method call
            articleController.getArticleById(mockRequest as Request, mockResponse as Response);

            // Expectations
            expect(mockResponse.json).toHaveBeenCalledWith({ id: 2, title: 'Article 2', content: 'Content 2' });
        });

        it('should return 404 if article with given ID does not exist', () => {
            // Mock request parameters
            mockRequest.params = { id: '3' };

            // Simulate controller method call
            articleController.getArticleById(mockRequest as Request, mockResponse as Response);

            // Expectations
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Article not found' });
        });
    });

    describe('updateArticle', () => {
        it('should update the article with the given ID', () => {
            // Initialize some articles
            articleController['articles'] = [
                { id: 1, title: 'Article 1', content: 'Content 1' },
                { id: 2, title: 'Article 2', content: 'Content 2' },
            ];

            // Mock request parameters and body
            mockRequest.params = { id: '2' };
            mockRequest.body = { title: 'Updated Article', content: 'Updated Content' };

            // Simulate controller method call
            articleController.updateArticle(mockRequest as Request, mockResponse as Response);

            // Expectations
            expect(mockResponse.json).toHaveBeenCalledWith({ id: 2, title: 'Updated Article', content: 'Updated Content' });
        });

        it('should return 404 if article with given ID does not exist', () => {
            // Mock request parameters
            mockRequest.params = { id: '3' };
            mockRequest.body = { title: 'Updated Article', content: 'Updated Content' };

            // Simulate controller method call
            articleController.updateArticle(mockRequest as Request, mockResponse as Response);

            // Expectations
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Article not found' });
        });
    });

    describe('deleteArticle', () => {
        it('should delete the article with the given ID', () => {
            // Initialize some articles
            articleController['articles'] = [
                { id: 1, title: 'Article 1', content: 'Content 1' },
                { id: 2, title: 'Article 2', content: 'Content 2' },
            ];

            // Mock request parameters
            mockRequest.params = { id: '2' };

            // Simulate controller method call
            articleController.deleteArticle(mockRequest as Request, mockResponse as Response);

            // Expectations
            expect(mockResponse.status).toHaveBeenCalledWith(204);
            expect(articleController['articles']).toHaveLength(1); // Check if article was deleted
        });

        it('should return 404 if article with given ID does not exist', () => {
            // Mock request parameters
            mockRequest.params = { id: '3' };

            // Simulate controller method call
            articleController.deleteArticle(mockRequest as Request, mockResponse as Response);

            // Expectations
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Article not found' });
        });
    });
});
import express from 'express';
import bodyParser from 'body-parser';
import articleRoutes from './routes/articleRoutes';
import { Logger } from './services/Logger';
import { ArticleController } from './controllers/articleController';

const app = express();
const port = 3000;

app.use(bodyParser.json());
const logger = new Logger()
const articleController = new ArticleController(logger)

app.use('/api', articleRoutes(articleController));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
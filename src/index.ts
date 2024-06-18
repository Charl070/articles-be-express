import express from 'express';
import bodyParser from 'body-parser';
import articleRoutes from './routes/articleRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', articleRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
import express, { Request, Response } from 'express';
import NewsService from '../../service/news.service';
import News from '../../model/news.model';

export const createNewsRouter = express.Router();

const newsService = new NewsService();

createNewsRouter.post('/', async (req: Request, res: Response) => {
    const newNewsItem: News = req.body;

    try {
        const createdNewsItem = await newsService.createNews(newNewsItem);

        if (createdNewsItem) {
            res.json({ message: 'News item created successfully', newsItem: createdNewsItem });
        } else {
            res.status(500).json({ message: 'Failed to create news item' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred while creating the news item' });
    }
});

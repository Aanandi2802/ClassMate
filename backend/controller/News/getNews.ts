import express, { Request, Response } from 'express';
import NewsService from '../../service/news.service';
import News from '../../model/news.model';

export const getNewsRouter = express.Router();

const newsService = new NewsService();

getNewsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const newsItems = await newsService.viewNews();

        if (newsItems) {
            res.json({ message: 'News items fetched successfully', newsItems: newsItems });
        } else {
            res.status(404).json({ message: 'No news items found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred while fetching news items' });
    }
});

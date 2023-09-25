import express, { Request, Response } from 'express';
import DiscussionService from '../../service/discussions.service';

export const getDiscussionRouter = express.Router();

const discussionService = new DiscussionService();

// Modify the route to get all discussions
getDiscussionRouter.get('/', async (req: Request, res: Response) => {
    try {
        const discussions = await discussionService.getAllDiscussions(); // You need to implement this method in the DiscussionService

        res.json(discussions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred while fetching the discussions' });
    }
});


import express, { Request, Response } from 'express';
import DiscussionService from '../../service/discussions.service';
import Discussion from '../../model/discussion.model';

export const createDiscussionRouter = express.Router();

const discussionService = new DiscussionService();

createDiscussionRouter.post('/', async (req: Request, res: Response) => {
    const newDiscussion: Discussion = req.body;

    try {
        const createdDiscussion = await discussionService.createDiscussion(newDiscussion);

        if (createdDiscussion) {
            res.json({ message: 'Discussion created successfully', discussion: createdDiscussion });
        } else {
            res.status(500).json({ message: 'Failed to create discussion' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred while creating the discussion' });
    }
});

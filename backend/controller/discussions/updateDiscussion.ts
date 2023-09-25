import express, { Request, Response } from 'express';
import DiscussionService from '../../service/discussions.service';
import Discussion from '../../model/discussion.model';

export const updateDiscussionRouter = express.Router();

const discussionService = new DiscussionService();

updateDiscussionRouter.put('/:id', async (req: Request, res: Response) => {
    const discussionId: string = req.params.id;
    const updatedDiscussion: Discussion = req.body;

    try {
        const result = await discussionService.updateDiscussion(discussionId, updatedDiscussion);

        if (result) {
            if (result.modifiedCount > 0) {
                res.json({ message: 'Discussion updated successfully' });
            } else {
                res.json({ message: 'Discussion was already up to date' });
            }
        } else {
            res.status(404).json({ message: 'Discussion not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred while updating the discussion' });
    }
});

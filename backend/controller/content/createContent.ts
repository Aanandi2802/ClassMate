// Author: Yatrik Pravinbhai Amrutiya
import express, { Request, Response } from 'express';
import ContentService from '../../service/content.service';
import Content from '../../model/content.model';

export const createContentRouter = express.Router();

const contentService = new ContentService();

// Create content endpoint
createContentRouter.post('/', async (req: Request, res: Response) => {
    const newContent: Content = req.body;

    try {
        const createdContent = await contentService.createContent(newContent);

        if (createdContent) {
            // Content created successfully, return success response
            res.json({ message: 'Content created successfully', content: createdContent });
        } else {
            // Failed to create content, return error response
            res.status(500).json({ message: 'Failed to create content' });
        }
    } catch (error) {
        console.log(error);
        // Error occurred during MongoDB operation, return error response
        res.status(500).json({ message: 'An error occurred while creating the content' });
    }
});

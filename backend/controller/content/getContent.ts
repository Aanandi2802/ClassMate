// Author: Yatrik Pravinbhai Amrutiya
import express, { Request, Response } from 'express';
import ContentService from '../../service/content.service';

export const readContentRouter = express.Router();

const contentService = new ContentService();

// Read content endpoint
readContentRouter.get('/', async (req: Request, res: Response) => {
    try {
        const contentList = await contentService.getAllContent();

        if (contentList && contentList.length > 0) {
            // Content found, return success response
            res.json({ message: 'Content fetched successfully', contentList: contentList });
        } else {
            // Content not found, return empty array response
            res.json({ message: 'No content found', contentList: [] });
        }
    } catch (error) {
        console.log(error);
        // Error occurred during MongoDB operation, return error response
        res.status(500).json({ message: 'An error occurred while fetching the content' });
    }
});

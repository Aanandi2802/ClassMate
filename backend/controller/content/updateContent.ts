// Author: Yatrik Pravinbhai Amrutiya
import express, { Request, Response } from 'express';
import ContentService from '../../service/content.service';
import content from '../../model/content.model';
import { ObjectId } from "mongodb";

export const updateContentRouter = express.Router();

const contentService = new ContentService();

// Update content endpoint
updateContentRouter.put('/:contentID', async (req: Request, res: Response) => {
    const contentID: ObjectId = new ObjectId(req.params.contentID);
    const updatedContent: content = req.body;

    try {
        const updateResult = await contentService.updateContent(contentID, updatedContent);

        if (updateResult && updateResult.modifiedCount && updateResult.modifiedCount > 0) {
            // Content updated successfully, return success response
            res.json({ message: 'Content updated successfully', contentID: contentID });
        } else {
            // Content not found or no changes made, return error response
            res.status(404).json({ message: 'Content not found or no changes made' });
        }
    } catch (error) {
        console.log(error);
        // Error occurred during MongoDB operation, return error response
        res.status(500).json({ message: 'An error occurred while updating the content' });
    }
});

// Author: Yatrik Pravinbhai Amrutiya
import express, {Request, Response} from "express";
import ContentService from "../../service/content.service";
import {ObjectId} from "mongodb";

export const deleteContentRouter = express.Router();

const contentService = new ContentService();

// Delete content endpoint
deleteContentRouter.delete(
    "/:contentId",
    async (req: Request, res: Response) => {
        const contentId: ObjectId = new ObjectId(req.params.contentId);
        try {
            const deleteResult = await contentService.deleteContent(contentId);
            if (
                deleteResult &&
                deleteResult.deletedCount &&
                deleteResult.deletedCount > 0
            ) {
                // Content deleted successfully, return success response
                res.json({
                    message: "Content deleted successfully",
                    contentId: contentId,
                });
            } else {
                // Content not found, return error response
                res.status(404).json({message: "Content not found"});
            }
        } catch (error) {
            console.log(error);
            // Error occurred during MongoDB operation, return error response
            res
                .status(500)
                .json({message: "An error occurred while deleting the content"});
        }
    }
);

// Author: Yatrik Pravinbhai Amrutiya
import express, {Request, Response} from 'express';
import AnnouncementService from '../../service/announcement.service';
import announcements from '../../model/announcement.model';

export const createAnnouncementRouter = express.Router();

const announcementService = new AnnouncementService();

// Create an announcement endpoint
createAnnouncementRouter.post('/', async (req: Request, res: Response) => {
    const newAnnouncement: announcements = req.body;

    try {
        const createdAnnouncement = await announcementService.createAnnouncement(newAnnouncement);

        if (createdAnnouncement) {
            // Announcement created successfully, return success response
            res.json({message: 'Announcement created successfully', announcement: createdAnnouncement});
        } else {
            // Failed to create announcement, return error response
            res.status(500).json({message: 'Failed to create announcement'});
        }
    } catch (error) {
        console.log(error);
        // Error occurred during MongoDB operation, return error response
        res.status(500).json({message: 'An error occurred while creating the announcement'});
    }
});

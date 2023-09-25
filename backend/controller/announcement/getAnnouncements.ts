// Author: Yatrik Pravinbhai Amrutiya
import express, {Request, Response} from 'express';
import AnnouncementService from '../../service/announcement.service';

export const getAnnouncementsRouter = express.Router();

const announcementService = new AnnouncementService();

// Get all announcements endpoint
getAnnouncementsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const announcements = await announcementService.viewAnnouncements();

        if (announcements) {
            // Announcements found, return success response
            res.json({message: 'Announcements fetched successfully', announcements: announcements});
        } else {
            // Announcements not found, return error response
            res.status(404).json({message: 'No announcements found'});
        }
    } catch (error) {
        console.log(error);
        // Error occurred during MongoDB operation, return error response
        res.status(500).json({message: 'An error occurred while fetching announcements'});
    }
});

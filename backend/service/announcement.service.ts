// Author: Yatrik Pravinbhai Amrutiya
import {Db, MongoClient} from "mongodb";
import envVariables from '../importenv';
import Announcement from "../model/announcement.model";

const mongoURI = envVariables.mongoURI;
const announcementsCollectionName = envVariables.announcementsCollectionName;
const dbName = envVariables.dbName;

class AnnouncementService {
    async createAnnouncement(announcement: Announcement) {
        try {
            // Connect to MongoDB
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });
            const db: Db = client.db(dbName);

            // Insert the new announcement into the MongoDB collection
            const newAnnouncement = await db.collection(announcementsCollectionName).insertOne(announcement);

            await client.close();

            return newAnnouncement;
        } catch (error) {
            console.log(error);
        }
    }

    async viewAnnouncements() {
        try {
            // Connect to MongoDB
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });
            const db: Db = client.db(dbName);

            // Fetch all announcements from the MongoDB collection
            const announcements = await db.collection(announcementsCollectionName).find().toArray();

            await client.close();

            console.log(announcements);
            return announcements;
        } catch (error) {
            console.log(error);
        }
    }
}

export default AnnouncementService;

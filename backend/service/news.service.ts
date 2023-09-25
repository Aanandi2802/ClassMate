import { Db, MongoClient } from "mongodb";
import envVariables from '../importenv';
import News from "../model/news.model";

const mongoURI = envVariables.mongoURI;
const newsCollectionName = envVariables.newsCollectionName;
const dbName = envVariables.dbName;

class NewsService {
    async createNews(newsItem: News) {
        try {
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });
            const db: Db = client.db(dbName);

            const newNewsItem = await db.collection(newsCollectionName).insertOne(newsItem);

            await client.close();

            return newNewsItem;
        } catch (error) {
            console.log(error);
        }
    }

    async viewNews() {
        try {
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });
            const db: Db = client.db(dbName);

            const newsItems = await db.collection(newsCollectionName).find().toArray();

            await client.close();

            return newsItems;
        } catch (error) {
            console.log(error);
        }
    }
}

export default NewsService;

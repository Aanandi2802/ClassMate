// Author: Yatrik Pravinbhai Amrutiya
import { Db, MongoClient, ObjectId } from "mongodb";
import envVariables from "../importenv";
import Content from "../model/content.model";
import { v4 as uuidv4 } from "uuid";

const mongoURI = envVariables.mongoURI;
const contentCollectionName = envVariables.contentCollectionName; // Replace "content" with the actual collection name in MongoDB
const dbName = envVariables.dbName;

class ContentService {
  async createContent(content: Content) {
    try {

      // Connect to MongoDB
      const client = await MongoClient.connect(mongoURI, {
        connectTimeoutMS: 5000,
        socketTimeoutMS: 30000,
      });
      const db: Db = client.db(dbName);

      // Insert the new content into the MongoDB collection
      const insertedContent = await db
        .collection(contentCollectionName)
        .insertOne(content);

      await client.close();

      return insertedContent; // Return the newly inserted content
    } catch (error) {
      console.log(error);
    }
  }

  async getAllContent() {
    try {
      // Connect to MongoDB
      const client = await MongoClient.connect(mongoURI, {
        connectTimeoutMS: 5000,
        socketTimeoutMS: 30000,
      });
      const db: Db = client.db(dbName);

      // Fetch all content from the MongoDB collection
      const contentList = await db
        .collection(contentCollectionName)
        .find()
        .toArray();

      await client.close();

      return contentList;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async updateContent(contentID: ObjectId, updatedContent: Content) {
    try {
      // Connect to MongoDB
      const client = await MongoClient.connect(mongoURI, {
        connectTimeoutMS: 5000,
        socketTimeoutMS: 30000,
      });
      const db: Db = client.db(dbName);
      const updatedContentWithoutId = { ...updatedContent };
      delete updatedContentWithoutId._id;
      // Update the content in the MongoDB collection using contentID
      const updatedContentResult = await db
        .collection(contentCollectionName)
        .updateOne({ _id: contentID }, { $set: updatedContentWithoutId });

      await client.close();

      return updatedContentResult;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteContent(_id: ObjectId) {
    try {
      // Connect to MongoDB
      const client = await MongoClient.connect(mongoURI, {
        connectTimeoutMS: 5000,
        socketTimeoutMS: 30000,
      });
      const db: Db = client.db(dbName);

      // Delete the content from the MongoDB collection using _id
      const deleteResult = await db
        .collection(contentCollectionName)
        .deleteOne({ _id: _id });

      await client.close();

      return deleteResult;
    } catch (error) {
      console.log(error);
    }
  }
}

export default ContentService;

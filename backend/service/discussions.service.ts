import { Db, MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

import envVariables from "../importenv";
import Discussion from "../model/discussion.model";

const mongoURI = envVariables.mongoURI;
const discussionsCollectionName = envVariables.discussionCollectionName;
const dbName = envVariables.dbName;

class DiscussionService {
  async createDiscussion(discussion: Discussion) {
    try {
      const client = await MongoClient.connect(mongoURI, {
        connectTimeoutMS: 5000,
        socketTimeoutMS: 30000,
      });
      const db: Db = client.db(dbName);

      const newDiscussion = await db
        .collection(discussionsCollectionName)
        .insertOne(discussion);

      await client.close();

      return newDiscussion;
    } catch (error) {
      console.log(error);
    }
  }

  async getDiscussionById(id: string) {
    try {
      const client = await MongoClient.connect(mongoURI, {
        connectTimeoutMS: 5000,
        socketTimeoutMS: 30000,
      });
      const db: Db = client.db(dbName);

      const discussion = await db
        .collection(discussionsCollectionName)
        .findOne({ _id: new ObjectId(id) });

      await client.close();

      return discussion;
    } catch (error) {
      console.log(error);
    }
  }

  async updateDiscussion(id: string, updatedDiscussion: Discussion) {
    try {
      const client = await MongoClient.connect(mongoURI, {
        connectTimeoutMS: 5000,
        socketTimeoutMS: 30000,
      });
      const db: Db = client.db(dbName);
  
      // Exclude _id field from updatedDiscussion
      const { _id, ...updatedDiscussionWithoutId } = updatedDiscussion;
  
      const result = await db
        .collection(discussionsCollectionName)
        .updateOne({ _id: new ObjectId(id) }, { $set: updatedDiscussionWithoutId });
  
      await client.close();
  
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  

  async deleteDiscussion(id: string) {
    try {
      const client = await MongoClient.connect(mongoURI, {
        connectTimeoutMS: 5000,
        socketTimeoutMS: 30000,
      });
      const db: Db = client.db(dbName);

      const result = await db
        .collection(discussionsCollectionName)
        .deleteOne({ _id: new ObjectId(id) });

      await client.close();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllDiscussions() {
    try {
      const client = await MongoClient.connect(mongoURI, {
        connectTimeoutMS: 5000,
        socketTimeoutMS: 30000,
      });
      const db: Db = client.db(dbName);

      const discussions = await db
        .collection(discussionsCollectionName)
        .find()
        .toArray();

      await client.close();

      return discussions;
    } catch (error) {
      console.log(error);
    }
  }
}

export default DiscussionService;

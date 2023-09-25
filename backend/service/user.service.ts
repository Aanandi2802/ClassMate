// Author: Harshil Shah
// Author: Aanandi Pankhania
// Author: Yatrik Pravinbhai Amrutiya

import {Db, MongoClient, ObjectId} from "mongodb";
import user from "../model/user.model";
import envVariables from "../importenv";

const mongoURI = envVariables.mongoURI;
const usersCollectionName = envVariables.usersCollectionName;
const dbName = envVariables.dbName;

class UserService {
    async getUser(user: user) {
        try {
            // Connect to MongoDB
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000,
            });
            const db: Db = client.db(dbName);
            console.log(user);
            const returned_user = await db
                .collection(usersCollectionName)
                .findOne(user);

            console.log(returned_user);
            await client.close();

            if (returned_user) {
                return returned_user;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async createUser(user: user) {
        if ((await this.getUser({user_email: user.user_email})) != null) {
            return;
        }
        try {
            // Connect to MongoDB
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000,
            });
            const db: Db = client.db(dbName);

            // Check user credentials in the MongoDB collection
            console.log(user);

            const new_user = await db.collection(usersCollectionName).insertOne(user);

            console.log(user);
            await client.close();
            return new_user;
        } catch (error) {
            console.log(error);
        }
    }

    async updateUser(user: user) {
        try {
            // Connect to MongoDB
            const client = await MongoClient.connect(mongoURI ? mongoURI : "", {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000,
            });
            const db: Db = client.db(dbName);

            const user_id = user.user_id;
            delete user.user_id;

            // Check user credentials in the MongoDB collection
            const users = await db
                .collection(usersCollectionName)
                .updateOne({_id: new ObjectId(user_id as string)}, {$set: user});
            await client.close();

            console.log(users);
            return users;
        } catch (error) {
            console.log(error);
        }
    }

    async forgetPassword(user: user) {
        console.log(user);
        try {
            // Connect to MongoDB
            const client = await MongoClient.connect(mongoURI ? mongoURI : "", {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000,
            });
            const db: Db = client.db(dbName);

            // Check user credentials in the MongoDB collection
            const users = await db.collection(usersCollectionName).updateOne(
                {_id: new ObjectId(user.user_id as string)}, // Specify the document using _id
                {$set: {password: user.password}}
            );
            await client.close();

            console.log(users);
            return users;
        } catch (error) {
            console.log(error);
        }
    }

    async listUsersWithusertypeFilter() {
        try {
            // Connect to MongoDB
            const client = await MongoClient.connect(mongoURI ? mongoURI : "", {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000,
            });
            const db: Db = client.db(dbName);

            // Check user credentials in the MongoDB collection
            const users = await db
                .collection(usersCollectionName)
                .find({user_type: {$in: ["stud", "prof"]}})
                .toArray();
            await client.close();

            console.log(users);
            return users;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteUser(user_id: string) {
        try {
            const objectId = new ObjectId(user_id);

            // Connect to MongoDB
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000,
            });
            const db: Db = client.db(dbName);

            // Check user credentials in the MongoDB collection
            const deleteResponse = await db
                .collection(usersCollectionName)
                .deleteOne({_id: objectId});
            await client.close();

            console.log(deleteResponse);
            return deleteResponse;
        } catch (error) {
            console.log(error);
        }
    }

    async updateUserStatus(userId: string) {
        try {
            // Connect to MongoDB
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000,
            });
            const db: Db = client.db(dbName);

            // Check user credentials in the MongoDB collection
            const updateResponse = await db
                .collection(usersCollectionName)
                .updateOne(
                    {_id: new ObjectId(userId)},
                    {$set: {status: "approved"}}
                );
            await client.close();

            console.log(updateResponse);
            return updateResponse;
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserService;

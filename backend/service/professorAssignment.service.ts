import {Db, MongoClient, ObjectId} from "mongodb";
import assignment from "../model/profAssignment.model";
import envVariables from '../importenv';

const mongoURI = envVariables.mongoURI;
const profAssignmentsCollectionName = envVariables.professorAssignmentCollectionName;
const dbName = envVariables.dbName;

class ProfAssignmentService {

    async updateAssignment(assignment_id: string, assignment: assignment){
        try {
            // Connect to MongoDB
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });

            const db: Db = client.db(dbName);

            // Check user credentials in the MongoDB collection
            console.log("Before upading assignment data ",assignment);
            console.log(assignment_id);
            const objectId = new ObjectId(assignment_id);
            console.log(assignment_id);
            console.log(objectId);

            const updateAssignment = await db.collection(profAssignmentsCollectionName).updateOne({_id:objectId}, 
            {
                $set: 
                    assignment
              })

            console.log(updateAssignment);
            await client.close();
            return updateAssignment;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAssignment(assignment_id: string) {
        try {
        const objectId = new ObjectId(assignment_id);

        const client = await MongoClient.connect(mongoURI, {
            connectTimeoutMS: 5000,
            socketTimeoutMS: 30000
        });
        const db: Db = client.db(dbName);

        const deleteResponse = await db.collection(profAssignmentsCollectionName).deleteOne({ _id: objectId });
        client.close();

        console.log(deleteResponse);
        return deleteResponse;
        } catch (error) {
        console.log(error);
        return null;
        }
    }

    async listAssignments() {
        try {
            // Connect to MongoDB
            const client = await MongoClient.connect(mongoURI ? mongoURI : '', {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });
            const db: Db = client.db(dbName);

            // Check user credentials in the MongoDB collection
            const assignments = await db.collection(profAssignmentsCollectionName).find().toArray();
            await client.close();

            console.log(assignments);
            if (assignments) {
                return assignments;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async createAssignment(assignment: assignment) {
        try {
            // Connect to MongoDB
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });

            const db: Db = client.db(dbName);

            // Check user credentials in the MongoDB collection
            console.log(assignment);

            const new_assignment = await db.collection(profAssignmentsCollectionName).insertOne(assignment);

            console.log(assignment);
            await client.close();
            return new_assignment;
        } catch (error) {
            console.log(error);
        }
    } 
}

export default ProfAssignmentService;

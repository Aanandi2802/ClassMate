import {Db, MongoClient, ObjectId} from "mongodb";
import assignmentStudents from "../model/studAssignment.model";
import envVariables from '../importenv';

const mongoURI = envVariables.mongoURI;
const submissionCollection = envVariables.studentSubmissionsCollectionName;
const dbName = envVariables.dbName;

class StudentSubmissionService {

    async uploadSubmissons(assignment: assignmentStudents) {
        try {
            // Connect to MongoDB
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });

            const db: Db = client.db(dbName);

            // Check user credentials in the MongoDB collection
            console.log("ASSIGNMENT DATA===>",assignment);

            const new_assignment = await db.collection(submissionCollection).insertOne(assignment);

            console.log(assignment);
            await client.close();
            return new_assignment;
        } catch (error) {
            console.log(error);
        }
    } 
}

export default StudentSubmissionService;

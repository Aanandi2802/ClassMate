// Author: Harshil Shah
// Author: Aanandi Pankhania
// Author: Yatrik Pravinbhai Amrutiya

import {Db, MongoClient} from "mongodb";
import envVariables from "../importenv";
import CourseService from "./course.service";
import {Quiz} from "../model/quiz.model";

const mongoURI = envVariables.mongoURI;
const quizCollectionName = envVariables.quizCollectionName;
const dbName = envVariables.dbName;
const courseService = new CourseService();

class CalenderService {
    async getDeadLinesByProfID(prof_email: string): Promise<Quiz[]> {
        try {
            const coursesID = await courseService.getCoursesByProfID(prof_email);
            console.log("courseID", coursesID);
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });
            const db: Db = client.db(dbName);

            const courses = await db.collection<Quiz>(quizCollectionName).find({courseID: {$in: coursesID}}).toArray();

            await client.close();

            console.log(courses);
            return courses;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default CalenderService;

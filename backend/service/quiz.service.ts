// Author: Raj Soni
import { Db, MongoClient, ObjectId } from "mongodb";
import { Quiz, StudentQuiz } from "../model/quiz.model";
import envVariables from '../importenv';

const mongoURI = envVariables.mongoURI;
const quizCollectionName = envVariables.quizCollectionName;
const studentQuizCollectionName = envVariables.studentQuizCollectionName;
const dbName = envVariables.dbName;

class QuizService {
    async getOneQuiz(quiz_id: string) {
        const objectId = new ObjectId(quiz_id);
        try {
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });
            const db: Db = client.db(dbName);
            const returned_quiz = await db.collection(quizCollectionName).findOne({ _id: objectId });
            client.close();

            if (returned_quiz) {
                return returned_quiz as Quiz;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getOneStudentQuiz(quiz_id: string) {
        const objectId = new ObjectId(quiz_id);
        try {
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });

            const db: Db = client.db(dbName);
            const projection = {
                '_id': 1,
                'title': 1,
                'timeLimit': 1,
                'numOfQuestions': 1,
                'questions.question': 1,
                'questions.id': 1,
                'questions.options': 1,
            };

            const returned_quiz = await db.collection(quizCollectionName).find({ _id: objectId }).project(projection).toArray();
            client.close();

            if (returned_quiz) {
                return returned_quiz[0];
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async createNewQuiz(quiz: Quiz) {
        try {
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });
            const db: Db = client.db(dbName);
            const new_quiz = await db.collection(quizCollectionName).insertOne(quiz);
            client.close();

            return new_quiz;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getAllQuizzes(courseId: string) {
        try {
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });
            const db: Db = client.db(dbName);
            const returned_quizzes = await db.collection(quizCollectionName).find({ courseID: courseId }).toArray();

            client.close();

            if (returned_quizzes) {
                return returned_quizzes;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getAllQuizzesForStudents(courseId: string) {
        try {
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });
            const db: Db = client.db(dbName);
            const projection = {
                "_id": 1,
                "startDate": 1,
                "dueDate": 1,
                "title": 1,
                "description": 1,
            };
            const currentDate = new Date().toISOString().split('T')[0];
            const query = {
                courseID: courseId,
                visibleDate: { $lte: currentDate }
            }
            console.log(query);
            const returned_quizzes = await db.collection(quizCollectionName).find(query).project(projection).toArray();
            client.close();

            if (returned_quizzes) {
                return returned_quizzes;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteQuiz(quiz_id: string) {
        try {
            const objectId = new ObjectId(quiz_id);

            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });
            const db: Db = client.db(dbName);

            const deleteResponse = await db.collection(quizCollectionName).deleteOne({ _id: objectId });
            client.close();

            console.log(deleteResponse);
            return deleteResponse;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async updateQuiz(quiz_id: string, updatedQuiz: Quiz) {
        try {
            const objectId = new ObjectId(quiz_id);
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });
            const db: Db = client.db(dbName);
            const updateResponse = await db.collection(quizCollectionName).updateOne(
                { _id: objectId },
                { $set: updatedQuiz }
            );
            client.close();

            if (updateResponse.modifiedCount > 0) {
                return true;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async submitQuiz(studentQuiz: StudentQuiz) {
        try {
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });

            const db: Db = client.db(dbName);
            const response = await db.collection('studentQuiz').insertOne(studentQuiz);
            client.close();

            if (response.acknowledged) {
                return { 'message': 'Quiz submitted successfully' }
            } else {
                return { 'error': 'Error while submiting quiz' }
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getQuizStatus(quiz_id: string, stud_email: string) {
        try {
            const client = await MongoClient.connect(mongoURI, {
                connectTimeoutMS: 5000,
                socketTimeoutMS: 30000
            });
            const db: Db = client.db(dbName);
            const returned_quizzes = await db.collection(studentQuizCollectionName).find({ quiz_id: quiz_id, stud_email: stud_email }).toArray();

            client.close();

            if (returned_quizzes) {
                return returned_quizzes;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default QuizService;

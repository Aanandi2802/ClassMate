// Author: Raj Soni
import express, { Request, Response } from 'express';
import QuizService from '../../service/quiz.service';

export const listQuizzesRouter = express.Router();

const quizService = new QuizService();
listQuizzesRouter.get('/', async (req: Request, res: Response) => {
    try {
        let quiz;
        const courseId = req.headers['course_id'] as string || '';
        if (req.headers['user-type'] && req.headers['user-type'] === 'stud') {
            quiz = await quizService.getAllQuizzesForStudents(courseId);
        } else {
            quiz = await quizService.getAllQuizzes(courseId);
        }

        if (quiz) {
            res.json({ message: 'Quizzes fetched successful', quizzes: quiz });
        } else {
            res.status(401).json({ message: 'Error occured' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});
// Author: Raj Soni
import express, { Request, Response } from 'express';
import QuizService from '../../service/quiz.service';

export const getStudentQuizRouter = express.Router();

const quizService = new QuizService();
getStudentQuizRouter.get('/', async (req: Request, res: Response) => {
    try {
        let quiz;
        if (req.headers['id']) {
            const quiz_id = req.headers['id'].toLocaleString();
            quiz = await quizService.getOneStudentQuiz(quiz_id);
        }

        if (quiz) {
            res.json({ message: 'Quizzes fetched successful', quiz: quiz });
        } else {
            res.status(401).json({ message: 'Error occurred' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});
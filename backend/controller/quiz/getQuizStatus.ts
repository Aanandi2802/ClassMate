// Author: Raj Soni
import express, { Request, Response } from 'express';
import QuizService from '../../service/quiz.service';

export const getQuizStatusRouter = express.Router();

const quizService = new QuizService();
getQuizStatusRouter.get('/', async (req: Request, res: Response) => {
    try {
        let quiz;
        if (req.headers['quiz_id'] && req.headers['stud_email']) {
            const quiz_id = req.headers['quiz_id'].toLocaleString();
            const stud_email = req.headers['stud_email'].toLocaleString();
            quiz = await quizService.getQuizStatus(quiz_id, stud_email);
        }

        if (quiz) {
            res.json({ message: 'Quizzes fetched successful', quiz: quiz });
        } else {
            res.status(401).json({ message: 'Error occured' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});
// Author: Raj Soni
import express, { Request, Response } from 'express';
import { Quiz } from '../../model/quiz.model';
import QuizService from '../../service/quiz.service'

export const updateQuizRouter = express.Router();

const quizService = new QuizService();

updateQuizRouter.patch('/', async (req: Request, res: Response) => {
    const current_quiz = req.body;
    const quiz_id: string = req.body._id;
    delete current_quiz._id;
    const response = await quizService.updateQuiz(quiz_id, current_quiz as Quiz);
    if (response)
        res.json({ message: 'Quiz Updated successful' });
    else
        res.json({ message: 'Error updating Quiz' });
});
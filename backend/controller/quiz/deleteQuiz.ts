// Author: Raj Soni
import express, { Request, Response } from 'express';
import QuizService from '../../service/quiz.service'

export const deleteQuizRouter = express.Router();

const quizService = new QuizService();

deleteQuizRouter.delete('/', async (req: Request, res: Response) => {
    console.log(req.body);
    const current_quiz = req.body;
    const response = await quizService.deleteQuiz(current_quiz.id);
    if (response)
        res.json({ message: 'Quiz Deleted successful' });
    else
        res.json({ message: 'Error deleting the Quiz' });
});
// Author: Raj Soni
import express, { Request, Response } from 'express';
import { Quiz } from '../../model/quiz.model';
import QuizService from '../../service/quiz.service'

export const createQuizRouter = express.Router();

const quizService = new QuizService();

createQuizRouter.post('/', async (req: Request, res: Response) => {
  console.log(req.body);
  const current_quiz: Quiz = req.body;

  const new_quiz = await quizService.createNewQuiz(current_quiz);
  console.log(new_quiz);
  if (new_quiz)
    res.json({ message: 'Quiz Created successful', quiz: new_quiz });
  else
    res.json({ message: 'Quiz Already Exists' });
});
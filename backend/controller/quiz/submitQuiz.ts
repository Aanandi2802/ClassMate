// Author: Raj Soni
import express, { Request, Response } from 'express';
import QuizService from '../../service/quiz.service';
import { Quiz, QuizQuestion, StudentQuiz } from '../../model/quiz.model';

export const submitQuizRouter = express.Router();

const quizService = new QuizService();
submitQuizRouter.post('/', async (req: Request, res: Response) => {
    const selectedOptions = req.body.selectedOptions;
    const quiz_id = req.body.quiz_id;
    const stud_email = req.body.stud_email;

    const quiz = await quizService.getOneQuiz(quiz_id);
    let marks: number | null = null;
    let status: string = '';
    if (quiz) {
        marks = calculateQuizMarks(selectedOptions, quiz);
        if (marks === null) {
            status = 'pending';
        } else {
            status = 'completed';
        }
        const studentQuiz: StudentQuiz = {
            marks: marks,
            quiz_id: quiz_id,
            stud_email: stud_email,
            status: status,
        }
        const response = await quizService.submitQuiz(studentQuiz);
        if (response)
            res.json({ message: response });
        else
            res.json({ message: 'Error submitting quiz' });
    }

});


const calculateQuizMarks = (selectedOptions: any, quiz: Quiz) => {
    if (quiz.numOfQuestions && quiz.totalMarks && quiz.questions) {
        const perQuestionMarks: number = quiz.totalMarks / quiz.numOfQuestions;
        const questions: QuizQuestion[] = quiz.questions;
        let correctCount = 0;
        for (const questionId in selectedOptions) {
            const selectedOptionIndex = selectedOptions[questionId];
            const question = questions.find((q) => q.id === questionId);
            if (question && question.correctAnswer === selectedOptionIndex) {
                correctCount++;
            }
        }
        return correctCount * perQuestionMarks;
    } else {
        return 0;
    }
};

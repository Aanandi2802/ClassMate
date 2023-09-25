// Author: Raj Soni
export interface QuizQuestion {
  quizID?: string;
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  title?: string;
  description?: string;
  startDate?: string;
  dueDate?: string;
  visibleDate?: string;
  timeLimit?: number;
  numOfQuestions?: number;
  randomQuestions?: boolean;
  questions?: QuizQuestion[];
  totalMarks?: number;
  courseID?: string;
}

export interface StudentQuiz {
  stud_email?: string;
  quiz_id?: string;
  status?: string;
  marks?: number;
}
// Author: Raj Soni
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useToast
} from '@chakra-ui/react';
import { Quiz, QuizQuestion } from '../model/quiz.model';
import envVariables from '../../importenv';
import Loader from '../../loading';
import { getLoggedInUserType } from '../../service/LoginState';

interface QuestionBankProps {
  isQuestionBankModel: boolean;
  onCloseQuestionBankModel: () => void;
}

const QuestionBankPage: React.FC<QuestionBankProps> = ({ isQuestionBankModel, onCloseQuestionBankModel }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<string>('');
  const [isLoading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>();

  const initialQuestion: QuizQuestion = {
    id: Date.now().toString(),
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  };

  const [filledQuestions, setFilledQuestions] = useState<QuizQuestion>(initialQuestion);
  const toast = useToast();

  useEffect(() => {
    const user_type = getLoggedInUserType();
    if (user_type && user_type === 'prof') {
      fetchQuizzes()
        .then((response) => {
          setQuizzes(response.quizzes);
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }, []);

  const handleAddQuestion = () => {
    setQuestions((prevData) => [...prevData, filledQuestions]);
    setFilledQuestions(initialQuestion);
  };

  const handleAddOption = () => {
    setFilledQuestions((prevData) => ({
      ...prevData,
      options: [...prevData.options, '']
    }));
  };

  const handleRemoveOption = (optionIndex: number) => {
    setFilledQuestions((prevData) => ({
      ...prevData,
      options: prevData.options.filter((_, index) => index !== optionIndex),
    }));
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions((prevData) => ({
      ...prevData,
      questions: prevData.filter((question) => question.id !== questionId),
    }));
  };

  const handleCancel = () => {
    setFilledQuestions(initialQuestion);
    onCloseQuestionBankModel();
  };

  const handleSaveQuestions = () => {
    if (quizzes) {
      setLoading(true);

      const selectedQuizData = quizzes.find((quiz) => quiz._id === selectedQuiz);
      console.log(selectedQuizData);
      if (selectedQuizData && selectedQuizData.questions) {
        const updatedQuestions: QuizQuestion[] = selectedQuizData.questions?.concat(questions);
        const updatedQuizData = { _id: selectedQuizData._id, questions: updatedQuestions };
        console.log(updatedQuizData);
        saveQuestions(updatedQuizData)
          .then(() => {
            setQuestions(updatedQuestions);
            setFilledQuestions(initialQuestion);
            toast({
              title: 'Questions Saved!',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          })
          .catch((error) => {
            console.error(error);
            toast({
              title: 'Error',
              description: 'Failed to save the question.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Modal isOpen={isQuestionBankModel} onClose={handleCancel} size="xl" scrollBehavior="inside">
      {isLoading && <Loader />}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Question Bank</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Quiz</FormLabel>
              <Select
                placeholder="Select a quiz"
                value={selectedQuiz}
                onChange={(e) => setSelectedQuiz(e.target.value)}
              >
                {quizzes?.map((quiz) => (
                  <option key={quiz._id} value={quiz._id}>
                    {quiz.title}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Question</FormLabel>
              <Input
                placeholder="Enter a question"
                value={filledQuestions.question}
                onChange={(e) => {
                  setFilledQuestions((prevData) => ({
                    ...prevData,
                    question: e.target.value,
                  }));
                }}
              />
            </FormControl>

            {filledQuestions.options.map((option, index) => (
              <Box key={index}>
                <FormControl>
                  <FormLabel>Option {index + 1}</FormLabel>
                  <Stack direction={isMobile ? 'column' : 'row'}>
                    <Input
                      placeholder="Enter an option"
                      value={option}
                      onChange={(e) => {
                        setFilledQuestions((prevData) => ({
                          ...prevData,
                          options: prevData.options.map((opt, i) => (i === index ? e.target.value : opt)),
                        }));
                      }}
                    />
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleRemoveOption(index)}
                    >
                      Remove
                    </Button>
                  </Stack>
                </FormControl>
              </Box>
            ))}

            <Button size="sm" onClick={handleAddOption}>
              Add Option
            </Button>

            <FormControl>
              <FormLabel>Correct Answer</FormLabel>
              <Select
                placeholder="Select a correct answer"
                value={filledQuestions.correctAnswer || ''}
                onChange={(e) => {
                  const correctAnswer = Number(e.target.value);
                  setFilledQuestions((prevData) => ({
                    ...prevData,
                    correctAnswer: correctAnswer,
                  }));
                }}
              >
                {filledQuestions.options.map((option, index) => (
                  <option key={index} value={index}>
                    Option {index + 1}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Button colorScheme="teal" onClick={handleAddQuestion}>
              Add Question
            </Button>

            {questions.map((question, index) => (
              <Box key={index} borderWidth="1px" p={4} borderRadius="md">
                <Text>{question.question}</Text>
                {question.options.map((option, optionIndex) => (
                  <Text key={optionIndex} ml={4}>
                    {optionIndex + 1}. {option}
                  </Text>
                ))}
                <Text ml={4} fontWeight="bold">
                  Correct Answer: {question.options[Number(question.correctAnswer)]}
                </Text>
                <Button
                  mt={2}
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  Delete Question
                </Button>
              </Box>
            ))}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" onClick={handleCancel}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={handleSaveQuestions} ml={2}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default QuestionBankPage;

async function fetchQuizzes(): Promise<{ quizzes: Quiz[] }> {
  const localCourseId = localStorage.getItem('course_id');
  const courseID: string = localCourseId ? localCourseId : '';
  const backendURL = envVariables.backendURL;
  return await fetch(backendURL + '/listQuiz', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'course_id': courseID,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return { quizzes: [] };
    });
}

async function saveQuestions(quizData: Quiz): Promise<void> {
  const backendURL = envVariables.backendURL;
  return await fetch(backendURL + '/updateQuiz', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quizData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to save the question.');
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
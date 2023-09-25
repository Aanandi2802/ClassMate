// Author: Raj Soni
import React, { useState, useRef, useEffect } from 'react';
import { Quiz } from '../model/quiz.model';
import envVariables from '../../importenv';
import Loader from '../../loading';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Radio,
  Stack,
  Button,
  FormControl,
  VStack,
  Grid,
  Flex,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import { getLoggedInUserEmail } from '../../service/LoginState';

const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number }>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quiz, setQuiz] = useState<Quiz>();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(quiz?.timeLimit ?? 0);
  const timerRef = useRef<number | undefined>();
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const startTimer = () => {
    if (quiz?.timeLimit) {
      setTimeLeft(quiz.timeLimit * 60);
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            handleSubmitQuiz();
            return 0;
          }
        });
      }, 1000);
    }
  };

  const clearTimer = () => {
    if (timerRef.current !== undefined) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (quizId) {
      setLoading(true);
      getQuiz(quizId)
        .then((response) => {
          const shuffledQuestions = maxQuestions(response.quiz.questions || []);
          const randomQuestions = shuffledQuestions.slice(0, response.quiz.numOfQuestions);
          setQuiz({ ...response.quiz, questions: randomQuestions });
        }).catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [quizId]);

  useEffect(() => {
    if (quiz && quiz.timeLimit) {
      startTimer();
    }
    return () => {
      clearTimer();
    };
  }, [quiz]);

  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;

  const handleSubmitQuiz = () => {
    onOpen();
  };

  const confirmSubmit = () => {
    if (quizId) {
      setLoading(true);
      submitQuiz(selectedOptions, quizId)
        .then((response) => {
          if (response.message.hasOwnProperty('message')) {
            clearTimer();
            toast({
              title: 'Quiz Submitted!',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
            navigate('/quiz');
          } else {
            throw new Error('Error submitting quiz');
          }
        }).catch((error) => {
          toast({
            title: 'Error submitting quiz',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    onClose();
  };

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleGoToQuestion = (questionIndex: number) => {
    setCurrentQuestionIndex(questionIndex);
  };

  const maxQuestions = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const currentQuestion = quiz?.questions?.[currentQuestionIndex];

  return (
    <Box p={4} mx="auto">
      {isLoading && <Loader />}
      <Heading as="h1" mb={4} textAlign="center">
        {quiz?.title}
      </Heading>
      <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
        <Box w={{ base: '100%', md: '250px' }} p={4} borderWidth="1px" borderRadius="md">
          <VStack align="start" spacing={2}>
            <Text fontWeight="bold" fontSize="lg">
              Quiz Navigation
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={2}>
              {quiz?.questions?.map((_, index) => (
                <Button
                  key={index}
                  variant={currentQuestionIndex === index ? 'solid' : 'outline'}
                  onClick={() => handleGoToQuestion(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </Grid>
          </VStack>
        </Box>

        <Box mt={{ base: 8, md: 0 }} flex="1">
          <Flex alignItems="center">
            <Heading as="h2" size="lg" mb={4}>
              Question {currentQuestionIndex + 1}
            </Heading>
            <Spacer />
            <Text ml={2} fontSize="md" color="gray.600">
              <Text as='b'>Time Left:</Text> {minutesLeft}m {secondsLeft}s
            </Text>
          </Flex>
          <Text mb={8}>{currentQuestion?.question}</Text>
          <Stack spacing={4}>
            {currentQuestion?.options.map((option, index) => (
              <FormControl key={index}>
                <Radio
                  id={`${currentQuestion.id}-${index}`}
                  name={`${currentQuestion.id}`}
                  isChecked={selectedOptions[Number(currentQuestion.id)] === index}
                  onChange={() => handleOptionSelect(Number(currentQuestion.id), index)}
                >
                  {option}
                </Radio>
              </FormControl>
            ))}
          </Stack>
        </Box>
      </Flex>
      <Stack direction="row" spacing={4} mt={8} justifyContent="flex-end">
        {currentQuestionIndex > 0 && (
          <Button onClick={handlePreviousQuestion}>Previous</Button>
        )}
        {currentQuestionIndex < (quiz?.numOfQuestions ?? 0) - 1 && (
          <Button onClick={handleNextQuestion}>Next</Button>
        )}
        {currentQuestionIndex === (quiz?.numOfQuestions ?? 0) - 1 && (
          <Button onClick={handleSubmitQuiz}>Submit</Button>
        )}
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Submit Quiz
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to Submit the Quiz?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={confirmSubmit} ml={3}>
                Submit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Stack>
    </Box>
  );
};

export default QuizPage;

async function getQuiz(quiz_id: string): Promise<{ quiz: Quiz }> {
  const backendURL = envVariables.backendURL;
  return await fetch(backendURL + '/getStudentQuiz', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'id': quiz_id,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return {};
    });
}

async function submitQuiz(selectedOptions: { [key: number]: number; }, quiz_id: string): Promise<{ message: JSON }> {
  const stud_email = getLoggedInUserEmail();
  const backendURL = envVariables.backendURL;
  return await fetch(backendURL + '/submitQuiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ selectedOptions: selectedOptions, quiz_id: quiz_id, stud_email: stud_email }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return {};
    });
}

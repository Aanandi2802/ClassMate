// Author: Raj Soni
import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Button, Text, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Table, Tbody } from '@chakra-ui/react';
import { Quiz } from '../model/quiz.model';
import envVariables from '../../importenv';
import Loader from '../../loading';
import { getLoggedInUserType } from '../../service/LoginState';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = React.lazy(() => import('./CreateQuiz'));
const QuestionBankPage = React.lazy(() => import('./QuestionBank'));
const QuizDetailsModal = React.lazy(() => import('./QuizDetailsModal'));
const QuizTableRow = React.lazy(() => import('./QuizTableRow'));

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>();
  const [isLoading, setLoading] = useState(false);
  const [isProfessor, setIsProfessor] = useState<boolean>(false);
  const [editQuizData, setEditQuizData] = useState<Quiz>();

  const navigate = useNavigate();

  const fetchQuizzes = () => {
    const user_type = getLoggedInUserType();
    if (user_type) {
      setLoading(true);
      if (user_type === 'prof') {
        setIsProfessor(true);
        getAllQuizzes()
          .then((response) => {
            setQuizzes(response.quizzes);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setIsProfessor(false);
        getAllQuizzesForStudent()
          .then((response) => {
            setQuizzes(response.quizzes);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } else {
      navigate('/error');
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleEdit = (quiz: Quiz | null) => {
    if(quiz){
      setEditQuizData(quiz);
    }
    onCreateQuizOpen();
  };

  const handleDelete = (quizId: string) => {
    setSelectedQuizId(quizId);
    onDeleteOpen();
    console.log(`Delete quiz with ID: ${quizId}`);
  };

  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const { isOpen: isCreateQuizOpen, onOpen: onCreateQuizOpen, onClose: onCreateQuizClose } =
    useDisclosure();

  const { isOpen: isQuestionBankOpen, onOpen: onQuestionBankOpen, onClose: onQuestionBankClose } =
    useDisclosure();

  const cancelRef = React.useRef<HTMLButtonElement | null>(null);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const confirmDelete = () => {
    deleteQuiz(selectedQuizId);
    onDeleteClose();
    fetchQuizzes();
  };

  const onQuizModelClose = () => {
    setEditQuizData(undefined);
    onCreateQuizClose();
  }

  return (
    <>
      {isLoading && <Loader />}
      <Box p={4}>
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
          <Heading as="h1" size="lg" textAlign="center" mb={2} ml={5}>
            Quiz List
          </Heading>
          {isProfessor && (
            <Flex>
              <Button
                onClick={onCreateQuizOpen}
                colorScheme="green"
                variant="solid"
                mr={2}
                mb={{ base: 2, md: 0 }}
                width={{ base: '100%', md: 'auto' }}
              >
                Create Quiz
              </Button>
              <Button
                onClick={onQuestionBankOpen}
                colorScheme="green"
                variant="solid"
                mr={2}
                mb={{ base: 2, md: 0 }}
                width={{ base: '100%', md: 'auto' }}
              >
                Question Bank
              </Button>
            </Flex>
          )}
        </Flex>
      </Box>

      <Box p={4}>
        {quizzes && quizzes.length > 0 ? (
          <Table variant='striped'>
            <Tbody>
              {quizzes.map((quiz) => (
                <QuizTableRow key={quiz._id} quiz={quiz} onEditQuiz={handleEdit} onDeleteQuiz={handleDelete} isProfessor={isProfessor} />
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text>No quizzes found.</Text>
        )}
      </Box>
      <CreateQuiz isOpenQuizModel={isCreateQuizOpen} onCloseQuizModel={onQuizModelClose} editQuizData={editQuizData} fetchQuizzes={fetchQuizzes}/>
      <QuestionBankPage isQuestionBankModel={isQuestionBankOpen} onCloseQuestionBankModel={onQuestionBankClose} />

      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelRef} onClose={onDeleteClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Quiz
          </AlertDialogHeader>
          <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onDeleteClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={confirmDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <QuizDetailsModal isOpen={!!selectedQuiz} onClose={() => setSelectedQuiz(null)} quiz={selectedQuiz} />
    </>
  );
};

export default QuizList;

async function getAllQuizzes(): Promise<{ quizzes: Quiz[] }> {
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
      return { users: [] };
    });
}

async function getAllQuizzesForStudent(): Promise<{ quizzes: Quiz[] }> {
  const backendURL = envVariables.backendURL;
  const localCourseId = localStorage.getItem('course_id');
  const courseID: string = localCourseId ? localCourseId : '';
  return await fetch(backendURL + '/listQuiz', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'user-type': 'stud',
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

async function deleteQuiz(quiz_id: string | null): Promise<{ quiz: Quiz }> {
  const backendURL = envVariables.backendURL;
  return await fetch(backendURL + '/deleteQuiz', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "id": quiz_id }),
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

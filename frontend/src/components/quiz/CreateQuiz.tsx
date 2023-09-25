// Author: Raj Soni
import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Switch,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
  Stack,
  useBreakpointValue,
  Select,
  useToast,
} from '@chakra-ui/react';
import envVariables from '../../importenv';
import { Quiz, QuizQuestion } from '../model/quiz.model';
import Loader from '../../loading';

interface CreateQuizProps {
  isOpenQuizModel: boolean;
  onCloseQuizModel: () => void;
  editQuizData?: Quiz | undefined;
  fetchQuizzes: () => void;
}

const CreateQuiz: React.FC<CreateQuizProps> = ({ isOpenQuizModel, onCloseQuizModel, editQuizData, fetchQuizzes }) => {
  const initialFormData = {
    title: '',
    description: '',
    startDate: '',
    dueDate: '',
    visibleDate: '',
    timeLimit: 0,
    numOfQuestions: 0,
    randomQuestions: false,
    questions: [] as QuizQuestion[],
    totalMarks: 0,
    courseID: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const [filledQuestions, setFilledQuestions] = useState<QuizQuestion>({
    id: Date.now().toString(),
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  });

  interface ValidationErrors {
    title: boolean;
    startDate: boolean;
    dueDate: boolean;
    visibleDate: boolean;
    timeLimit: boolean;
    numOfQuestions: boolean;
    totalMarks: boolean;
  }

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    title: false,
    startDate: false,
    dueDate: false,
    visibleDate: false,
    timeLimit: false,
    numOfQuestions: false,
    totalMarks: false,
  });

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (editQuizData) {
      setFormData({
        title: editQuizData.title ?? '',
        description: editQuizData.description ?? '',
        startDate: editQuizData.startDate ?? '',
        dueDate: editQuizData.dueDate ?? '',
        visibleDate: editQuizData.visibleDate ?? '',
        timeLimit: editQuizData.timeLimit ?? 0,
        numOfQuestions: editQuizData.numOfQuestions ?? 0,
        randomQuestions: editQuizData.randomQuestions ?? false,
        questions: editQuizData.questions ?? [] as QuizQuestion[],
        totalMarks: editQuizData.totalMarks ?? 0,
        courseID: editQuizData.courseID ?? '',
      });
    }
  }, [editQuizData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'randomQuestions') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: !formData.randomQuestions,
      }));
    } else if (!isNaN(Number(value))) {
      const intValue = parseInt(value, 10);
      const isValidNumber = Number.isInteger(intValue) && intValue >= 0 && intValue <= 100;

      if (isValidNumber) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: intValue,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleAddQuestion = () => {
    setFormData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, filledQuestions],
    }));
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    };
    setFilledQuestions(newQuestion);
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
    setFormData((prevData) => ({
      ...prevData,
      questions: prevData.questions.filter((question) => question.id !== questionId),
    }));
  };

  const toast = useToast();
  const handleCancel = () => {
    setFormData(initialFormData);
    onCloseQuizModel();
  };

  const handleSave = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const missingFields: (keyof ValidationErrors)[] = ['title', 'startDate', 'dueDate', 'visibleDate', 'timeLimit', 'numOfQuestions'];
    const hasMissingFields = missingFields.some(field => !formData[field]);

    if (hasMissingFields) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        ...missingFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
      }));
      return;
    }

    const courseId = localStorage.getItem('course_id');
    formData.courseID = courseId ? courseId : '';
    setFormData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, filledQuestions],
    }));
    if (editQuizData?._id) {
      setLoading(true);
      editQuiz(formData, editQuizData?._id)
        .then((response) => {
          setFormData(initialFormData);
          toast({
            title: 'Quiz Edited!',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.error(error);
        }).finally(() => {
          setLoading(false);
          onCloseQuizModel();
          fetchQuizzes();
        }
        );
    } else {
      setLoading(true);
      createQuiz(formData)
        .then((response) => {
          setFormData(initialFormData);
          toast({
            title: 'Quiz Created!',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.error(error);
        }).finally(() => {
          setLoading(false);
          onCloseQuizModel();
          fetchQuizzes();
        }
        );
    }


  };

  const isMobile = useBreakpointValue({ base: true, lg: false });
  const currentDate = new Date().toISOString().split('T')[0];
  const isStartDateFilled = !!formData.startDate;

  return (
    <Modal isOpen={isOpenQuizModel} onClose={handleCancel} size="xl" scrollBehavior="inside">
      {isLoading && <Loader />}
      <ModalOverlay />
      <ModalContent>
        {editQuizData?._id ? (
          <ModalHeader>Edit Quiz</ModalHeader>
        ) : (
          <ModalHeader>Create Quiz</ModalHeader>)}
        <ModalCloseButton />
        <ModalBody>
          <Box p={4}>
            <form>
              <FormControl isRequired>
                <FormLabel>Quiz Title</FormLabel>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  isInvalid={!formData.title && validationErrors.title}
                />
                {validationErrors.title && !formData.title && (
                  <Text color="red" fontSize="sm">Quiz Title is required.</Text>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </FormControl>

              <Stack spacing={isMobile ? 4 : 0} mt={4}>
                <FormControl isRequired>
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    isInvalid={!formData.startDate && validationErrors.startDate}
                    min={currentDate}
                  />
                  {validationErrors.startDate && !formData.startDate && (
                    <Text color="red" fontSize="sm">Start Date is required.</Text>
                  )}
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Due Date</FormLabel>
                  <Input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    isInvalid={!formData.dueDate && validationErrors.dueDate}
                    min={formData.startDate || currentDate}
                    disabled={!isStartDateFilled}
                  />
                  {validationErrors.dueDate && !formData.dueDate && (
                    <Text color="red" fontSize="sm">Due Date is required.</Text>
                  )}
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Visible Date</FormLabel>
                  <Input
                    type="date"
                    name="visibleDate"
                    value={formData.visibleDate}
                    onChange={handleInputChange}
                    isInvalid={!formData.visibleDate && validationErrors.visibleDate}
                    disabled={!isStartDateFilled}
                    max={formData.dueDate}
                  />
                  {validationErrors.visibleDate && !formData.visibleDate && (
                    <Text color="red" fontSize="sm">Visible Date is required.</Text>
                  )}
                </FormControl>
              </Stack>

              <Stack spacing={isMobile ? 4 : 0} mt={4}>
                <FormControl isRequired>
                  <FormLabel>Time Limit (minutes)</FormLabel>
                  <Input
                    type="number"
                    name="timeLimit"
                    value={formData.timeLimit}
                    onChange={handleInputChange}
                    isInvalid={!formData.timeLimit && validationErrors.timeLimit}
                    min={0}
                    max={100}
                    step={1}
                  />
                  {validationErrors.timeLimit && !formData.timeLimit && (
                    <Text color="red" fontSize="sm">Time Limit is required.</Text>
                  )}
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Number of Questions</FormLabel>
                  <Input
                    type="number"
                    name="numOfQuestions"
                    value={formData.numOfQuestions}
                    onChange={handleInputChange}
                    isInvalid={!formData.numOfQuestions && validationErrors.numOfQuestions}
                    min={0}
                    max={100}
                    step={1}
                  />
                  {validationErrors.numOfQuestions && !formData.numOfQuestions && (
                    <Text color="red" fontSize="sm">Number of Questions is required.</Text>
                  )}
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Total marks</FormLabel>
                  <Input
                    type="number"
                    name="totalMarks"
                    value={formData.totalMarks}
                    onChange={handleInputChange}
                    isInvalid={!formData.totalMarks && validationErrors.totalMarks}
                    min={0}
                    max={100}
                    step={1}
                  />
                  {validationErrors.totalMarks && !formData.totalMarks && (
                    <Text color="red" fontSize="sm">Total marks is required.</Text>
                  )}
                </FormControl>
              </Stack>

              <FormControl display="flex" alignItems="center" mt={4}>
                <FormLabel htmlFor="randomQuestions" mb={0}>
                  Random Questions
                </FormLabel>
                <Switch
                  id="randomQuestions"
                  name="randomQuestions"
                  isChecked={formData.randomQuestions}
                  onChange={handleInputChange}
                  ml={2}
                />
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
                  mb={4}
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
                      >Remove</Button>
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
                  name="newCorrectAnswer"
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

              <Button colorScheme="teal" onClick={handleAddQuestion} mt={4} mb={4}>
                Add Question
              </Button>

              {formData.questions.length > 0 &&
                formData.questions.map((question, index) => (
                  <Box key={question.id} borderWidth="1px" p={4} borderRadius="md">
                    <Text>{question.question}</Text>
                    {question.options.map((option, optionIndex) => (
                      <Text key={optionIndex} ml={4}>
                        {optionIndex + 1}. {option}
                      </Text>
                    ))}
                    <Text ml={4} fontWeight="bold">
                      Correct Answer: {question.options[question.correctAnswer]}
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
            </form>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" onClick={handleCancel}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={handleSave} ml={2}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateQuiz;

async function createQuiz(quiz: Quiz): Promise<{ quiz: Quiz }> {
  const backendURL = envVariables.backendURL;
  return await fetch(backendURL + '/createQuiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quiz),
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

async function editQuiz(quiz: Quiz, quiz_id: string): Promise<void> {
  const backendURL = envVariables.backendURL;
  quiz._id = quiz_id;
  return await fetch(backendURL + '/updateQuiz', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quiz),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to edit the quiz.');
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

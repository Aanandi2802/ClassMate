// Author: Raj Soni
import React from 'react';
import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Stack,
} from '@chakra-ui/react';
import { Quiz, QuizQuestion } from '../model/quiz.model';

interface QuizDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    quiz: Quiz | null;
}

const QuizDetailsModal: React.FC<QuizDetailsModalProps> = ({ isOpen, onClose, quiz }) => {
    if (!quiz) return null;

    const questions: QuizQuestion[] = quiz.questions ?? [];

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{quiz.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontWeight="bold">Description:</Text>
                    <Text>{quiz.description}</Text>

                    <Text fontWeight="bold">Quiz Details:</Text>
                    <Stack spacing={2}>
                        <Text>Start Date: {quiz.startDate}</Text>
                        <Text>Due Date: {quiz.dueDate}</Text>
                        <Text>Visible Date: {quiz.visibleDate}</Text>
                        <Text>Time Limit: {quiz.timeLimit}</Text>
                        <Text>Number of Questions: {quiz.numOfQuestions}</Text>
                        <Text>Random Questions: {quiz.randomQuestions ? 'True' : 'False'}</Text>
                    </Stack>

                    {questions.length > 0 && (
                        <>
                            <Text fontWeight="bold" mt={4}>
                                Questions:
                            </Text>
                            <Stack spacing={4}>
                                {questions.map((question, index) => (
                                    <Box key={index} borderWidth="1px" p={4} borderRadius="md">
                                        <Text fontWeight="bold">Question {index + 1}:</Text>
                                        <Text>{question.question}</Text>

                                        <Text fontWeight="bold" mt={2}>
                                            Options:
                                        </Text>
                                        <Stack spacing={1}>
                                            {question.options.map((option, optionIndex) => (
                                                <Text key={optionIndex}>{optionIndex + 1}. {option}</Text>
                                            ))}
                                        </Stack>

                                        <Text fontWeight="bold" mt={2}>
                                            Correct Answer: {question.options[question.correctAnswer]}
                                        </Text>
                                    </Box>
                                ))}
                            </Stack>
                        </>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default QuizDetailsModal;

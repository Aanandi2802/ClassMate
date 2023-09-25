// Author: Raj Soni
import React, { useState, useCallback } from 'react';
import { Tr, Td, Button, Flex, ButtonGroup } from '@chakra-ui/react';
import { Quiz } from '../model/quiz.model';
import StartQuizAlert from './StartQuizAlert';
import QuizDetailsModal from './QuizDetailsModal';
import { useNavigate } from 'react-router-dom';

interface QuizTableRowProps {
    quiz: Quiz;
    onEditQuiz: (quiz: Quiz) => void;
    onDeleteQuiz: (quizId: string) => void;
    isProfessor: boolean;
}

const QuizTableRow: React.FC<QuizTableRowProps> = ({ quiz, onEditQuiz, onDeleteQuiz, isProfessor }) => {
    const [isStartQuizAlertOpen, setIsStartQuizAlertOpen] = useState(false);
    const [isQuizDetailsModalOpen, setIsQuizDetailsModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleStartQuiz = () => {
        setIsStartQuizAlertOpen(false);
        navigate('/quiz/' + quiz._id);
    };

    const handleQuizDetails = useCallback(() => {
        if (isProfessor) {
            setIsQuizDetailsModalOpen(true);
        } else {
            setIsStartQuizAlertOpen(true);
        }
    }, [isProfessor]);

    const editQuiz = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            if (quiz) {
                onEditQuiz(quiz);
            }
        },
        [onEditQuiz, quiz._id]
    );

    const deleteQuiz = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            if (quiz._id) {
                onDeleteQuiz(quiz._id);
            }
        },
        [onDeleteQuiz, quiz._id]
    );

    return (
        <>
            <Tr cursor="pointer" onClick={handleQuizDetails}>
                <Td fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }}>
                    {quiz.title}
                </Td>
                <Td display={{ base: 'none', md: 'table-cell' }}>{quiz.description}</Td>
                <Td display={{ base: 'none', md: 'table-cell' }}>Start Date: {quiz.startDate}</Td>
                <Td display={{ base: 'none', md: 'table-cell' }}>End Date: {quiz.dueDate}</Td>
                {isProfessor && (
                    <Td display={{ base: 'sm', md: 'table-cell' }} width="20%">
                        <Flex align="center" justify="space-around">
                            <ButtonGroup gap='2'>
                                <Button colorScheme="teal" variant="outline" onClick={editQuiz}>
                                    Edit
                                </Button>
                                <Button colorScheme="red" variant="outline" onClick={deleteQuiz}>
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </Flex>
                    </Td>
                )}
            </Tr>
            {isStartQuizAlertOpen && (
                <StartQuizAlert isOpen={isStartQuizAlertOpen} onClose={() => setIsStartQuizAlertOpen(false)} onStartQuiz={handleStartQuiz} dueDate={quiz.dueDate ? quiz.dueDate : ''} quiz_id={quiz._id ? quiz._id : ''} />
            )}

            {isQuizDetailsModalOpen && (
                <QuizDetailsModal isOpen={isQuizDetailsModalOpen} onClose={() => setIsQuizDetailsModalOpen(false)} quiz={quiz} />
            )}
        </>
    );
};

export default QuizTableRow;

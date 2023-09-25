// Author: Raj Soni
import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, ButtonGroup } from '@chakra-ui/react';
import envVariables from '../../importenv';
import { getLoggedInUserEmail } from '../../service/LoginState';
import Loader from '../../loading';

interface StartQuizAlertProps {
    isOpen: boolean;
    onClose: () => void;
    onStartQuiz: () => void;
    dueDate: string;
    quiz_id: string;
}

const StartQuizAlert: React.FC<StartQuizAlertProps> = ({ isOpen, onClose, onStartQuiz, dueDate, quiz_id }) => {
    const cancelRef = React.useRef<HTMLButtonElement | null>(null);
    const dueDateObject = new Date(dueDate);
    const [status, setStatus] = useState<string>('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        fetchQuizStatus();
    }, []);
    const fetchQuizStatus = async () => {
        setLoading(true);
        await getQuizStatus(quiz_id).then((response) => {
            setStatus(response);
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setLoading(false);
        });
    }

    const hasQuizStarted = () => {
        const currentTime = new Date();
        if (status === 'completed') {
            return true;
        } else {
            return currentTime >= dueDateObject;
        }
    };

    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            {isLoading && <Loader />}
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Start Quiz
                </AlertDialogHeader>
                <AlertDialogBody>
                    {hasQuizStarted()
                        ? "The quiz has already completed or the due date has passed. You can no longer start the quiz."
                        : "Are you sure you want to start the quiz?"}
                </AlertDialogBody>
                <AlertDialogFooter>
                    {hasQuizStarted() ?
                        (<Button ref={cancelRef} onClick={onClose}>
                            Ok
                        </Button>)
                        :
                        (<ButtonGroup>
                            <Button
                                colorScheme="teal"
                                onClick={onStartQuiz}
                            >
                                Start
                            </Button>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                        </ButtonGroup>)}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default StartQuizAlert;

async function getQuizStatus(quiz_id: string) {
    const backendURL = envVariables.backendURL;
    const stud_email = getLoggedInUserEmail();
    return await fetch(backendURL + '/getQuizStatus', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'quiz_id': quiz_id,
            'stud_email': stud_email
        },
    })
        .then((response) => response.json())
        .then((data) => {
            return data.quiz[0].status
        })
        .catch((error) => {
            console.error(error);
            return { quiz: [] };
        });
}

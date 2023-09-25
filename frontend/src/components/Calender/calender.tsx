// Author: Harshil Shah

import React, {useEffect, useState} from "react";
import {Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text} from "@chakra-ui/react";
import envVariables from "../../importenv";
import {Quiz} from "../model/quiz.model";
import {useNavigate} from "react-router-dom";
import Loader from "../../loading";

const DeadlinesPage = () => {

    const backendURL = envVariables.backendURL;
    const user_id = JSON.parse(localStorage.getItem('userData') as string)["user_mail"];
    const [deadlinesList, setDeadLines] = useState<Quiz[]>([]);
    const [isLoading, setLoader] = useState(false);
    const fetchData = async () => {
        try {
            const response = await fetch(`${backendURL}/calender/getQuizDueDatesByUserID?user_id=${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error(response);
            }

            const data: Quiz[] = (await response.json()).response;
            console.log(data);
            data.sort(
                (a, b) => new Date(a.dueDate as string).getTime() - new Date(b.dueDate as string).getTime()
            );
            setDeadLines(data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return error;
        }
    };

    useEffect(() => {
        setLoader(true);
        fetchData().then(r => {
            console.log(r);
            setLoader(false);
        });
    }, []);

    const navigate = useNavigate();

    const handleBoxClick = (boxId: Quiz) => {
        // Do something with the boxId when the box is clicked
        console.log(`Clicked on Box ${boxId}`);
        if (boxId.questions) {
            navigate('/quiz');
        }
    };

    return (<>
            {isLoading && <Loader/>}
            <Card>
                <CardHeader>
                    <Heading mb={4}>Upcoming Deadlines</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider/>} spacing='4'>
                        {deadlinesList.map((quiz: Quiz) => (
                            // <Button onClick={() => handleBoxClick(quiz._id as string)}>
                            <Box onClick={() => handleBoxClick(quiz)} cursor={"pointer"}>
                                <Heading size='xs' textTransform='uppercase'>
                                    {quiz.title}
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {quiz.description}
                                </Text>
                                <Text pt='2' fontSize='sm'>
                                    {quiz.dueDate}
                                </Text>
                            </Box>
                            // </Button>
                        ))}
                    </Stack>
                </CardBody>
            </Card>
        </>
    );
};

export default DeadlinesPage;

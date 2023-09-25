// Author: Harshil Shah
import React, {MutableRefObject} from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast
} from '@chakra-ui/react';
import envVariables from "../../importenv";

interface ForgetPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ForgetPasswordModal: React.FC<ForgetPasswordModalProps> = ({isOpen, onClose}) => {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const toast = useToast();

    const sendForgotPasswordMail = (ref_obj: MutableRefObject<any>) => {
        const backendURL = envVariables.backendURL;

        fetch(backendURL + '/getUserById?user_id=' + ref_obj.current.value, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                console.log(data);
                if (data.message === 'User fetched successful') {
                    console.log(data.response);
                    sendEmail(ref_obj.current.value, data.response).then((isEmailSent) => {
                        if (isEmailSent) {
                            toast({
                                title: 'Email Sent!',
                                status: 'success',
                                duration: 5000,
                                isClosable: true,
                            });
                        } else {
                            toast({
                                title: 'Problem with Sending Email!',
                                status: 'error',
                                duration: 5000,
                                isClosable: true,
                            });
                        }
                    });

                } else {
                    toast({
                        title: data.message,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                }
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    }

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Forgot your password?, No Worries!</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Enter Email</FormLabel>
                            <Input ref={initialRef} placeholder="Link will be shared if the user is registered"/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => sendForgotPasswordMail(initialRef)}
                                colorScheme="blue"
                                mr={3}>
                            Sent Password Reset Link
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};


// Function to send the forgot password email
const sendEmail = async (email: string, user_id: string) => {
    const url = envVariables.frontendURL + '?feature=forgetPassword&user_id=' + user_id;
    console.log("Sending mail to " + email + " with " + url);
    try {
        const response = await fetch(envVariables.backendURL + '/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({to: email, url: url}),
        });
        const data = await response.json();
        // Handle the response data
        console.log(data);
        return data.message === 'Email sent successfully!';
    } catch (error) {
        // Handle any errors
        console.error(error);
        return false;
    }
};


export default ForgetPasswordModal;

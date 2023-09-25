// Author: Harshil Shah
import React, {useState} from 'react';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast
} from '@chakra-ui/react';
import {useLocation, useNavigate} from "react-router-dom";
import envVariables from '../../importenv';

const ForgetPassword = () => {
    // State to manage the form data and errors
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });

    const location = useLocation();

    const [errors, setErrors] = useState({password: '', confirmPassword: ''});

    const toast = useToast();
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validate the form data before submission
        const newErrors = {password: '', confirmPassword: ''};

        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (newErrors.password !== '' || newErrors.confirmPassword !== '') {
            setErrors(newErrors);
            console.log(newErrors);
        } else {
            // Form submission logic here (e.g., API call to update password)
            const user_id = new URLSearchParams(location.search).get('user_id');

            fetch(envVariables.backendURL + '/forgetPassword', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'_id': user_id, 'password': formData.password}),
            })
                .then((response) => response.json())
                .then((data) => {
                    // Handle the response data
                    console.log(data);
                    if (data.message === 'User password update successful') {
                        console.log('Password Reset Successfully!');
                        toast({
                            title: 'Password Reset Successfully!',
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                        });
                        navigate('/login');
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
                    return {};
                });
        }
    };

    // Function to handle form field changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <Box maxWidth="500px" margin="auto" mt="4">
            <form onSubmit={handleSubmit}>
                <FormControl id="password" isRequired mb="4">
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <Alert status="error" mt="2">
                            <AlertIcon/>
                            <AlertDescription>{errors.password}</AlertDescription>
                        </Alert>
                    )}
                </FormControl>

                <FormControl id="confirmPassword" isRequired mb="4">
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                        <Alert status="error" mt="2">
                            <AlertIcon/>
                            <AlertDescription>{errors.confirmPassword}</AlertDescription>
                        </Alert>
                    )}
                </FormControl>

                <Button type="submit" colorScheme="blue" mt="4">
                    Reset Password
                </Button>
            </form>
        </Box>
    );
};

export default ForgetPassword;
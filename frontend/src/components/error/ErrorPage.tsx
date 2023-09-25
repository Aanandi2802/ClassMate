// Author: Raj Soni
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const ErrorPage = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            flexDirection="column"
        >
            <Heading as="h1" size="xl" mb={4}>
                Page Not Accessible
            </Heading>
            <Text fontSize="lg" color="gray.600" textAlign="center">
                The page you are trying to access is not available or you do not have the necessary permissions to view it.
            </Text>
        </Box>
    );
};

export default ErrorPage;

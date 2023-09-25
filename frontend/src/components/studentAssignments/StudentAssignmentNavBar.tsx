import React from 'react';
import { ChakraProvider, Flex, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const StudentAssignmentNavBar: React.FC = () => {

  const navigate = useNavigate(); // Initialize the navigate function

  const handleHistoryClick = () => {
    navigate('/historyAssignments'); // Use the navigate function to redirect to '/history' page
  };
  
    return (
      <ChakraProvider>
        <Flex 
        justifyContent="space-between" 
        alignItems="center"
        padding={4}
        margin={4}
        borderBottom="1px solid #567" // Adding a border at the bottom
        backgroundColor="#f9f9f9" // Adding a background color
        >
          <Text fontSize="18px" fontWeight="bold">Assignment List</Text>
          <Button 
              colorScheme="green"
              border="1px solid green"
              borderRadius="md"
              padding="0.5rem 1rem"
              onClick={handleHistoryClick}
            >
            History</Button>
        </Flex>
      </ChakraProvider>
    );
  };
  
export default StudentAssignmentNavBar;
import React from 'react';
import { ChakraProvider} from '@chakra-ui/react';
import StudentAssignmentList from './studentAssignment';
import StudentAssignmentNavBar from './StudentAssignmentNavBar';

const StudentAssignmentPage: React.FC = () => {
    return (
      <ChakraProvider>

        <StudentAssignmentNavBar />
  
        <StudentAssignmentList/>
  
      </ChakraProvider>
      
    );
  };
  
  export default StudentAssignmentPage;
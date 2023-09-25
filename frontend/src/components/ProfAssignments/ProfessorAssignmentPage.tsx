import React from 'react';
import { ChakraProvider} from '@chakra-ui/react';

import AssignmentBase from './AssignmentBase';
import AssignmentList from './AssignmentList';

const ProfessorAssignmentPage: React.FC = () => {
    return (
      <ChakraProvider>
        
        <AssignmentBase/>
  
        <AssignmentList/>
  
      </ChakraProvider>
      
    );
  };
  
  export default ProfessorAssignmentPage;
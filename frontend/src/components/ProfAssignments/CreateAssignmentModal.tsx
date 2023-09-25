import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  useToast, 
  HStack, // Import HStack from Chakra UI
} from '@chakra-ui/react';
import envVariables from '../../importenv';
import {Assignment} from '../model/profassignment.model';

interface CreateAssignmentModalProps {
  handleAssignmentCreated: (newAssignment: Assignment) => void;
}

const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> = ({ handleAssignmentCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [visibleDate, setVisibleDate] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [grade, setGrade] = useState<number | ''>('');

  const toast = useToast(); // Initialize the useToast hook

    // Function to reset the state values
    const resetState = () => {
      setAssignmentTitle('');
      setVisibleDate('');
      setSubmissionDate('');
      setDescription('');
      setFile(null);
      setGrade('');
    };

  const handleOpen = () => {
    resetState()
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === '' || !isNaN(Number(value))) {
      setGrade(value as number | '');
    }
  };

  const handleSave = () => {
    
  const allowedFileTypes = ['.png', '.img', '.jpeg'];

    // Perform validations
    if (assignmentTitle.length < 6) {
      toast({
        title: 'Error',
        description: 'Assignment Title should be at least 6 characters long.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else if (!visibleDate) {
      toast({
        title: 'Error',
        description: 'Visible Date should not be empty.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else if (!submissionDate) {
      toast({
        title: 'Error',
        description: 'Submission Date should not be empty.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else if (description.length < 5) {
      toast({
        title: 'Error',
        description: 'Description should be at least 5 characters long.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else if (grade === '' || isNaN(grade)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid grade (a number).',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else if (!file || !allowedFileTypes.includes(file.name.substring(file.name.lastIndexOf('.')).toLowerCase())) {

      toast({
        title: 'Error',
        description: 'Please select a valid image as of now.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else {

      const courseId = localStorage.getItem('courseID');

      // Perform save logic here (e.g., API call to save assignment data)
      const assignmentData: Assignment = {
        assignmentTitle,
        visibleDate,
        submissionDate,
        description,
        file,
        grade,
        courseId: courseId ? courseId : '',
      };

      const data = callCreateAssignmentAPI(assignmentData);

      if (data!=null){
          console.log("Assignment created successfully", data);

          toast({
            title: 'Success',
            description: 'Assignment saved successfully!',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });

          console.log(data);
          // Pass the assignment data back to the parent component (AssignmentList) using the callback prop
          handleAssignmentCreated(assignmentData);

          resetState();
          setIsOpen(false);
      }
    }
  };

  return (
    <>
      <Button colorScheme="teal" onClick={handleOpen}>
        Create Assignment
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Assignment Creation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Assignment Title</FormLabel>
              <Input 
                type="text"
                placeholder="Enter assignment title"
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)} />
            </FormControl>

            <HStack mt={4}>
              {/* Horizontal stack for the Visible Date and Submission Date fields */}
              <FormControl>
                <FormLabel>Visible Date</FormLabel>
                <Input type="date" value={visibleDate} onChange={(e) => setVisibleDate(e.target.value)} />
              </FormControl>

              <FormControl>
                <FormLabel>Submission Date</FormLabel>
                <Input type="date" value={submissionDate} onChange={(e) => setSubmissionDate(e.target.value)} />
              </FormControl>
            </HStack>

            {/* New FormControl for the grade field */}
            <FormControl mt={4}>
              <FormLabel>Grade</FormLabel>
              <Input
                type="number"
                placeholder="Enter grade"
                value={grade}
                onChange={handleGradeChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea 
                placeholder="Enter assignment description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Upload File (Any image type)</FormLabel>
              <Input type="file" accept=".doc,.pdf" onChange={(e) => setFile(e.target.files && e.target.files[0])} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Box flex="1" padding={5}>
              <Button variant="ghost" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
            <Button colorScheme="teal" onClick={handleSave}>
                Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateAssignmentModal;

function callCreateAssignmentAPI(assignment : Assignment): Promise<{ assignment: Assignment }> {
  const backendURL = envVariables.backendURL;

  return fetch(backendURL + '/createAssignment', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(assignment),
  })
      .then((response) => response.json())
      .then((data) => {
          // Handle the response data
          console.log(data);
          return data;
      })
      .catch((error) => {
          // Handle any errors
          console.error(error);
          return {};
      });
}
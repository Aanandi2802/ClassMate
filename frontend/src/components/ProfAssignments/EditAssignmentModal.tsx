import React, { useState, useEffect } from 'react';
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
  HStack,
} from '@chakra-ui/react';
import { Assignment } from '../model/profassignment.model';

interface EditAssignmentModalProps {
  assignment: Assignment;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedAssignment: Assignment) => void;
}

const EditAssignmentModal: React.FC<EditAssignmentModalProps> = ({
  assignment,
  isOpen,
  onClose,
  onUpdate,
}) => {
    const [assignmentTitle, setAssignmentTitle] = useState<string>(assignment.assignmentTitle ?? ''); // Initialize with assignment prop value
    const [visibleDate, setVisibleDate] = useState<string>(assignment.visibleDate ?? ''); // Initialize with assignment prop value
    const [submissionDate, setSubmissionDate] = useState<string>(assignment.submissionDate ?? ''); // Initialize with assignment prop value
    const [description, setDescription] = useState<string>(assignment.description ?? ''); // Initialize with assignment prop value
    const [grade, setGrade] = useState<number | ''>(assignment.grade !== undefined ? assignment.grade : '' as number | ''); // Initialize with assignment prop value or empty string if undefined

    const toast = useToast();

    const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value === '' || !isNaN(Number(value))) {
          setGrade(value as number | '');
        }
      };

  useEffect(() => {
    // Pre-populate the data when the modal is opened
    setAssignmentTitle(assignment.assignmentTitle ?? '');
    setVisibleDate(assignment.visibleDate ?? '');
    setSubmissionDate(assignment.submissionDate ?? '');
    setDescription(assignment.description ?? '');
    setGrade(assignment.grade ?? '');
  }, [assignment]);

  const handleUpdate = async () => {
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
      } else if (grade === '' || isNaN(grade as number)) {
        toast({
          title: 'Error',
          description: 'Please enter a valid grade (a number).',
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
      } 
      else {
        // If all validations pass, create the updated assignment object
        const updatedAssignment: Assignment = {
          ...assignment,
          assignmentTitle,
          visibleDate,
          submissionDate,
          description,
          grade: grade as number,
        };

        try {
            onUpdate(updatedAssignment);
    
            // Close the modal
            onClose();
    
            // Show success toast
            toast({
              title: 'Success',
              description: 'Assignment updated successfully!',
              status: 'success',
              duration: 2000,
              isClosable: true,
            });
          } catch (error) {
            // Handle API call errors
            toast({
              title: 'Error',
              description: 'Failed to update assignment. Please try again later.',
              status: 'error',
              duration: 2000,
              isClosable: true,
            });
            console.error(error);
          }
      }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Assignment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Assignment Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter assignment title"
              value={assignmentTitle}
              onChange={(e) => setAssignmentTitle(e.target.value)}
            />
          </FormControl>

          <HStack mt={4}>
            {/* Horizontal stack for the Visible Date and Submission Date fields */}
            <FormControl>
              <FormLabel>Visible Date</FormLabel>
              <Input
                type="date"
                value={visibleDate}
                onChange={(e) => setVisibleDate(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Submission Date</FormLabel>
              <Input
                type="date"
                value={submissionDate}
                onChange={(e) => setSubmissionDate(e.target.value)}
              />
            </FormControl>
          </HStack>

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
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Box flex="1" padding={5}>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </Box>
          <Button colorScheme="teal" onClick={handleUpdate}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditAssignmentModal;

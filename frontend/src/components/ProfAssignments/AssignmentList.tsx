import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Modal,
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalFooter, 
  ModalBody, 
  ModalCloseButton,
  useToast
} from '@chakra-ui/react';
import { Assignment } from '../model/profassignment.model';
import envVariables from '../../importenv';
import Loader from '../../loading';
import EditAssignmentModal from './EditAssignmentModal';

const AssignmentList: React.FC = () => {

    const [assignments, setAssignments] = useState<Assignment[]>([]);    
    const [deleteAssignmentId, setDeleteAssignmentId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
    const [isLoading, setLoading] = useState(false);

    // Callback function to handle the newly created assignment
    const handleAssignmentCreated = (newAssignment: Assignment) => {
        setAssignments((prevAssignments) => [...prevAssignments, newAssignment]);
    };

    const toast = useToast();

    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null); // New state to hold the selected assignment
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // New state to control the visibility of the edit modal

    const handleEditClick = (assignment: Assignment) => {
        setSelectedAssignment(assignment);
        setIsEditModalOpen(true);
      };

    const handleDeleteClick = (assignmentId: string) => {
        setDeleteAssignmentId(assignmentId);
        setIsDeleteModalOpen(true);
    };

    const callToDeleteAssignmentAPI = async (assignmentId: string) => {
        try {
            // Call the delete API to delete the assignment from MongoDB
            await deleteAssignmentFromList(assignmentId);

            // If the API call is successful, remove the assignment from the frontend list
            const updatedAssignments = assignments.filter((assignment) => assignment._id !== assignmentId);
            setAssignments(updatedAssignments);
        } catch (error) {
            // Handle any errors and log them if necessary
            console.error(error);
        }
    };

    const handleDeleteConfirm = () => {
        if (deleteAssignmentId) {
            // API CALL FOR DELETE AN ASSIGNMENT
            callToDeleteAssignmentAPI(deleteAssignmentId);

            // For this example, let's just remove it from the frontend list
            const updatedAssignments = assignments.filter((assignment) => assignment._id !== deleteAssignmentId);
            setAssignments(updatedAssignments);
            setDeleteAssignmentId(null);
            setIsDeleteModalOpen(false);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteAssignmentId(null);
        setIsDeleteModalOpen(false);
    };

    useEffect(() => {
        fetchAssignmentList()
            .then((response: any) => {
                setAssignments(response.assignments);
            })
            .catch((error: any) => {
                console.error(error);
            }).finally(() => {
            setLoading(false);
        });
    }, [assignments]);

      const handleAssignmentUpdated = (updatedAssignment: Assignment) => {
        setLoading(true);
        callUpdateAssignmentAPI(updatedAssignment)
          .then(async () => {
            const assignments = await fetchAssignmentList();
            setAssignments(assignments.assignments);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
            toast({
              title: 'Error',
              description: 'Failed to update assignment. Please try again later.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          });
    
        setIsEditModalOpen(false);
      };

    return (
        <>
            {isLoading && <Loader/>}

            <Box mt={4}>
            {assignments.length > 0 ? (
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Assignment Title</Th>
                            <Th>Visible Date</Th>
                            <Th>Submission Date</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {assignments?.map((assignment) => (
                        <Tr key={(assignment as Assignment & { _id: string })._id}>
                        <Td fontWeight="bold" color="black">{assignment.assignmentTitle}</Td>
                        <Td>{assignment.visibleDate}</Td>
                        <Td>{assignment.submissionDate}</Td>
                        <Td>
                            <Button colorScheme="teal" onClick={() => handleEditClick(assignment)}>
                                Edit
                            </Button>
                            <Button colorScheme="red" onClick={() => handleDeleteClick((assignment as Assignment & { _id: string })._id)} ml={2}>
                                Delete
                            </Button>
                        </Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>
                ) : (
                    <Box textAlign="center" fontSize="18px" fontWeight="bold" mt={4}>
                        No Assignment Data
                    </Box>
                )}

                <Modal isOpen={isDeleteModalOpen} onClose={handleDeleteCancel}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Delete Assignment</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>Are you sure you want to delete this assignment?</ModalBody>
                        <ModalFooter>
                            <Button colorScheme="red" onClick={handleDeleteConfirm}>Yes</Button>
                            <Button ml={4} onClick={handleDeleteCancel}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* Edit Assignment Modal */}
                {selectedAssignment && ( // Only render the modal when selectedAssignment is defined
                <EditAssignmentModal
                    assignment={selectedAssignment}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={handleAssignmentUpdated}
                    />
                )}
            </Box>    
        </>  
    );
};

export default AssignmentList;

async function callUpdateAssignmentAPI(updatedAssignment: Assignment): Promise<Assignment> {
    const backendURL = envVariables.backendURL;
  
    try {
      const response = await fetch(backendURL + '/updateAssignment', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAssignment),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to update assignment.');
    }
  }

async function deleteAssignmentFromList(assignmentId: string) : Promise<void>{

    const backendURL = envVariables.backendURL;

    try {
        const response = await fetch(backendURL + '/deleteAssignment', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: assignmentId }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // If the API call is successful, you might not need to return any data.
        // In this example, we return void to indicate that the delete was successful.
        return;
    } catch (error) {
        // Handle any errors and log them if necessary
        console.error(error);
        throw new Error('Failed to delete assignment.');
    }
}

async function fetchAssignmentList(): Promise<{ assignments: Assignment[] }> {

    const backendURL = envVariables.backendURL;

    return fetch(backendURL + '/getAssignments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        // Handle the response data
        console.log(data);
        return data;
    })
    .catch((error) => {
        // Handle any errors
        console.error(error);
        return { assignments: [] };
    });
}
import { useState, useEffect } from 'react';
import { useToast, Box, Table, Thead, Tbody, Tr, Th, Td, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Textarea, Input, Center } from '@chakra-ui/react';
import envVariables from '../../importenv';
import Loader from '../../loading';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes  } from "firebase/storage";
import { submissionModal } from '../model/submission.model';
import { format } from 'date-fns';

const firebaseConfig = {
  apiKey: "AIzaSyBmT0WKHDhcDGupjI0d1WNB0NS6t8H_lnk",
  authDomain: "viralproject-365216.firebaseapp.com",
  projectId: "viralproject-365216",
  storageBucket: "viralproject-365216.appspot.com",
  messagingSenderId: "784898434856",
  appId: "1:784898434856:web:ba08d82ce4ea701a8d121d",
  measurementId: "G-MPW8JNDGCP"
};

const app = initializeApp(firebaseConfig);

interface Assignment {
  _id: string;
  assignmentTitle: string;
  visibleDate: string;
  submissionDate: string;
  description: string;
  fileUrl: any;
  grade: string;
  courseId: string;
}

const StudentAssignmentList = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState('');
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);

  const toast = useToast();

  const userEmailId = JSON.parse(localStorage.getItem('userData') || "")['user_mail'];

  useEffect(() => {
    fetchAssignmentList()
        .then((response) => {
            // Filter the assignments based on the visibleDate being passed
            const visibleAssignments = response.assignments.filter(
                (assignment) => new Date(assignment.visibleDate) <= new Date()
            );
            setAssignments(visibleAssignments);
        })
        .catch((error) => {
            console.error(error);
            setAssignments([]);
        })
  }, []);

  const handleUploadButtonClick = (assignment: Assignment)=> {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
    setComments('');
    setFileToUpload(null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        setFileToUpload(file);
      } else {
        toast({
          title: 'Only .jpeg and .png files are allowed',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleSave = async () => {
    if (!comments.trim()) {
      toast({
        title: 'Comments cannot be empty',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!fileToUpload) {
      toast({
        title: 'Please select a file to upload',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (selectedAssignment) {
      if (fileToUpload) {
        console.log("File data : ",fileToUpload);
      }else{
        console.log("No data exists");
      }

      try{
        const storage = getStorage(app);
        const storageRef = ref(storage, fileToUpload.name);
    
        const snapshot = await uploadBytes(storageRef, fileToUpload);
        const fileURL = await getDownloadURL(snapshot.ref);
    
        console.log('Uploaded a blob or file!');
        console.log('Download URL:', fileURL);

        try {

          const currentDate = format(new Date(), 'yyyy-MM-dd');

          const studentAssignmentSubmission : submissionModal = {
            comments,
            fileURL,
            userEmailId,
            submissionDate: currentDate,
          };

          console.log("studentAssignmentSubmission===>",studentAssignmentSubmission);

          const backendURL = envVariables.backendURL;
          console.log("backendURL===>",backendURL);

          const response = await fetch(backendURL + '/uploadAssignment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentAssignmentSubmission),
          });

          console.log(response);

          if (response.ok) {
            toast({
              title: 'Assignment data saved successfully',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            handleModalClose();
          } else {
            console.error('Failed to update assignment');
            toast({
              title: 'Failed to update assignment',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }
        } catch (error) {
          console.error(error);
          toast({
            title: 'Error while saving assignment data',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      
        }catch (error) {
            console.log(error);
        }
    }else{
      console.log("Not selected assignment");
    }
  };

  return (
    <>
      {isLoading && <Loader/>}
        <Box p={4}>

        {assignments.length > 0 ? (
          <Table variant="simple" colorScheme="teal">
            <Thead>
              <Tr>
                <Th fontWeight="bold" color="black">Assignment Title</Th>
                <Th fontWeight="bold" color="black">Submission Deadline</Th>
                <Th fontWeight="bold" color="black">Assignment Marks</Th>
                <Th fontWeight="bold" color="black">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {assignments.map((assignment) => (
                <Tr key={assignment._id} cursor="pointer">
                  <Td fontWeight="bold" color="black">{assignment.assignmentTitle}</Td>
                  <Td >{assignment.submissionDate}</Td>
                  <Td >{assignment.grade}</Td>
                  <Td>
                    <Button colorScheme="blue" onClick={() => handleUploadButtonClick(assignment)}>
                      Upload Assignment
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
        
          {/* Modal */}
          <Modal isOpen={isModalOpen} onClose={handleModalClose}>
              <ModalOverlay />
              <ModalContent>
              <ModalHeader>Add Comments and Upload File</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                  <Textarea
                  placeholder="Add comments..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  />
                  <Input name='file' type="file" accept=".jpeg, .png" onChange={handleFileChange} />
              </ModalBody>
              <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleSave}>
                      Save
                  </Button>
                  <Button onClick={handleModalClose}>Cancel</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
      </Box>
    </>
    
  );
};

export default StudentAssignmentList;

function fetchAssignmentList(): Promise<{ assignments: Assignment[] }> {

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
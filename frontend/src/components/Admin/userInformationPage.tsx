import React, { useState } from 'react';
import {
  Box,
  Flex,
  ChakraProvider,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import AdminNavBar from './adminNavigationBar';
import TableWithFilters from '../UserManagement/listUsers';
import SignUp from '../UserManagement/createUser';

const UserInformationPage = () => {
  const [showModal, setShowModal] = useState(false);

  const openUserModal = () => {
    setShowModal(true);
  };

  const closeUserModal = () => {
    setShowModal(false);
  };

  const handleUserCreated = () => {
    closeUserModal();
  };

  return (
    <ChakraProvider>
      <Box>
        <AdminNavBar />
      </Box>
      <VStack spacing={4} align="start">
        <Box p={8}>
          <Box>
            <Button
              colorScheme="teal"
              leftIcon={<Box as="span">+</Box>}
              onClick={() => openUserModal()}
            >
              Create User
            </Button>
          </Box>

          {/* Modal for user creation */}
          <Modal isOpen={showModal} onClose={closeUserModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create User</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* Render SignUp component inside the modal */}
                <SignUp />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="teal" mr={3} onClick={closeUserModal}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>

        <TableWithFilters />
      </VStack>
    </ChakraProvider>
  );
};

export default UserInformationPage;

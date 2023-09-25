// Author: Harshil Shah
import React, {useEffect, useState} from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import {User} from '../model/user.model';

interface EditUserModalProps {
    user: User | null;
    onClose: () => void;
    onUpdateUser: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({user, onClose, onUpdateUser}) => {
    const [updatedUser, setUpdatedUser] = useState<User | null>(null);

    useEffect(() => {
        if (user) {
            // Clone the user object to create an editable copy
            setUpdatedUser({...user});
        }
    }, [user]);

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (updatedUser) {
            // Update the first_name field in the updatedUser object
            setUpdatedUser({...updatedUser, first_name: event.target.value});
        }
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (updatedUser) {
            // Update the last_name field in the updatedUser object
            setUpdatedUser({...updatedUser, last_name: event.target.value});
            console.log(updatedUser);
        }
    };


    const handleUpdateUser = () => {
        if (updatedUser) {
            // Call the onUpdateUser callback with the updated user data
            onUpdateUser(updatedUser);
        }
    };

    return (
        <Modal isOpen={!!user} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Edit User</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    {updatedUser && (
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input value={updatedUser.user_email || ''} isReadOnly/>

                            <FormLabel>First Name</FormLabel>
                            <Input value={updatedUser.first_name || ''} onChange={handleFirstNameChange}/>

                            <FormLabel>Last Name</FormLabel>
                            <Input value={updatedUser.last_name || ''} onChange={handleLastNameChange}/>


                        </FormControl>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleUpdateUser}>
                        Update
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditUserModal;

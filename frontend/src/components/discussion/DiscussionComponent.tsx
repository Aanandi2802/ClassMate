import React, { useState } from "react";
import { Discussion } from "../model/discussions.model";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Textarea,
} from "@chakra-ui/react";

interface DiscussionComponentProps {
  discussion: Discussion;
  onEdit: (editedDiscussion: Discussion) => void;
  onDelete: () => void;
}

function DiscussionComponent({
  discussion,
  onEdit,
  onDelete,
}: DiscussionComponentProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedContent, setEditedContent] = useState(discussion.content);

  const userData = JSON.parse(localStorage.getItem("userData") || "");
  const currentUserEmail = (userData && userData.user_mail) || "";

  const handleEdit = () => {
    // Allow editing only if the current user matches the discussion's user ID
    if (currentUserEmail === discussion.userID) {
      setShowEditModal(true);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedContent(discussion.content); // Reset the edited content
  };

  const handleSaveEdit = () => {
    const editedDiscussion: Discussion = {
      ...discussion,
      content: editedContent,
    };
    onEdit(editedDiscussion);
    setShowEditModal(false);
  };

  return (
    <Box className="discussion" p={4} borderWidth="1px" borderRadius="md">
      <p>{discussion.content}</p>
      <p>User ID: {discussion.userID}</p>
      <p>Course ID: {discussion.courseID}</p>
      {/* Display other discussion details */}
      {currentUserEmail === discussion.userID && (
        <Box mt={2}>
          <Button onClick={handleEdit} colorScheme="blue" mr={2}>
            Edit
          </Button>
          <Button onClick={onDelete} colorScheme="red">
            Delete
          </Button>
        </Box>
      )}

      {/* Edit Modal */}
      <Modal isOpen={showEditModal} onClose={handleCloseEditModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Discussion</ModalHeader>
          <ModalBody>
            <Textarea
              rows={4}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleCloseEditModal}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSaveEdit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default DiscussionComponent;

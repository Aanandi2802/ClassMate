import React, { useEffect, useState } from "react";
import DiscussionComponent from "./DiscussionComponent";
import envVariables from "../../importenv";
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
  Stack,
  Select,
  FormControl,
  FormLabel,
  Container,
} from "@chakra-ui/react";

function DiscussionList() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [sortedDiscussions, setSortedDiscussions] = useState<Discussion[]>([]);
  const [availableCourseIDs, setAvailableCourseIDs] = useState<string[]>([]);
  const [selectedCourseID, setSelectedCourseID] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDiscussionCourseID, setNewDiscussionCourseID] = useState("");
  const [newDiscussionContent, setNewDiscussionContent] = useState("");

  const handleOpenModal = () => {
    console.log("called");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewDiscussionCourseID("");
    setNewDiscussionContent("");
  };

  // Inside your DiscussionList component
  const handleCreateDiscussion = async () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "");
    const userEmail = (userData && userData.user_mail) || "";

    const newDiscussion = {
      userID: userEmail,
      courseID: newDiscussionCourseID,
      content: newDiscussionContent,
    };

    try {
      const response = await fetch(`${backendURL}/create-discussion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDiscussion),
      });

      if (response.ok) {
        console.log("Discussion created:", newDiscussion);
        // Fetch updated discussions after successful create
        fetchDiscussions();
      } else {
        console.error("Failed to create discussion.");
      }
    } catch (error) {
      console.error("Error creating discussion:", error);
    }

    handleCloseModal();
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = () => {
    fetchDiscussionsFromBackend().then((fetchedDiscussions: Discussion[]) => {
      console.log(fetchedDiscussions)
      if (fetchedDiscussions.length > 0) {
        setDiscussions(fetchedDiscussions);

        const uniqueCourseIDs = [
          ...new Set(
            fetchedDiscussions.map((discussion) => discussion.courseID)
          ),
        ].filter((courseID) => courseID !== undefined) as string[];
        setAvailableCourseIDs(uniqueCourseIDs);
      } else {
        setDiscussions([]);
        setAvailableCourseIDs([]);
      }
    });
  };
  const backendURL = envVariables.backendURL;

  function fetchDiscussionsFromBackend() {
    return fetch(`${backendURL}/discussion`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          return data;
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  useEffect(() => {
    const sortedFilteredDiscussions = discussions.filter((discussion) =>
      selectedCourseID ? discussion.courseID === selectedCourseID : true
    );
    setSortedDiscussions(sortedFilteredDiscussions);
  }, [selectedCourseID, discussions]);

  const handleEditDiscussion = async (editedDiscussion: Discussion) => {
    try {
      const response = await fetch(
        `${backendURL}/update-discussion/${editedDiscussion._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedDiscussion), // Send the edited discussion object
        }
      );

      if (response.ok) {
        console.log("Discussion updated:", editedDiscussion);
        // Fetch updated discussions after successful update
        fetchDiscussions();
      } else {
        console.error("Failed to update discussion.");
      }
    } catch (error) {
      console.error("Error updating discussion:", error);
    }
  };

  const handleDeleteDiscussion = async (discussion: Discussion) => {
    try {
      const response = await fetch(
        `${backendURL}/delete-discussion/${discussion._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Discussion deleted:", discussion);
        // Fetch updated discussions after successful delete
        fetchDiscussions();
      } else {
        console.error("Failed to delete discussion.");
      }
    } catch (error) {
      console.error("Error deleting discussion:", error);
    }
  };

  const handleEditDiscussionInList = (editedDiscussion: Discussion) => {
    // Find the index of the edited discussion in the discussions array
    const editedDiscussionIndex = discussions.findIndex(
      (discussion) => discussion._id === editedDiscussion._id
    );

    if (editedDiscussionIndex !== -1) {
      // Create a copy of the discussions array and update the edited discussion
      const updatedDiscussions = [...discussions];
      updatedDiscussions[editedDiscussionIndex] = editedDiscussion;

      // Update the state with the updated discussions array
      setDiscussions(updatedDiscussions);
      handleEditDiscussion(editedDiscussion); // Call the API to save changes
    }
  };

  return (
    <Container mt={4}>
    <Box textAlign="center" fontSize="xl" fontWeight="bold">
      Discussions
    </Box>
    <Stack direction="row" spacing={4} mt={4} mb={2} className="d-flex">
      <Button onClick={handleOpenModal} colorScheme="blue" mr={2}>
        Add Discussion
      </Button>
      <FormControl>
        <FormLabel>Sort by Course ID:</FormLabel>
        <Select
          value={selectedCourseID}
          onChange={(event) => setSelectedCourseID(event.target.value)}
        >
          <option value="">All Courses</option>
          {availableCourseIDs.map((courseID) => (
            <option key={courseID} value={courseID}>
              {courseID}
            </option>
          ))}
        </Select>
      </FormControl>
    </Stack>
    <Stack spacing={4}>
      {sortedDiscussions.map((discussion, index) => (
        <DiscussionComponent
          key={index}
          discussion={discussion}
          onEdit={handleEditDiscussionInList}
          onDelete={() => handleDeleteDiscussion(discussion)}
        />
      ))}
    </Stack>
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Discussion</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Course ID:</FormLabel>
            {/* Change the following Textarea to Select */}
            <Select
              value={newDiscussionCourseID}
              onChange={(event) =>
                setNewDiscussionCourseID(event.target.value)
              }
            >
              <option value="">Select Course ID</option>
              {availableCourseIDs.map((courseID) => (
                <option key={courseID} value={courseID}>
                  {courseID}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Content:</FormLabel>
            <Textarea
              rows={4}
              value={newDiscussionContent}
              onChange={(event) =>
                setNewDiscussionContent(event.target.value)
              }
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleCreateDiscussion}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </Container>
  );
}

export default DiscussionList;
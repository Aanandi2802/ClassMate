import React, { useEffect, useState } from "react";
import {
  Box,
  ChakraProvider,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import AdminNavBar from "./adminNavigationBar";
import { Accordion } from "react-bootstrap";
import envVariables from "../../importenv";
import { User } from "../model/user.model";

const PendingApproval = () => {
  const backendURL = envVariables.backendURL;
  const [users, setUsers] = useState<User[]>([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  useEffect(() => {
    fetchUsersWithPendingStatus();
  }, []);

  const fetchUsersWithPendingStatus = async () => {
    try {
      const response = await fetch(`${backendURL}/listUsers`, {
        method: "POST", // Use POST method
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      });
      const data = await response.json();

      if (response.ok) {
        // Filter users with status "pending"
        const pendingUsers = data.users.filter(
          (user: User) => user.status === "pending"
        );
        setUsers(pendingUsers);
      } else {
        // Handle error scenario
        console.log("Failed to fetch users with pending status");
      }
    } catch (error) {
      console.error(error);
      console.log("An error occurred while fetching users");
    }
  };

  // Function to handle approval confirmation
  const handleApproveConfirm = async () => {
    if (selectedUserId) {
      try {
        const response = await fetch(
          `${backendURL}/listUsers/${selectedUserId}/approve`,
          {
            method: "PUT", // Use PUT method
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
            },
          }
        );

        if (response.ok) {
          // Successfully approved the user, update the UI if needed
          console.log("User approved successfully!");
          fetchUsersWithPendingStatus();
        } else {
          // Handle error scenario
          console.error("Failed to approve the user.");
        }
      } catch (error) {
        console.error(error);
        console.log("An error occurred while approving the user");
      }

      // Close the approval confirmation modal
      handleClose();
    }
  };

  // Function to handle rejection confirmation
  const handleRejectConfirm = async () => {
    if (selectedUserId) {
      try {
        const response = await fetch(
          `${backendURL}/listUsers/${selectedUserId}/reject`,
          {
            method: "DELETE", // Use PUT method
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
            },
          }
        );

        if (response.ok) {
          // Successfully rejected the user, update the UI if needed
          console.log("User rejected successfully!");
          fetchUsersWithPendingStatus();
        } else {
          // Handle error scenario
          console.error("Failed to reject the user.");
        }
      } catch (error) {
        console.error(error);
        console.log("An error occurred while rejecting the user");
      }

      // Close the rejection confirmation modal
      handleClose2();
    }
  };

  return (
    <ChakraProvider>
      <Box>
        <AdminNavBar />
      </Box>
      <Box p={8}>

        <div
          style={{ marginLeft: "8%", marginBottom: "3%", marginRight: "8%" }}
        >
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            {users.map((user, index) => (
              <Accordion.Item eventKey={index.toString()} key={user._id}>
                <Accordion.Header>Request ID: #{index + 1}</Accordion.Header>

                <Accordion.Body>
                  <div className="d-flex flex-column align-items-start">
                   
                    <h4>{user.first_name + " " + user.last_name}</h4>
                    <p>{user.user_email}</p>
                  </div>
                  <div className="d-flex align-items-start">
                    <Button
                      variant="success"
                      onClick={() => {
                        setSelectedUserId(user._id ?? null); // Use null if user._id is undefined
                        handleShow();
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      className="ms-3"
                      onClick={() => {
                        setSelectedUserId(user._id ?? null); // Use null if user._id is undefined
                        handleShow2();
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>

        {/* Approval Confirmation Modal */}
        <Modal isOpen={show} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are you sure?</ModalHeader>
            <ModalBody>
              You are trying to approve a professor's application.
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={handleClose}>
                Close
              </Button>
              <Button colorScheme="green" onClick={handleApproveConfirm} ml={3}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Rejection Confirmation Modal */}
        <Modal isOpen={show2} onClose={handleClose2}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are you sure?</ModalHeader>
            <ModalBody>
              You are trying to reject a professor's application.
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={handleClose2}>
                Close
              </Button>
              <Button colorScheme="red" onClick={handleRejectConfirm} ml={3}>
                Reject
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default PendingApproval;

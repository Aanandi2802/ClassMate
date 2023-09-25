// Import the User and Course models
import React, { useState, useEffect } from "react";
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
import { Card, Dropdown, DropdownButton, ListGroup } from "react-bootstrap";
import envVariables from "../../importenv";
import { User } from "../model/user.model";
import { course } from "../model/course.model";

const ProfessorMapping = () => {
  const backendURL = envVariables.backendURL;
  const [show, setShow] = useState(false);
  const [courses, setCourses] = useState<course[]>([]);
  const [professors, setProfessors] = useState<User[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<course | null>(null);
  const [selectedProfessor, setSelectedProfessor] = useState<User | null>(null);
  const [selectedProfessors, setSelectedProfessors] = useState<(User | null)[]>(
    []
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isProfessorsLoaded = professors.length > 0;

  useEffect(() => {
    fetchProfessors();
    fetchCourses();
  }, [setProfessors, setSelectedCourse]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${backendURL}/get-courses`);
      const data = await response.json();

      if (response.ok) {
        setCourses(data.courseList);

        // Initialize the selectedProfessors array with the instructorID for each course
        const initialSelectedProfessors = data.courseList.map(
          (course: course) =>
            course.instructorID
              ? professors.find(
                  (prof) => prof.user_email === course.instructorID
                )
              : null
        );
        setSelectedProfessors(initialSelectedProfessors);
      } else {
        console.log("Failed to fetch courses.");
      }
    } catch (error) {
      console.error(error);
      console.log("An error occurred while fetching courses.");
    }
  };

  const fetchProfessors = async () => {
    try {
      const response = await fetch(`${backendURL}/listUsers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        const eligibleProfessors = data.users.filter(
          (user: User) => user.user_type === "prof" && user.status !== "pending"
        );
        setProfessors(eligibleProfessors);
      } else {
        console.log("Failed to fetch professors.");
      }
    } catch (error) {
      console.error(error);
      console.log("An error occurred while fetching professors.");
    }
  };

  const handleOptionSelect = (courseIndex: number, professor: User) => {
    // Create a copy of the selectedProfessors array and update the selected professor for the specific course
    const updatedSelectedProfessors = [...selectedProfessors];
    updatedSelectedProfessors[courseIndex] = professor;
    setSelectedProfessors(updatedSelectedProfessors);

    // Update the selected professor for the entire component
    setSelectedProfessor(professor);
  };

  const handleAllocateConfirm = async () => {
   

    if (selectedCourse && selectedProfessor) {
      // Find the index of the selected course in the courses array
      const courseIndex = courses.findIndex(
        (course) => course._id === selectedCourse._id
      );

      // Get the selected professor for the specific course
      const selectedProf = selectedProfessors[courseIndex];

      // Check if a professor is selected for the specific course
      if (selectedProf) {
        try {
          // Make a POST request to update the course with the selected professor's email ID
          const response = await fetch(
            `${backendURL}/update-course/${selectedCourse._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                instructorID: selectedProf.user_email,
              }),
            }
          );

          if (response.ok) {
            // Course updated successfully, you can fetch the updated course list again if needed
            console.log("Course updated successfully!");
            fetchCourses();
          } else {
            console.error("Failed to update the course.");
          }
        } catch (error) {
          console.error(error);
          console.log("An error occurred while updating the course.");
        }
      }

      // Close the confirmation modal
      handleClose();
    }
  };

  return (
    <ChakraProvider>
      <Box>
        <AdminNavBar />
      </Box>
      <Box p={8}>
        <ul className="list-group">
          {courses &&
            courses.map((course: course, index: number) => (
              <li className="list-group-item" key={course._id}>
                <Card>
                  <Card.Body>
                    <Card.Title style={{ color: "Blue" }}>{course.title}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Id: {course._id}</ListGroup.Item>
                    <ListGroup.Item>Course Name: {course.title}</ListGroup.Item>
                  </ListGroup>
                  <Card.Body style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <DropdownButton
                        variant="primary"
                        title={
                          selectedProfessors[index]
                            ? `${selectedProfessors[index]?.first_name} ${selectedProfessors[index]?.last_name}`
                            : "Select an Instructor"
                        }
                      >
                        {professors.map((professor: User) => (
                          <Dropdown.Item
                            key={professor._id}
                            onClick={() => handleOptionSelect(index, professor)}
                          >
                            {professor
                              ? `${professor.first_name} ${professor.user_email}`
                              : "Select"}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setSelectedCourse(course);
                          handleShow();
                        }}
                      >
                        Allocate
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </li>
            ))}
        </ul>

        <Modal isOpen={show} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are you sure?</ModalHeader>
            <ModalBody>
              You are trying to map a professor to a course!
            </ModalBody>
            <ModalFooter>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" onClick={handleAllocateConfirm}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default ProfessorMapping;

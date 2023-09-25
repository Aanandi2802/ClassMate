import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  ChakraProvider,
  Text,
  VStack,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import AdminNavBar from "./adminNavigationBar";
import envVariables from "../../importenv";
import { course } from "../model/course.model";

const CourseManagement = () => {
  const backendURL = envVariables.backendURL;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState<course[]>([]);
  const [newCourse, setNewCourse] = useState<course>({
    title: "",
    courseID: "",
    description: "",
  });
  const [editingCourse, setEditingCourse] = useState<course | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchCoursesFromBackend();
  }, [setCourses]);

  const fetchCoursesFromBackend = async () => {
    try {
      const response = await fetch(`${backendURL}/get-courses`);
      const data = await response.json();
      if (data.courseList) {
        setCourses(data.courseList);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const openCreateModal = (course?: course) => {
    if (course) {
      setEditingCourse(course);
      setNewCourse({ ...course });
    } else {
      setEditingCourse(null);
      setNewCourse({
        title: "",
        courseID: "",
        description: "",
      });
    }
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
    setNewCourse({
      title: "",
      courseID: "",
      description: "",
    });
    setEditingCourse(null);
  };

  const createCourse = async (newCourse: course) => {
    try {
      const response = await fetch(`${backendURL}/add-course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Course Created",
          description: "The course has been created successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        // Fetch the updated courses from the backend and add the new course to the local state
        fetchCoursesFromBackend();
        closeCreateModal();
      } else {
        toast({
          title: "Error",
          description: "Failed to create course",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while creating the course.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const addCourse = () => {
    if (!newCourse.courseID.trim() || !newCourse.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Course ID and Course Title are required fields.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newCourseWithId: course = {
      ...newCourse,
      _id: Date.now().toString(),
    };

    setCourses([...courses, newCourseWithId]);
    closeCreateModal();
    toast({
      title: "Course Created",
      description: "The course has been created successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    createCourse(newCourseWithId);
  };

  const deleteCourse = async (_id: string) => {
    try {
      const response = await fetch(`${backendURL}/delete-course/${_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Course deleted successfully, update the local state
        fetchCoursesFromBackend();

        toast({
          title: "Course Deleted",
          description: "The course has been deleted successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        // Course not found or failed to delete, show error message
        toast({
          title: "Error",
          description: "Failed to delete course",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      // An error occurred while deleting the course
      toast({
        title: "Error",
        description: "An error occurred while deleting the course.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const toggleEdit = (courseId: string) => {
    const courseToEdit = courses.find((course) => course._id === courseId);

    if (courseToEdit) {
      openCreateModal(courseToEdit);
    }
  };

  const updateCourse = async (courseId: string, updatedCourse: course) => {
    try {
      // Make a PUT request to the backend API to update the course
      const response = await fetch(`${backendURL}/update-course/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCourse),
      });

      const data = await response.json();

      if (response.ok) {
        // Course updated successfully, return success response
        toast({
          title: "Course Updated",
          description: "The course has been updated successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        // Fetch the updated courses from the backend and update the local state
        fetchCoursesFromBackend();
        closeCreateModal();
      } else {
        // Failed to update course, return error response
        toast({
          title: "Error",
          description: "Failed to update course",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while updating the course.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSave = () => {
    if (editingCourse) {
      const updatedCourse: course = {
        ...editingCourse,
        courseID: newCourse.courseID,
        title: newCourse.title,
        description: newCourse.description,
      };
      updateCourse(editingCourse._id || "", updatedCourse);
      setEditingCourse(null);
    } else {
      addCourse();
    }
  };

  return (
    <ChakraProvider>
      <Box>
        <AdminNavBar />
      </Box>
      <Box p={8}>
        
        <VStack spacing={4} align="start">
          <Box>
            <Button
              colorScheme="teal"
              leftIcon={<Box as="span">+</Box>}
              onClick={() => openCreateModal()}
            >
              Create Course
            </Button>
          </Box>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Course ID</Th>
                <Th>Course Title</Th>
                <Th>Description</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map((course) => (
                <Tr key={course._id || ""}>
                  <Td>{course.courseID || ""}</Td>
                  <Td>
                    {editingCourse?._id === course._id ? (
                      <Input
                        value={newCourse.title}
                        onChange={(e) =>
                          setNewCourse({ ...newCourse, title: e.target.value })
                        }
                        marginRight={2}
                      />
                    ) : (
                      course.title
                    )}
                  </Td>
                  <Td>{course.description}</Td>
                  <Td>
                    {editingCourse?._id === course._id ? (
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => handleSave()}
                      >
                        Save
                      </Button>
                    ) : (
                      <>
                        <Button
                          colorScheme="green"
                          size="sm"
                          marginLeft={2}
                          onClick={() => toggleEdit(course._id || "")}
                        >
                          Edit
                        </Button>
                        <Button
                          colorScheme="red"
                          size="sm"
                          marginLeft={2}
                          onClick={() => deleteCourse(course._id || "")}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>
      </Box>

      {/* Create Course Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={closeCreateModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingCourse ? "Edit Course" : "Create Course"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Course Code</FormLabel>
                <Input
                  value={newCourse.courseID}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, courseID: e.target.value })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Course Title</FormLabel>
                <Input
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                />
              </FormControl>
              {editingCourse ? (
                <Button colorScheme="teal" onClick={() => handleSave()}>
                  Save
                </Button>
              ) : (
                <Button colorScheme="teal" onClick={addCourse}>
                  Create
                </Button>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default CourseManagement;

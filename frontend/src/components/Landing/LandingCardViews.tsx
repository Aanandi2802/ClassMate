// Author: Viral Siddhapura
import React from "react";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/react";

const LandingCardViews = () => {
  return (
    <Flex mt={8} justifyContent="center" flexWrap="wrap">
      <Box
        bg="#ffe6e6"
        p={6}
        borderRadius="md"
        boxShadow="md"
        maxWidth="400px"
        width={{ base: "100%", sm: "50%" }}
        mx={{ base: 0, sm: 2 }}
        mb={4}
        border="2px"
        borderColor="grey"
      >
        <Box mb={4} mx="auto">
          <Image
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Professor"
            borderRadius="full"
            boxSize="200px"
            objectFit="cover"
            mx="auto"
          />
        </Box>
        <Heading as="h4" size="md" mb={4}>
          For Students
        </Heading>
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "#ffb3b3", color: "white" }}>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Quiz
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel textAlign={'left'} pb={4}>
              Students can see attempt quizzes course by course and submit it for grading purpose.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "#ffb3b3", color: "white" }}>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Assignments
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel textAlign={'left'} pb={4}>
              Students can submit assignments as per courses and submit it by submission deadlines.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "#ffb3b3", color: "white" }}>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Analytical Dashboard
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel textAlign={'left'} pb={4}>
              Dashboard - An analytical graph view for students who can see their performance based on their grades.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "#ffb3b3", color: "white" }}>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Calendar
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel textAlign={'left'} pb={4}>
              Using Calendar - Students can see the due dates for quizzes and assignments.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Box
        bg="#e6f7ff"
        p={6}
        borderRadius="md"
        boxShadow="md"
        maxWidth="400px"
        width={{ base: "100%", sm: "50%" }}
        mx={{ base: 0, sm: 2 }}
        mb={4}
        border="2px"
        borderColor="grey"
      >
        <Box mb={4} mx="auto">
          <Image
            src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            borderRadius="full"
            boxSize="200px"
            objectFit="cover"
            mx="auto"
          />
        </Box>
        <Heading as="h4" size="md" mb={4}>
          For Professors
        </Heading>
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "#66b3ff", color: "white" }}>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Grades
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel textAlign={'left'} pb={4}>
              Professor can do marking of quizzes and assignments and publish to the students on the portal.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "#66b3ff", color: "white" }}>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Discussion
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel textAlign={'left'} pb={4}>
              Professor has this feature to connect with the students for important points deliverables.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "#66b3ff", color: "white" }}>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  News And Notifications
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel textAlign={'left'} pb={4}>
              Important news like new era technologies or any important tasks will be shown to News Page.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "#66b3ff", color: "white" }}>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Courses Management
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel textAlign={'left'} pb={4}>
              Professor can manage the courses content, quizzes and Assignments so that students can react upon it.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Flex>
  )
}

export default LandingCardViews;
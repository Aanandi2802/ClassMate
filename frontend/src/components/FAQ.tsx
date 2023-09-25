// Author: Harshil Shah
// Author: Viral Siddhapura
// Author: Aanandi Pankhania
import { useState } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Heading, Input } from '@chakra-ui/react';

const FAQ = () => {
    const faqData = [
        {
            question: 'How do I create an account?',
            answer: 'To create an account, click on the "Sign Up" button and follow the instructions to provide your details and create a new account.'
        },
        {
            question: 'Can I reset my password?',
            answer: 'Yes, you can reset your password by clicking on the "Forgot Password" link on the login page. Follow the instructions to reset your password.'
        },
        {
            question: 'Is the login page for students and instructors different?',
            answer: 'No, it\'s the same. One page redirects to the appropriate dashboard.'
        },
        {
            question: 'How can I enroll in a course?',
            answer: 'To enroll in a course, go to the "Courses" page and browse through the available courses. Click on the "Enroll" button for the desired course and follow the instructions.'
        },
        {
            question: 'How can I submit an assignment?',
            answer: 'To submit an assignment, go to the "Assignments" page and select the assignment you want to submit. Click on the "Submit" button and follow the instructions to upload your assignment.'
        },
        {
            question: 'How can I view my grades?',
            answer: 'You can view your grades by going to the "Grades" page. It will display your grades for each course and assignment.'
        },
        {
            question: 'Can I communicate with my professors?',
            answer: 'Yes, you can communicate with your professors through the "Messages" feature. Go to the "Messages" page and select the professor you want to communicate with.'
        },
        {
            question: 'How can I access course materials?',
            answer: 'To access course materials, go to the "Course" section of the respective course. It will provide you with access to lecture slides, readings, and other relevant materials.'
        },
        {
            question: 'What should I do if I encounter technical issues?',
            answer: 'If you encounter technical issues, you can reach out to the support team by clicking on the "Contact Us" link. Provide a detailed description of the problem you are facing, and they will assist you in resolving the issue.'
        },
        {
            question: 'Can I track my progress or completion status of assignment?',
            answer: 'Yes, you can track your progress and completion status by visiting the "Assignment" page and check them under'
        },
        {
            question: 'How do I access the discussion forums?',
            answer: 'To access the discussion forums, navigate to the "course" section from the dashboard and select the course where you need to discuss the problems. There, you can participate in course-related discussions, ask questions, and interact with other students and instructors of that subject.'
        },
        {
            question: 'Can I download course materials for offline access?',
            answer: 'Yes, if downloadable materials are available, you can download them for offline access. Look for a download button or link next to the course material, such as lecture slides or documents.'
        },
        {
            question: 'How can I view the course syllabus?',
            answer: 'To view the course syllabus, go to the "Course" page and find the section "syllabus". It provides an overview of the course structure, objectives, schedule, and grading criteria.'
        },
        {
            question: 'What should I do if I need help with a specific topic in a course?',
            answer: 'If you need help with a specific topic in a course, you can reach out to your instructor or teaching assistants. They can provide further clarification, additional resources, or schedule office hours for personalized assistance.'
        },
        {
            question: 'Can I access course materials from previous semesters?',
            answer: 'Yes as long as you are a student in your university you can refer to any previous material from "course" by selecting the subject of your choice. It will be at bottom after your current courses. '
        },
        {
            question: 'How can I drop or unenroll from a course?',
            answer: 'To drop or unenroll from a course, visit the "My Courses" page and locate the course you wish to drop. Look for an "Unenroll" or "Drop" option next to the course and follow the instructions provided.'
        },
        {
            question: 'How can I provide feedback or report issues with the website?',
            answer: 'If you want to provide feedback or report any issues with the website, look for a "Contact Us" link. Use the provided form or email address to share your feedback or report any technical problems you encounter.'
        },
        {
            question: 'How can I access the course syllabus?',
            answer: 'To access the course syllabus, navigate to the "Course Details" or "Syllabus" section of the respective course. It will provide an overview of the topics covered, assignments, and important dates.'
        },
        {
            question: 'Are there discussion forums available for each course?',
            answer: 'Yes, discussion forums are available for each course. You can participate in course-related discussions, ask questions, and collaborate with fellow students and instructors.'
        },
        {
            question: 'How do I access live classes or webinars?',
            answer: 'To access live classes or webinars, check the course schedule or announcements for the date and time of the session. Typically, you will find a link or instructions to join the live session through a video conferencing tool.'
        },
        {
            question: 'What should I do if I need an extension for an assignment?',
            answer: 'If you need an extension for an assignment, reach out to your instructor as soon as possible. Send them a message explaining your situation and request an extension. They will provide further guidance.'
        },
        {
            question: 'How can I provide feedback on a course or instructor?',
            answer: 'To provide feedback on a course or instructor, look for a feedback or evaluation form within the course platform. Alternatively, you can send an email to the support team or course administrators expressing your feedback.'
        },
        {
            question: 'How can I request a certificate of completion?',
            answer: 'To request a certificate of completion, check the course requirements or completion criteria. Once you meet the requirements, reach out to university administration and ask them for further information.'
        },
        {
            question: 'Is there a limit to the number of courses I can enroll in?',
            answer: 'It is mostly based on the field of your study and if you are a part time or full time student in your university.'
        },
        {
            question: 'How can I request a course to be added to the Classmate Application?',
            answer: 'If you would like to request a specific course to be added to the Classmate Application, you can contact the administrators or support team with the course details and rationale for its inclusion.'
        },
        {
            question: 'Is there a limit to the file size I can upload for assignments or quizzes?',
            answer: 'There may be a limit to the file size you can upload for assignments or quizzes, typically set by the system or the instructor. Check the assignment or quiz guidelines for any specific instructions regarding file size limitations.'
        },
        {
            question: 'Can I access the Classmate Application after I graduate?',
            answer: 'Access to the Classmate Application after graduation may vary depending on the policies of your educational institution. It is best to check with the administrators or support team to confirm if alumni access is available.'
        },
        {
            question: 'How can I report technical issues or bugs in the Classmate Application?',
            answer: 'If you encounter any technical issues or bugs, you can report them to the support team or administrators. Look for the "Comntact us" option in your dashboard or contact the designated support channels.'
        },
        {
            question: 'Is there a limit to the number of assignments or quizzes I can submit?',
            answer: 'In most cases, there is no specific limit to the number of assignments or quizzes you can submit. However, it is important to follow the course guidelines and deadlines for each assignment or quiz.'
        },
        {
            question: 'How can I access additional learning resources or supplementary materials?',
            answer: 'To access additional learning resources or supplementary materials, check the "Content" section in from Course page accessed from your dashboard. Here, you may find links to e-books, articles, videos, or other educational materials.'
        },
        {
            question: 'Are there any prerequisites for enrolling in specific courses?',
            answer: 'Some courses may have prerequisites that need to be fulfilled before enrollment. Check the course descriptions or consult with the instructor to determine if any prerequisites are required.'
        },
        {
            question: 'Can I export or download my course materials or lecture slides?',
            answer: 'The ability to export or download course materials or lecture slides may vary depending on the Classmate Application: features and settings. Check for any available download options within the course materials section.'
        },
        {
            question: 'How can I provide my suggestions on new features?',
            answer: 'To provide suggestions on new features for the Classmate Application, you can typically find a "Contact US" form within the application. Alternatively, you can reach out to the support team or administrators with your ideas and suggestions.'
        },
        {
            question: 'Are there any group projects or collaborative assignments in the Classmate Application?',
            answer: 'Yes, the Classmate Application may incorporate group projects or collaborative assignments. The instructor will provide guidelines on forming groups and collaborating within the platform.'
        },
        {
            question: 'Is there a specific web browser recommended for optimal performance of the Classmate Application?',
            answer: 'While the Classmate Application may work on various web browsers, it is recommended to use the latest versions of popular browsers such as Google Chrome, Mozilla Firefox, or Safari for optimal performance and compatibility.'
        },
        {
            question: 'How can I stay updated on the latest news and announcements from the Classmate Application?',
            answer: 'To stay updated on the latest news and announcements, check the "Announcements" section in your dashboard. Important updates and announcements will be posted there by the administrators or instructors.'
        },
        {
            question: 'How can I request an official transcript of my grades?',
            answer: 'To request an official transcript of your grades, you will need to follow the procedures outlined by your educational institution. Typically, there will be a dedicated office or online portal where you can make the request.'
        },
        {
            question: 'Are there any restrictions on accessing the Classmate Application outside of campus?',
            answer: 'In most cases, you should be able to access the Classmate Application from anywhere with an internet connection. However, there might be certain restrictions or firewalls in place on some networks. If you encounter any issues, contact the administrators or support team for assistance.'
        },
        {
            question: 'Can I change my email address associated with my Classmate Application account?',
            answer: 'No, you need to use the email address provided by your university to get the access to our application.'
        },
        {
            question: 'How long will my account remain active after I graduate or leave the institution?',
            answer: 'The duration of account access after graduation or leaving the institution may vary. Some institutions provide alumni access for a certain period, while others deactivate accounts immediately. Contact the administrators or support team for more information on account deactivation policies.'
        }
    ];

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = faqData.filter((item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box p={8}>
            <Heading as="h2" size="xl" mb={8} textAlign="center">
                Frequently Asked Questions
            </Heading>
            <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                mb={4}
            />
            <Accordion allowMultiple>
                {filteredData.map((item, index) => (
                    <AccordionItem key={index}>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'gray.200' }}>
                                <Box flex="1" textAlign="left" fontWeight="bold">
                                    {`${index + 1}. ${item.question}`}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>{item.answer}</AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
};

export default FAQ;
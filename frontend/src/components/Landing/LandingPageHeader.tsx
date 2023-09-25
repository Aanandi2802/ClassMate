// Author: Viral Siddhapura
import { Box, Heading, Text } from "@chakra-ui/react";

const LandingPageHeader = () => {
    return (
        <Box width={['100%']} mx="auto" textAlign="left" p={4}>
            <Heading as="h4" size="lg" mb={4}>
                Welcome To ClassMate - What we do here
            </Heading>
            <Text mb={4} fontWeight="semibold" fontSize="md">
                The Classmate Application is developed as a digital platform specifically designed for
                students, professors, and campus administrators.
                Its primary goal is to simplify administrative processes, improve communication channels, and foster a collaborative learning environment.
            </Text>

            <Text fontSize="md" mb={4} fontWeight="semibold">
                By leveraging technology, the application aims to streamline various aspects of educational management and create a more efficient and effective system.
                Additionally, the lack of a centralized platform for collaboration and knowledge sharing can hinder the development of a vibrant learning community.
            </Text>
        </Box>
    );
};

export default LandingPageHeader;

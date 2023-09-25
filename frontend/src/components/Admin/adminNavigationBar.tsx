import React from 'react';
import { Box, Flex, ChakraProvider, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const AdminNavBar = () => {
  return (
    <Box as="nav" bg="gray.800" color="white">
      <Flex justify="space-between" wrap="wrap" padding={4}>
        <Link as={RouterLink} to="/admin/mapping" textDecoration="none" ml={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Assign Professors
          </Text>
        </Link>
        <Link as={RouterLink} to="/admin/course-management" textDecoration="none" ml={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Course Management
          </Text>
        </Link>
        <Link as={RouterLink} to="/admin/news" textDecoration="none" ml={4}>
          <Text fontSize="2xl" fontWeight="bold">
            News
          </Text>
        </Link>
        <Link as={RouterLink} to="/admin/pending-requests" textDecoration="none" ml={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Pending Requests
          </Text>
        </Link>
        <Link as={RouterLink} to="/admin/users" textDecoration="none" ml={4}>
          <Text fontSize="2xl" fontWeight="bold">
            User List
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default AdminNavBar;

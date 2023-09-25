import React from 'react';
import {Box, Text} from '@chakra-ui/react';
import AdminNavBar from './adminNavigationBar';

const AdminDashboard: React.FC = () => {
    return (<>
            <Box>
                <AdminNavBar/>
            </Box>
            <Box p={8}>
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Welcome to the Admin Dashboard!
                </Text>
            </Box>
        </>
    )
        ;
};

export default AdminDashboard;

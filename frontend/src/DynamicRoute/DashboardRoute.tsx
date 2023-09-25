// Author: Harshil Shah
// Author: Viral Siddhapura
import React from 'react';
import AdminDashboard from "../components/Admin/adminDashboard";
import ProfessorDashboard from "../components/ProfessorDashboard/ProfessorDashboard";
import StudentDashboard from '../components/StudentDashboard/ProfessorDashboard';

const DashboardRoute = () => {
    const userDataString = localStorage.getItem('userData');
    const user_type = JSON.parse(userDataString ? userDataString : '').user_type ?? 'default_user_type';

    switch (user_type) {
        case 'admin':
            return <AdminDashboard/>;
        case 'stud':
            return <StudentDashboard/>;
        case 'prof':
            return <ProfessorDashboard/>;
    }

    return null;
};

export default DashboardRoute;
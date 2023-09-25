import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, {Suspense, useEffect, useState} from 'react';
import Loader from './loading';
import TitleBar from './TitleBar';
import DiscussionList from './components/discussion/Index';
// import { news } from '../src/components/model/news.model';
// import AdminNews from './components/News/admin/Index';
// import News from './components/News/News';
// import DiscussionList from './components/Discussions/DiscussionList';

const CourseDashboard = React.lazy(() => import( "./components/Course/CourseDashboard"));

const AdminDashboard = React.lazy(() => import('./components/Admin/adminDashboard'));
const CourseManagement = React.lazy(() => import('./components/Admin/courseManagement'));
const PendingApproval = React.lazy(() => import('./components/Admin/pendingApproval'));
const UserInformationPage = React.lazy(() => import('./components/Admin/userInformationPage'));
const ProfessorMapping = React.lazy(() => import('./components/Admin/professorMapping'));

const Contact = React.lazy(() => import('./components/contact/Contact'));
const FAQ = React.lazy(() => import('./components/FAQ'));
const LandingPage = React.lazy(() => import('./components/Landing/LandingPage'));
const ErrorPage = React.lazy(() => import('./components/error/ErrorPage'));

const Login = React.lazy(() => import('./components/UserManagement/login'));
const CreateUser = React.lazy(() => import('./components/UserManagement/createUser'));
const ListUsers = React.lazy(() => import('./components/UserManagement/listUsers'));

const Prof = React.lazy(() => import('./components/otherpages/prof'));
const Stud = React.lazy(() => import('./components/otherpages/stud'));

// Quiz
const QuizList = React.lazy(() => import('./components/quiz/QuizList'));
const QuizPage = React.lazy(() => import('./components/quiz/QuizPage'));

//news
const AdminNews = React.lazy(() => import('./components/News/admin/Index'));
const UsersNews = React.lazy(() => import('./components/News/users/Index'));

const AlreadyLoggedInPage = React.lazy(() => import('./components/UserManagement/alreadyLoggedIn'));

const DashBoardRoute = React.lazy(() => import('./DynamicRoute/DashboardRoute'));
const ForgetPassword = React.lazy(() => import('./components/UserManagement/forgetPassword'));

const Announcement = React.lazy(() => import('./components/Announcement/Announcement'));

const Content = React.lazy(() => import('./components/Content/Content'));
const ProfSignUp = React.lazy(() => import('./components/UserManagement/SignUp'));
const Calender = React.lazy(() => import('./components/Calender/calender'));

const ProfessorAssignmentPage = React.lazy(() => import('./components/ProfAssignments/ProfessorAssignmentPage'))
const StudentAssignmentPage = React.lazy(() => import('./components/studentAssignments/StudentAssignmentPage'))
const StudentHistoryPage = React.lazy(() => import('./components/studentAssignments/StudentHistoryPage'))

const App = () => {
    const [userType, setUserType] = useState('');

    useEffect(() => {
        // Fetch the user_type from localStorage
        const userData = localStorage.getItem('userData');
        if (userData) {
            const parsedUserData = JSON.parse(userData);
            setUserType(parsedUserData.user_type);
        }
    }, []);
    return (<>
            <Router>
                <TitleBar/>
                <Suspense fallback={<Loader/>}>
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/faq" element={<FAQ/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/createUser" element={<CreateUser/>}/>
                        <Route path="/listUsers" element={<ListUsers/>}/>
                        <Route path="/prof" element={<Prof/>}/>
                        <Route path="/stud" element={<Stud/>}/>
                        <Route path="/dashboard" element={<DashBoardRoute/>}/>
                        <Route path="/forgetPassword" element={<ForgetPassword/>}/>
                        <Route path="/quiz" element={<QuizList/>}/>
                        <Route path="/quiz/:quizId" element={<QuizPage/>}/>
                        <Route path="/announcement" element={<Announcement/>}/>
                        <Route path="/content" element={<Content/>}/>
                        <Route path="/signup" element={<ProfSignUp/>}/>
                        <Route path="/calender" element={<Calender/>}/>
                        <Route path="/admin" element={<AdminDashboard/>}/>
                        <Route path="/admin/course-management" element={<CourseManagement/>}/>
                        <Route path="/admin/pending-requests" element={<PendingApproval/>}/>
                        <Route path="/admin/users" element={<UserInformationPage/>}/>
                        <Route path="/admin/mapping" element={<ProfessorMapping/>}/>
                        <Route path="/alreadyLoggedIn" element={<AlreadyLoggedInPage/>}/>
                        <Route path="/error" element={<ErrorPage/>}/>
                        <Route path="/course" element={<CourseDashboard/>}/>
                        <Route path="/profAssignment" element={<ProfessorAssignmentPage/>}/>
                        <Route path="/studAssignment" element={<StudentAssignmentPage/>}/>
                        <Route path="/historyAssignments" element={<StudentHistoryPage/>}/>
                        <Route path="/discussions" element={<DiscussionList/>}/>

                        {userType === 'stud' && (
                            <Route path="/news" element={<UsersNews/>}/>
                        )}
                        {userType === 'prof' && (
                            <Route path="/news" element={<UsersNews/>}/>
                        )}
                        {userType === 'admin' && (
                            <Route path="/admin/news" element={<AdminNews/>}/>
                        )}


                    </Routes>
                </Suspense>
            </Router>
        </>
    );
};

export default App;

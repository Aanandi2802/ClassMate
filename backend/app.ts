import express, {Request, Response} from 'express';
import {loginRouter} from './controller/users/login';
import {registerRouter} from './controller/users/register';
import cors from 'cors';
import {listUsersRouter} from './controller/users/listUsers';
import {deleteUserRouter} from './controller/users/deleteUser';
import {getUserByIdRouter} from "./controller/users/getUserByEmail";
import {forgetPasswordRouter} from "./controller/users/forgetPassword";

// Announcements
import {getAnnouncementsRouter} from './controller/announcement/getAnnouncements';
import {createAnnouncementRouter} from './controller/announcement/createAnnouncements';

// Content Management
import {createContentRouter} from './controller/content/createContent';
import {updateContentRouter} from './controller/content/updateContent';
import {readContentRouter} from './controller/content/getContent';
import {deleteContentRouter} from './controller/content/deleteContent';
import EmailRouter from './controller/users/forgetPasswordEmail';
import {readCoursesRouter} from './controller/courses/getCourseList';
import {updateUserRouter} from "./controller/users/updateUser";

// Course Management
import {createCourseRouter} from './controller/courses/addCourse';
import {deleteCourseRouter} from './controller/courses/deleteCourse';
import {updateCourseRouter} from './controller/courses/updateCourse';

// Assignment Management
import {createAssignmentRouter} from './controller/profassignments/createAssignment';
import {listAssignmentsRouter} from './controller/profassignments/listAssignments';
import {deleteAssignmentRouter} from './controller/profassignments/deleteAssignment';
import {updateAssignmentRouter} from './controller/profassignments/updateAssignment';
import {submitAssignmentRouter} from './controller/studassignments/assignmentSubmission';

// Quiz Management
import { createQuizRouter } from './controller/quiz/createQuiz';
import { listQuizzesRouter } from './controller/quiz/listQuiz';
import { updateQuizRouter } from './controller/quiz/updateQuiz';
import { deleteQuizRouter } from './controller/quiz/deleteQuiz';
import { getStudentQuizRouter } from './controller/quiz/getStudentQuiz';
import { submitQuizRouter } from './controller/quiz/submitQuiz';
import { getQuizStatusRouter } from './controller/quiz/getQuizStatus';
import { createDiscussionRouter } from './controller/discussions/addDiscussion';
import { getDiscussionRouter } from './controller/discussions/getDiscussion';
import { updateDiscussionRouter } from './controller/discussions/updateDiscussion';
import { deleteDiscussionRouter } from './controller/discussions/deleteDiscussion';
import { calenderRouter} from "./controller/Calender/GetQuizDueDatesByUserID";

//news
import { getNewsRouter } from './controller/News/getNews';
import { createNewsRouter } from './controller/News/createNews';

//discussions
// Create an Express app
const app = express();

// Enable CORS
app.use(cors());


// Middleware to parse JSON in request body
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    res.send('Hello from express typescript');
});

// Redirect requests to /login to loginRouter
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/listUsers', listUsersRouter);
app.use('/deleteUser', deleteUserRouter);
app.use('/getUserById', getUserByIdRouter);
app.use('/forgetPassword', forgetPasswordRouter);
app.use('/send-email', EmailRouter);
app.use('/updateUser', updateUserRouter);

//announcements
app.use('/announcements', getAnnouncementsRouter)
app.use('/announcements', createAnnouncementRouter)

//news
app.use('/get-news', getNewsRouter)
app.use('/create-news', createNewsRouter)

//content 
app.use('/create-content', createContentRouter)
app.use('/update-content', updateContentRouter)
app.use('/get-content', readContentRouter)
app.use('/delete-content', deleteContentRouter)

//course
app.use('/get-courses', readCoursesRouter)
app.use('/add-course', createCourseRouter)
app.use('/delete-course', deleteCourseRouter)
app.use('/update-course', updateCourseRouter)

// Quiz routers
app.use('/createQuiz', createQuizRouter);
app.use('/listQuiz', listQuizzesRouter);
app.use('/updateQuiz', updateQuizRouter);
app.use('/deleteQuiz', deleteQuizRouter);
app.use('/getStudentQuiz', getStudentQuizRouter);
app.use('/submitQuiz', submitQuizRouter);
app.use('/getQuizStatus', getQuizStatusRouter);

// Assignment routers
app.use('/createAssignment', createAssignmentRouter);
app.use('/getAssignments', listAssignmentsRouter);
app.use('/deleteAssignment', deleteAssignmentRouter);
app.use('/updateAssignment', updateAssignmentRouter);

// Student Assignment Submissions
app.use('/uploadAssignment', submitAssignmentRouter);
app.use('/calender', calenderRouter);


//discussions routers
app.use('/create-discussion',createDiscussionRouter)
app.use('/discussion',getDiscussionRouter)
app.use('/update-discussion',updateDiscussionRouter)
app.use('/delete-discussion',deleteDiscussionRouter)
app.listen(3000, () => {
    console.log('Server started on port 3000');
});


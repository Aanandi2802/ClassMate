// Author: Yatrik Pravinbhai Amrutiya
import express, {Request, Response} from 'express';
import CourseService from '../../service/course.service';
import course from '../../model/course.model';

export const readCoursesRouter = express.Router();

const courseService = new CourseService();

// Read courses endpoint
readCoursesRouter.get('/', async (req: Request, res: Response) => {
    try {
        const courseList: course[] = await courseService.getCourses();

        if (courseList && courseList.length > 0) {
            res.json({message: 'Courses fetched successfully', courseList: courseList});
        } else {
            res.json({message: 'No courses found', courseList: []});
        }
    } catch (error) {
        console.log(error);
        // Error occurred during MongoDB operation, return error response
        res.status(500).json({message: 'An error occurred while fetching the courses'});
    }
});
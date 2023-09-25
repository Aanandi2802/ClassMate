// Author: Aanandi Pankhania
import express, { Request, Response } from 'express';
import CourseService from '../../service/course.service'; // Import the CourseService
import course from '../../model/course.model'; // Assuming you have a model for the course

export const createCourseRouter = express.Router();

const courseService = new CourseService();

// Create course endpoint
createCourseRouter.post('/', async (req: Request, res: Response) => {
    try {
        const newCourse: course = req.body;

        if (!newCourse || !newCourse.title || !newCourse.courseID) {
            // Validation failed, return bad request response
            return res.status(400).json({ message: 'Course title and code are required fields.' });
        }

        const isCreated: boolean = await courseService.createCourse(newCourse);

        if (isCreated) {
            // Course created successfully, return success response
            res.json({ message: 'Course created successfully' });
        } else {
            // Failed to create course, return error response
            res.status(500).json({ message: 'Failed to create course' });
        }
    } catch (error) {
        console.log(error);
        // Error occurred during MongoDB operation, return error response
        res.status(500).json({ message: 'An error occurred while creating the course' });
    }
});

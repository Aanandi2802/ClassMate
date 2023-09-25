// Author: Aanandi Pankhania
import express, { Request, Response } from "express";
import CourseService from "../../service/course.service"; // Import the CourseService

export const updateCourseRouter = express.Router();

const courseService = new CourseService();

// Update course endpoint
updateCourseRouter.put("/:courseId", async (req: Request, res: Response) => {
  try {
    const courseId: string = req.params.courseId;
    const updatedCourseData = req.body;

    if (!courseId) {
      // Validation failed, return bad request response
      return res
        .status(400)
        .json({ message: "Course ID is required to update a course." });
    }

    const isUpdated: boolean = await courseService.updateCourse(
      courseId,
      updatedCourseData
    );

    if (isUpdated) {
      // Course updated successfully, return success response
      res.json({ message: "Course updated successfully" });
    } else {
      // Course not found or failed to update, return error response
      res.status(404).json({ message: "Course not found or failed to update" });
    }
  } catch (error) {
    console.log(error);
    // Error occurred during MongoDB operation, return error response
    res
      .status(500)
      .json({ message: "An error occurred while updating the course" });
  }
});

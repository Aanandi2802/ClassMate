// Author: Aanandi Pankhania
import express, { Request, Response } from "express";
import CourseService from "../../service/course.service"; // Import the CourseService

export const deleteCourseRouter = express.Router();

const courseService = new CourseService();

// Delete course endpoint
deleteCourseRouter.delete("/:courseId", async (req: Request, res: Response) => {
  try {
    const courseId: string = req.params.courseId;

    if (!courseId) {
      // Validation failed, return bad request response
      return res
        .status(400)
        .json({ message: "Course ID is required to delete a course." });
    }

    const isDeleted: boolean = await courseService.deleteCourse(courseId);

    if (isDeleted) {
      // Course deleted successfully, return success response
      res.json({ message: "Course deleted successfully" });
    } else {
      // Course not found or failed to delete, return error response
      res.status(404).json({ message: "Course not found or failed to delete" });
    }
  } catch (error) {
    console.log(error);
    // Error occurred during MongoDB operation, return error response
    res
      .status(500)
      .json({ message: "An error occurred while deleting the course" });
  }
});

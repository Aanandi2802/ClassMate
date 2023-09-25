import express, { Request, Response } from 'express';
import assignmentStudents from '../../model/studAssignment.model';
import StudentSubmissionService from '../../service/studentSubmissions.service';

export const submitAssignmentRouter = express.Router();

const studentSubmissionService = new StudentSubmissionService();

submitAssignmentRouter.post('/', async (req: Request, res: Response) => {
    
    console.log("req.body===>",req.body);
    
    const current_submission: assignmentStudents = req.body;

    const comments = current_submission.comments;
    const fileURL = current_submission.fileURL;
    const userEmailId = current_submission.userEmailId;
    
    console.log("Comments are : ", comments);
    console.log("fileURL is : ", fileURL);
    console.log("userEmailId is : ", userEmailId);

    const assignmentData: assignmentStudents = {
        comments,
        fileURL,
        userEmailId,
      };

    try{
      const uploadedAssignment = await studentSubmissionService.uploadSubmissons(assignmentData);
      console.log(uploadedAssignment);
      if (uploadedAssignment)
          res.json({ message: 'Assignment Upload successfully', assignment: uploadedAssignment });
      else
          res.json({ message: 'Something went wrong!!'});
    }catch (error){
      console.error(error);
      res.status(500).json({ message: 'Error while uploading assignment data' });
    }
  });
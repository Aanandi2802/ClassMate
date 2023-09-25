import express, { Request, Response } from 'express';
import assignment from '../../model/profAssignment.model';
import ProfAssignmentService from '../../service/professorAssignment.service'

import multer from 'multer';
// Set up Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const createAssignmentRouter = express.Router();

const profAssignmentService = new ProfAssignmentService();

createAssignmentRouter.post('/', upload.single('file'), async (req: Request, res: Response) => {
    console.log(req.body);
    const current_assignment: assignment = req.body;

    if (!req.body.file){
        return res.status(400).json(({ message: "No File uploaded"}))
    }

    const { assignmentTitle, visibleDate, submissionDate, description, grade, courseId } = current_assignment;

    // Get the binary data of the uploaded file
    const fileData = req.body.file.buffer;
    if (fileData){
        console.log("File Data is here",fileData);
    }else{
        console.log("File Data is not here");
    }

    const assignmentData: assignment = {
        assignmentTitle,
        visibleDate,
        submissionDate,
        description,
        grade,
        courseId,
        file: fileData, // Store the binary data of the file
      };

    const new_assignment = await profAssignmentService.createAssignment(assignmentData);
    console.log(new_assignment);
    if (new_assignment)
        res.json({ message: 'New Assignment Created successful', assignment: new_assignment });
    else
        res.json({ message: 'New Assignment Already Exists' });

});
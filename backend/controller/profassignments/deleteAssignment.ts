import express, { Request, Response } from 'express';
import ProfAssignmentService from '../../service/professorAssignment.service';

export const deleteAssignmentRouter = express.Router();

const professorService = new ProfAssignmentService();
// Login endpoint
deleteAssignmentRouter.delete('/', async (req: Request, res: Response) => {
    // Extract username and password from the request body
    console.log(req.body);
    const data = req.body;
    try {
        console.log(data.id);
        const response = await professorService.deleteAssignment(data.id);
        console.log(response);
        if (response) {
            // User found, return success response
            res.json({ message: 'Assignment Deleted successful', response: response });
        } else {
            // User not found or invalid credentials, return error response
            res.status(401).json({ message: 'Error occured' });
        }
    } catch (error) {
        console.log(error);
        // Error occurred during MongoDB operation, return error response
        res.status(500).json({ message: error });
    }
});
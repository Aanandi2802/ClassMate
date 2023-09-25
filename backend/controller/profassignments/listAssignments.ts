import express, { Request, Response } from 'express';
import ProfAssignmentService from '../../service/professorAssignment.service';

export const listAssignmentsRouter = express.Router();

const professorService = new ProfAssignmentService();
// List Assignment endpoint
listAssignmentsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const assignments = await professorService.listAssignments();

        if (assignments) {
            // User found, return success response
            res.json({ message: 'Assignment List fetched successful', assignments: assignments });
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
import express, {Request, Response} from 'express';
import UserService from '../../service/user.service';
import ProfAssignmentService from '../../service/professorAssignment.service';

export const updateAssignmentRouter = express.Router();

const professorAssignmentService = new ProfAssignmentService();
// Update Assignment endpoint
updateAssignmentRouter.put('/', async (req: Request, res: Response) => {
    
    const assignment_id: string = req.body._id;
    delete req.body._id;
    const assignmentData = req.body;

    try {
        const response = await professorAssignmentService.updateAssignment(assignment_id, assignmentData);
        console.log("response from mongodb is here", response);
        if (response) {
            res.json({
                message: 'Assignment updated Successfully',
                matched: response.matchedCount,
                modified: response.modifiedCount
            });
        } else {
            res.status(401).json({message: 'Error occurred'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
});
// Author: Harshil Shah
import express, {Request, Response} from 'express';
import CalenderService from "../../service/calender.service";

export const calenderRouter = express.Router();

const calenderService = new CalenderService();
// Login endpoint
calenderRouter.get('/getQuizDueDatesByUserID', async (req: Request, res: Response) => {
    // Extract username and password from the request body
    console.log(req.body);
    const email = req.query.user_id as string;
    console.log(email);
    try {
        const response = await calenderService.getDeadLinesByProfID(email);
        console.log(response);
        if (response) {
            // User found, return success response
            console.log(response);
            res.json({message: 'User fetched successful', response: response});
        } else {
            // User not found or invalid credentials, return error response
            res.status(401).json({message: 'Error occurred'});
        }
    } catch (error) {
        console.log(error);
        // Error occurred during MongoDB operation, return error response
        res.status(500).json({message: error});
    }
});
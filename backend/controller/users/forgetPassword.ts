// Author: Harshil Shah
import express, {Request, Response} from 'express';
import UserService from '../../service/user.service';
import user from "../../model/user.model";

export const forgetPasswordRouter = express.Router();

const userService = new UserService();
// Login endpoint
forgetPasswordRouter.patch('/', async (req: Request, res: Response) => {
    console.log("Checking auto push on backend change in render from github workflow");
    // Extract username and password from the request body
    console.log(req.body);
    const user_id = req.body._id as string;
    const password = req.body.password as string;
    const user: user = {};
    user.user_id = user_id;
    user.password = password;
    console.log('forgotpassword', user);
    try {
        const response = await userService.forgetPassword(user);
        if (response) {
            // User found, return success response
            res.json({
                message: 'User password update successful',
                matched: response.matchedCount,
                modified: response.modifiedCount
            });
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
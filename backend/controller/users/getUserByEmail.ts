// Author: Harshil Shah
import express, {Request, Response} from 'express';
import UserService from '../../service/user.service';
import user from "../../model/user.model";

export const getUserByIdRouter = express.Router();

const userService = new UserService();
// Login endpoint
getUserByIdRouter.get('/', async (req: Request, res: Response) => {
    // Extract username and password from the request body
    console.log(req.body);
    const email = req.query.user_id as string;
    console.log(email);
    const user: user = {};
    user.user_email = email;
    try {
        const response = await userService.getUser(user);
        console.log(response);
        if (response) {
            // User found, return success response
            res.json({message: 'User fetched successful', response: response['_id']});
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
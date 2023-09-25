// Author: Harshil Shah
import express, {Request, Response} from 'express';
import user from '../../model/user.model';
import UserService from '../../service/user.service';

export const loginRouter = express.Router();

const userService = new UserService();
// Login endpoint
loginRouter.post('/', async (req: Request, res: Response) => {
    // Extract username and password from the request body
    console.log(req.body);
    const current_user: user = req.body;

    try {
        const user = await userService.getUser(current_user);

        if (user) {
            // User found, return success response
            console.log(user);
            if (user.status === 'pending') {
                res.status(202).json({message: 'Professor Status pending'});
            } else {
                res.json({message: 'Login successful', user_mail: user['user_email'], user_type: user['user_type']});
            }
        } else {
            // User not found or invalid credentials, return error response
            res.status(401).json({message: 'Invalid credentials'});
        }
    } catch (error) {
        console.log(error);
        // Error occurred during MongoDB operation, return error response
        res.status(500).json({message: error});
    }
});
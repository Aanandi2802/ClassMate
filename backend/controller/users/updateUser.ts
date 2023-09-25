// Author: Harshil Shah
import express, {Request, Response} from 'express';
import UserService from '../../service/user.service';

export const updateUserRouter = express.Router();

const userService = new UserService();
// Login endpoint
updateUserRouter.patch('/', async (req: Request, res: Response) => {
    console.log("Checking auto push on backend change in render from github workflow");
    const userUpdate = req.body;

    userUpdate.user_id = userUpdate._id
    delete userUpdate._id
    try {
        const response = await userService.updateUser(userUpdate);
        if (response) {
            res.json({
                message: 'User Updated Successfully',
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
// Author: Harshil Shah
import express, { Request, Response } from 'express';
import user from '../../model/user.model';
import UserService from '../../service/user.service'

export const registerRouter = express.Router();

const userService = new UserService();

registerRouter.post('/', async (req: Request, res: Response) => {
    // Extract username and password from the request body
    console.log(req.body);
    const current_user: user = req.body;
    // const { user_email, password } = req.body;

    const new_user = await userService.createUser(current_user);
    console.log(new_user);
    if (new_user)
        res.json({ message: 'User Created successful', user: new_user });
    else
        res.json({ message: 'User Already Exists' });

});
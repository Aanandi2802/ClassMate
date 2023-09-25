// Author: Harshil Shah
import express, { Request, Response } from 'express';
import UserService from '../../service/user.service';
import { ObjectId } from 'mongodb';

export const listUsersRouter = express.Router();

const userService = new UserService();
// Login endpoint
listUsersRouter.post('/', async (req: Request, res: Response) => {
    // Extract username and password from the request body
    console.log(req.body);

    try {
        const users = await userService.listUsersWithusertypeFilter();

        if (users) {
            // User found, return success response
            res.json({ message: 'Users fetched successful', users: users });
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

listUsersRouter.put('/:userId/approve', async (req: Request, res: Response) => {
    try {
      const userId: string = req.params.userId;
  
      if (!userId) {
        // Validation failed, return bad request response
        return res
          .status(400)
          .json({ message: 'User ID is required to approve a user.' });
      }
  
      // Convert userId to ObjectId
      const userIdObjectId = new ObjectId(userId);
  
      const updateResponse = await userService.updateUserStatus(userIdObjectId?.toString());
  
      if (updateResponse && updateResponse.modifiedCount > 0) {
        // User status updated successfully, return success response
        res.json({ message: 'User status updated successfully' });
      } else {
        // User not found or failed to update status, return error response
        res
          .status(404)
          .json({ message: 'User not found or failed to update status' });
      }
    } catch (error) {
      console.log(error);
      // Error occurred during MongoDB operation, return error response
      res.status(500).json({ message: 'An error occurred while updating user status' });
    }
  });

  // Add the route to reject a user request
listUsersRouter.delete('/:userId/reject', async (req: Request, res: Response) => {
    try {
      const userId: string = req.params.userId;
  
      if (!userId) {
        // Validation failed, return bad request response
        return res
          .status(400)
          .json({ message: 'User ID is required to reject a user request.' });
      }
  
      // Convert userId to ObjectId
      const userIdObjectId = new ObjectId(userId);
  
      const deleteResponse = await userService.deleteUser(userIdObjectId?.toString());
  
      if (deleteResponse && deleteResponse.deletedCount && deleteResponse.deletedCount > 0) {
        // User deleted successfully, return success response
        res.json({ message: 'User request rejected successfully' });
      } else {
        // User not found or failed to delete, return error response
        res
          .status(404)
          .json({ message: 'User not found or failed to reject user request' });
      }
    } catch (error) {
      console.log(error);
      // Error occurred during MongoDB operation, return error response
      res.status(500).json({ message: 'An error occurred while rejecting user request' });
    }
  });
  
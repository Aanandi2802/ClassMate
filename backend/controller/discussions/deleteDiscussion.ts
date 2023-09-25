import express, { Request, Response } from "express";
import DiscussionService from "../../service/discussions.service";

export const deleteDiscussionRouter = express.Router();

const discussionService = new DiscussionService();

deleteDiscussionRouter.delete("/:id", async (req: Request, res: Response) => {
  const discussionId: string = req.params.id;

  try {
    const result = await discussionService.deleteDiscussion(discussionId);
    if (result) {
      if (result.deletedCount > 0) {
        res.json({ message: "Discussion deleted successfully" });
      }
    } else {
      res.status(404).json({ message: "Discussion not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the discussion" });
  }
});

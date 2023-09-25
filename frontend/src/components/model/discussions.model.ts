import { ObjectId } from "mongodb";

export interface Discussion {
  _id?: ObjectId;
  userID?: string;
  courseID?: string;
  content?: string;
}


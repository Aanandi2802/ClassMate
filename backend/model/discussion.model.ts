import { ObjectId } from "mongodb";

interface Discussion {
  _id?: ObjectId;
  userID?: string;
  courseID?: string;
  content?: string;
}

export default Discussion;

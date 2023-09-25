// Author: Yatrik Pravinbhai Amrutiya
import {  ObjectId } from "mongodb";

interface content {
  _id?: ObjectId;
  courseID?: string;
  title?: string;
  description?: string;
}

export default content;

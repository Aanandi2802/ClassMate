// Author: Yatrik Pravinbhai Amrutiya
import {  ObjectId } from "mongodb";

export interface content {
    _id?: ObjectId;
    courseID?: string;
    title?: string;
    description?: string;
  }
  
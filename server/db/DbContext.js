import mongoose from "mongoose";
import ListSchema from "../models/List";
import TaskSchema from "../models/Task";
import ProfileSchema from "../models/Profile";
import BoardSchema from '../models/Board'
class DbContext {
  List = mongoose.model("List", ListSchema);
  Task = mongoose.model("Task", TaskSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Boards = mongoose.model("Board", BoardSchema)
}

export const dbContext = new DbContext();

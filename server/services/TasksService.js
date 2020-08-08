import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class TasksService {
  async editTask(id, body) {
    return await dbContext.Task.findByIdAndUpdate(id, body, { new: true })
  }
  async deleteTask(id) {
    return await dbContext.Task.findOneAndRemove({ _id: id })
  }
  async create(body) {
    return await dbContext.Task.create(body)
  }
  async find(query = {}) {
    let tasks = await dbContext.Task.find(query);
    return tasks;
  }
  async findById(id) {
    let task = await dbContext.Task.findById(id);
    if (!task) {
      throw new BadRequest("Invalid Id");
    }
    return task;
  }
  async getById(id) {
    let data = await dbContext.Task.find({ listId: id })
    if (!data) {
      throw new BadRequest("")
    }
    return data
  }
  async addComment(id, body) {
    return await dbContext.Task.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { comments: body } },
      { new: true }
    );
  }
  async deleteComment(taskId, commentId) {
    return await dbContext.Task.findByIdAndUpdate(
      { _id: taskId, "comments._id": commentId },
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    )
  }
  async editComment(id, commentId, body) {
    return await dbContext.Task.updateOne(
      { _id: id, "comments._id": commentId },
      { $set: { comments: body } },
      { new: true }
    )
  }
}

export const tasksService = new TasksService();
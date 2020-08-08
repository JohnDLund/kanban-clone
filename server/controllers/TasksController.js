import express from "express";
import BaseController from "../utils/BaseController";
import { tasksService } from "../services/TasksService";
import auth0provider from "@bcwdev/auth0provider";

export class TasksController extends BaseController {
  constructor() {
    super("api/tasks");
    this.router
      .use(auth0provider.isAuthorized)
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post("", this.create)
      .post("/:id/comments", this.addComment)
      .put("/:id", this.editTask)
      .put("/:id/comments/:commentId", this.editComment)
      .delete("/:id", this.deleteTask)
      .delete("/:id/comments/:commentId", this.deleteComment)
  }

  async getAll(req, res, next) {
    try {
      let task = await tasksService.find()
      res.send({ data: task, message: "got tasks" })
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.user.sub;
      let task = await tasksService.create(req.body)
      res.send(task);
    } catch (error) {
      next(error);
    }
  }
  async editTask(req, res, next) {
    try {
      let task = await tasksService.editTask(req.params.id, req.body)
      res.send({ data: task, message: "Edited" })
    } catch (error) {
      next(error)
    }
  }
  async deleteTask(req, res, next) {
    try {
      await tasksService.deleteTask(req.params.id)
      res.send("Deleted Task")
    } catch (error) {
      next(error)
    }
  }
  async addComment(req, res, next) {
    try {
      let comment = await tasksService.addComment(req.params.id, req.body);
      if (comment) {
        return res.send(comment)
      }
    } catch (error) {
      next(error)
    }
  }
  async deleteComment(req, res, next) {
    try {
      let delComment = await tasksService.deleteComment(req.params.id, req.params.commentId);
      if (delComment) {
        return res.send("deleted")
      }
    } catch (error) {
      next(error)
    }
  }
  async editComment(req, res, next) {
    try {
      res.send({ data: await tasksService.editComment(req.params.id, req.params.commentId, req.body), message: "edited comment" })
    } catch (error) {
      next(error)
    }
  }
}

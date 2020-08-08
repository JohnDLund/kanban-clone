import express from "express";
import BaseController from "../utils/BaseController";
import { listsService } from "../services/ListsService";
import auth0provider from "@bcwdev/auth0provider";
import { tasksService } from "../services/TasksService";

export class ListsController extends BaseController {
  constructor() {
    super("api/lists");
    this.router
      .use(auth0provider.isAuthorized)
      .get("", this.getAll)
      .get("/:id/tasks", this.getTaskByListId)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post("", this.create)
      .put("/:id", this.editList)
      .delete("/:id", this.deleteList)
  }

  async getAll(req, res, next) {
    try {
      let lists = await listsService.find()
      res.send({ data: lists, message: "got the lists" })
    } catch (error) {
      next(error);
    }
  }
  async getTaskByListId(req, res, next) {
    try {
      let data = await tasksService.getById(req.params.id)
      return res.send(data)
    } catch (error) { next(error) }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.user.sub;
      let data = await listsService.create(req.body)
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async editList(req, res, next) {
    try {
      let list = await listsService.editList(req.params.id, req.body)
      res.send({ data: list, message: "Edited" })
    } catch (error) {
      console.error(error);
    }
  }
  async deleteList(req, res, next) {
    try {
      await listsService.deleteList(req.params.id)
      res.send("Deleted")
    } catch (error) {
      console.error(error);
    }
  }
}

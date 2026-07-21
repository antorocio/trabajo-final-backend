import { Router } from "express";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/taskControllers.js";

const TaskRouter = Router()

TaskRouter.get("/", getTasks)
TaskRouter.get("/:id", getTask)
TaskRouter.post("/", createTask)
TaskRouter.put("/:id", updateTask)
TaskRouter.delete("/:id", deleteTask)

export { TaskRouter }
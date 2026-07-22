import { Router } from "express";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/taskControllers.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { createTaskValidator, updateTaskValidator, taskQueryValidator } from "../validators/TaskValidators.js";

const TaskRouter = Router()

TaskRouter.get("/", validate(taskQueryValidator, "query"), getTasks)
TaskRouter.get("/:id", getTask)
TaskRouter.post("/", validate(createTaskValidator), createTask)
TaskRouter.put("/:id", validate(updateTaskValidator), updateTask)
TaskRouter.delete("/:id", deleteTask)

export { TaskRouter }
import { Router } from "express";
import { limiter } from "../middlewares/limiterMiddleware.js";
import { register, login } from "../controllers/authControllers.js";
import { registerUserValidator, loginUserValidator } from "../validators/UserValidators.js";
import { validate } from "../middlewares/validateMiddleware.js";

const AuthRouter = Router()

AuthRouter.post("/register", validate(registerUserValidator), register)
AuthRouter.post("/login", limiter, validate(loginUserValidator), login)

export { AuthRouter }
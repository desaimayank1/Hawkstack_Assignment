import { Router, type Router as ExpressRouter } from "express";
import { createUser, getUser } from "../controllers/user.controller";

const userRouter: ExpressRouter = Router();

userRouter.route("/:username").post(createUser);
userRouter.route("/:username").get(getUser);

export default userRouter;
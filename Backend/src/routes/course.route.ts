import { Router, type Router as ExpressRouter } from "express";
import { enrollCourse, getCourseList } from "../controllers/course.controller";

const courseRouter: ExpressRouter = Router();

courseRouter.route("/").get(getCourseList);
courseRouter.route("/:courseId/enroll").post(enrollCourse);

export default courseRouter;
import { Request, Response } from "express";
import prisma from "../prisma";

export const getCourseList = async (req: Request, res: Response) => {
    try {
        const courses = await prisma.course.findMany({});

        if (!courses) {
            return res.status(404).json({ error: "Courses not found" });
        }

        res.json({
            message: "success",
            courses
        })
    } catch (error) {
        console.error("Error fetching course list", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const enrollCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const { username } = req.body;

        if (!courseId || !username) {
            return res.status(400).json({ error: "courseId and username are required" });
        }

        const user = await prisma.user.findUnique({
            where: { name: username }
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const course = await prisma.course.findUnique({
            where: { id: Number(courseId) }
        });
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const existing = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: Number(courseId)
                }
            }
        });

        if (existing) {
            return res.status(409).json({ error: "User already enrolled in this course" });
        }

        const enrollment = await prisma.enrollment.create({
            data: {
                userId: user.id,
                courseId: Number(courseId)
            }
        });

        return res.status(201).json({
            message: "success",
            enrollment
        });
        

    } catch (error) {
        console.error("Error enrolling in course", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
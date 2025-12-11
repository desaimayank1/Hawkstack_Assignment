import { Request, Response } from "express";
import prisma from "../prisma";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const existing = await prisma.user.findUnique({
            where: { name: username }
        });

        if (existing) {
            return res.status(400).json({ error: "User already exist" });
        }

        const user = await prisma.user.create({
            data: {
                name: username
            }
        })
        // console.log(user);

        res.status(201).json({
            message: "true",
            user
        })

    } catch (error) {
        console.error("Error enrolling in course", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const getUser = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const user = await prisma.user.findUnique({
            where: { name: username },
            include: {
                enrollments: {
                    include: {
                        course: true, 
                    },
                },
            },
        });

        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }
        const courses = user?.enrollments.map(e => e.course);
        res.status(200).json({
            message: "true",
            username:user.name,
            userId:user.id,
            courses
        })

    } catch (error) {
        console.error("Error fetching user", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
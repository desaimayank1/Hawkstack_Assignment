import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import prisma from "./prisma";
import courseRouter from "./routes/course.route";
import userRouter from "./routes/user.route";
const app: Express = express();
dotenv.config()
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

app.use('/user', userRouter);
app.use('/courses', courseRouter);

app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: "server is running " })
})

app.listen(PORT, () => console.log('Server running on http://localhost:3000'));

async function main() {
    // await prisma.course.createMany({
    //     data: [
    //         {
    //             title: "React Basics",
    //             description: "Learn core concepts of React",
    //             instructor: "John Doe"
    //         },
    //         {
    //             title: "Node.js Fundamentals",
    //             description: "Build REST APIs using Node + Express",
    //             instructor: "Sarah Lee"
    //         },
    //         {
    //             title: "Intro to Databases",
    //             description: "Learn SQL, relationships, indexing",
    //             instructor: "Alex Smith"
    //         }
    //     ],
    // });

    // console.log("Courses seeded!");

    // const courses = await prisma.course.findMany({
    //     select: {
    //         title: true,
    //         description: true,
    //         instructor: true,
    //     }
    // });

    // console.log(courses);

    // const del_res=await prisma.course.deleteMany({});
    // console.log(del_res);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });

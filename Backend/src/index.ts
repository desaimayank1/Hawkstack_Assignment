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
    //     await prisma.course.createMany({
    //   data: [
    //     {
    //       title: "Complete Web Development Bootcamp",
    //       description: "Learn HTML, CSS, JavaScript, and build full-stack apps",
    //       category: "Web Development",
    //       instructor: "John Doe",
    //       rating: 4.8,
    //       lessons: 24,
    //       status: "un-enrolled",
    //       image: "https://picsum.photos/seed/code/800/600"
    //     },
    //     {
    //       title: "Python for Data Science",
    //       description: "Master Python libraries like Pandas, NumPy, and Matplotlib",
    //       category: "Data Science",
    //       instructor: "Sarah Lee",
    //       rating: 4.9,
    //       lessons: 32,
    //       status: "un-enrolled",
    //       image: "https://picsum.photos/seed/ds/800/600"
    //     },
    //     {
    //       title: "UI/UX Design Masterclass",
    //       description: "Design stunning user interfaces and experiences",
    //       category: "UI/UX",
    //       instructor: "Alex Smith",
    //       rating: 4.7,
    //       lessons: 12,
    //       status: "un-enrolled",
    //       image: "https://picsum.photos/seed/uiux/800/600"
    //     },
    //     {
    //       title: "Node.js Fundamentals",
    //       description: "Build REST APIs using Node.js and Express",
    //       category: "Backend Development",
    //       instructor: "Mike Johnson",
    //       rating: 4.6,
    //       lessons: 18,
    //       status: "un-enrolled",
    //       image: "https://picsum.photos/seed/node/800/600"
    //     },
    //     {
    //       title: "React Advanced Concepts",
    //       description: "Dive deep into React hooks, context, and performance optimization",
    //       category: "Web Development",
    //       instructor: "Emma Wilson",
    //       rating: 4.8,
    //       lessons: 20,
    //       status: "un-enrolled",
    //       image: "https://picsum.photos/seed/react/800/600"
    //     },
    //     {
    //       title: "SQL & Database Design",
    //       description: "Learn SQL, normalization, relationships, and indexing",
    //       category: "Databases",
    //       instructor: "David Brown",
    //       rating: 4.5,
    //       lessons: 15,
    //       status: "un-enrolled",
    //       image: "https://picsum.photos/seed/sql/800/600"
    //     }
    //   ],
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
    // const del_res1=await prisma.user.deleteMany({});
    // const del_res2=await prisma.enrollment.deleteMany({});
    // console.log(del_res);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });

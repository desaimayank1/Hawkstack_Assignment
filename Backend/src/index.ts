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



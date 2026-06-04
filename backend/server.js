import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import incomeRouter from "./routes/incomeRoute.js";

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
connectDB();

// Routes
app.use("/api/auth", userRouter);
app.use("/api/income", incomeRouter);

app.get("/", (req, res) => {
  res.send("✨ API's in its working era");
});

app.listen(port, () => {
  console.log(
    `✨ Ready for it? Server's live on port http://localhost:${port} ⚡`,
  );
});

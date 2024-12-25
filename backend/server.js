import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDb from "./configs/mongoDb.js";
import userRouter from "./routes/user.routes.js";

//app config
const PORT = process.env.PORT || 4000;
const app = express();

// app middleware
app.use(express.json());
app.use(cors());

// API Routes
app.get("/", (req, res) => {
  res.send("API Working");
});
app.use("/api/user", userRouter);

app.listen(PORT, (req, res) => {
  connectDb();
  console.log("server run at:", PORT);
});

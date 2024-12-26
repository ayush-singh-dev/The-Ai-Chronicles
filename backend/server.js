import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDb from "./configs/mongoDb.js";
import userRouter from "./routes/user.routes.js";

//app config
const PORT = process.env.PORT || 4000;
const app = express();

// app middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "1mb" })); // Parse JSON
app.use(bodyParser.raw({ type: "application/json", limit: "1mb" }));
app.use(cors());

// API Routes
app.get("/", (req, res) => {
  res.send("API Working");
});
app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).send({ error: "Invalid webhook signature or payload" });
});

app.listen(PORT, () => {
  connectDb();
  console.log("server run at:", PORT);
});

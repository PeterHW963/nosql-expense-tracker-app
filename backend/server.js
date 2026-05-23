import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import expenseRoutes from "./routes/expenseRoutes.js";
import { connectDB } from "./config/db.js";
import { connectRedis } from "./config/redis.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.use(express.json());
app.use("/api/expenses", expenseRoutes);

async function startServer() {
  try {
    await connectDB();
    await connectRedis();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server: ", error);
  }
}

startServer();

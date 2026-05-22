import express from "express";
import dotenv from "dotenv";
import cors from "cors";

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

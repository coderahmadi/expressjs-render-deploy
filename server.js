import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import gallaryRoute from "./routes/gallaryRoute.js"

dotenv.config();

const app = express();
app.use(cors())
const port = 3001;
const clientUrl = `http://localhost:${port}`;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`)
  .then(() => {
    console.log("Database connected! 😃");
  })
  .catch((error) => {
    console.log(error.message);
    console.log("🤨");
  });
// Middleware
app.use(express.json());
app.use('/api', gallaryRoute)
// Routes

// Do not add code below this line!
// Serve frontend client/build folder
app.use(express.static(path.join(__dirname, "client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});

app.listen(port, () => {
  console.log(`The server 🙈 is listening on port ${port}`);
  console.log(`Visit ${clientUrl} in your browser`);
});

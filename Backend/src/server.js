import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import apiRoutes from "./routes/api.js";
import genreTextRoutes from "./routes/genreText.js";
import friendShipRoutes from "./routes/friendShip.js";
import likeRoutes from "./routes/like.js";
import cors from "cors";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: process.env.URL_FRONTEND,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/genreText", genreTextRoutes);
app.use("/friendship", friendShipRoutes);
app.use("/likes", likeRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

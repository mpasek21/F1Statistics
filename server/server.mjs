import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import userRoutes from "./routes/users.mjs";
import authRoutes from "./routes/auth.mjs";
import tokenVerification from "./middleware/tokenVerification.js"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(express.json());

app.get("/api/users", tokenVerification)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
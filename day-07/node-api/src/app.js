import cors from "cors";
import express from "express";
import employeeRoutes from "./routes/employeeRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: "20kb" }));
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/employees", employeeRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
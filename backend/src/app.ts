import "dotenv/config";
import express from "express";
import { AppDataSource } from "./data-source";
import fundRouter from "./routes/fund";
import fundPerformanceRouter from "./routes/fundPerformance";
import analyticsRouter from "./routes/analytics";
import adminRouter from "./routes/admin";

const app = express();
app.use(express.json());

app.use("/api/funds", fundRouter);
app.use("/api/fund-performances", fundPerformanceRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 4000;

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Error during Data Source initialization:", err);
}); 
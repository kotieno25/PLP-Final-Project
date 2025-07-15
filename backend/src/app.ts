import "dotenv/config";
import express from "express";
import { AppDataSource } from "./data-source";
import fundRouter from "./routes/fund";
import fundPerformanceRouter from "./routes/fundPerformance";
import analyticsRouter from "./routes/analytics";
import adminRouter from "./routes/admin";
import cron from "node-cron";
import { exec } from "child_process";
import path from "path";

const app = express();
app.use(express.json());

app.use("/api/funds", fundRouter);
app.use("/api/fund-performances", fundPerformanceRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 4000;

AppDataSource.initialize().then(() => {
  // Start daily cron job to update fund performance data
  cron.schedule("0 0 * * *", () => {
    const scriptPath = path.resolve(__dirname, "../../data_ingestion/cma_cbk_ingest.py");
    exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error("Daily data ingestion failed:", stderr || error.message);
      } else {
        console.log("Daily data ingestion output:", stdout);
      }
    });
  });
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Error during Data Source initialization:", err);
}); 
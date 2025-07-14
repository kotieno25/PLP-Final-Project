import { Router } from "express";
import { exec } from "child_process";
import path from "path";

const router = Router();

router.post("/refresh-mmf-data", (req, res) => {
  // Path to the Python script
  const scriptPath = path.resolve(__dirname, "../../../data_ingestion/cma_cbk_ingest.py");
  exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr || error.message });
    }
    res.json({ message: "MMF data refresh triggered.", output: stdout });
  });
});

export default router; 
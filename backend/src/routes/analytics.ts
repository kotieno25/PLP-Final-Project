import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Fund } from "../models/Fund";
import { FundPerformance } from "../models/FundPerformance";

const router = Router();

// Best performing fund (highest average yield)
router.get("/best-performing", async (req, res) => {
  const funds = await AppDataSource.getRepository(Fund).find({ relations: ["performances"] });
  let best = null;
  let bestAvg = -Infinity;
  for (const fund of funds) {
    if (!fund.performances?.length) continue;
    const avg = fund.performances.reduce((sum, p) => sum + Number(p.yield), 0) / fund.performances.length;
    if (avg > bestAvg) {
      bestAvg = avg;
      best = fund;
    }
  }
  res.json({ fund: best, averageYield: bestAvg });
});

// Worst performing fund (lowest average yield)
router.get("/worst-performing", async (req, res) => {
  const funds = await AppDataSource.getRepository(Fund).find({ relations: ["performances"] });
  let worst = null;
  let worstAvg = Infinity;
  for (const fund of funds) {
    if (!fund.performances?.length) continue;
    const avg = fund.performances.reduce((sum, p) => sum + Number(p.yield), 0) / fund.performances.length;
    if (avg < worstAvg) {
      worstAvg = avg;
      worst = fund;
    }
  }
  res.json({ fund: worst, averageYield: worstAvg });
});

// Fund trends: NAV over time for all funds
router.get("/trends", async (req, res) => {
  const performances = await AppDataSource.getRepository(FundPerformance).find({ relations: ["fund"] });
  const trends: Record<string, any[]> = {};
  for (const perf of performances) {
    if (!perf.fund || perf.fund === null || perf.fund.id === undefined) continue;
    const fundId = String(perf.fund.id);
    if (!trends[fundId]) trends[fundId] = [];
    trends[fundId].push({ date: perf.date, nav: perf.nav });
  }
  res.json(trends);
});

// Volatility: standard deviation of NAV for each fund
router.get("/volatility", async (req, res) => {
  const funds = await AppDataSource.getRepository(Fund).find({ relations: ["performances"] });
  const result = funds.map(fund => {
    const navs = fund.performances?.map(p => Number(p.nav)) || [];
    const mean = navs.reduce((a, b) => a + b, 0) / (navs.length || 1);
    const variance = navs.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (navs.length || 1);
    const stddev = Math.sqrt(variance);
    return { fund, volatility: stddev };
  });
  res.json(result);
});

export default router; 
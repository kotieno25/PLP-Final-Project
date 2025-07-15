import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Fund } from "../models/Fund";
import { FundPerformance } from "../models/FundPerformance";

const router = Router();

// Helper to get date range for last 5 years
function getFiveYearRange() {
  const now = new Date();
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(now.getFullYear() - 5);
  return { from: fiveYearsAgo, to: now };
}

// Best performing fund (highest average yield, last 5 years)
router.get("/best-performing", async (req, res) => {
  const { from, to } = getFiveYearRange();
  const funds = await AppDataSource.getRepository(Fund).find({ relations: ["performances"] });
  let best = null;
  let bestAvg = -Infinity;
  for (const fund of funds) {
    const performances = (fund.performances || []).filter(p => new Date(p.date) >= from && new Date(p.date) <= to);
    if (!performances.length) continue;
    const avg = performances.reduce((sum, p) => sum + Number(p.yield), 0) / performances.length;
    if (avg > bestAvg) {
      bestAvg = avg;
      best = fund;
    }
  }
  res.json({ fund: best, averageYield: bestAvg });
});

// Worst performing fund (lowest average yield, last 5 years)
router.get("/worst-performing", async (req, res) => {
  const { from, to } = getFiveYearRange();
  const funds = await AppDataSource.getRepository(Fund).find({ relations: ["performances"] });
  let worst = null;
  let worstAvg = Infinity;
  for (const fund of funds) {
    const performances = (fund.performances || []).filter(p => new Date(p.date) >= from && new Date(p.date) <= to);
    if (!performances.length) continue;
    const avg = performances.reduce((sum, p) => sum + Number(p.yield), 0) / performances.length;
    if (avg < worstAvg) {
      worstAvg = avg;
      worst = fund;
    }
  }
  res.json({ fund: worst, averageYield: worstAvg });
});

// Fund trends: NAV over time for all funds (last 5 years)
router.get("/trends", async (req, res) => {
  const { from, to } = getFiveYearRange();
  const performances = await AppDataSource.getRepository(FundPerformance).find({ relations: ["fund"] });
  const trends: Record<string, any[]> = {};
  for (const perf of performances) {
    if (!perf.fund || perf.fund === null || perf.fund.id === undefined) continue;
    if (new Date(perf.date) < from || new Date(perf.date) > to) continue;
    const fundId = String(perf.fund.id);
    if (!trends[fundId]) trends[fundId] = [];
    trends[fundId].push({ date: perf.date, nav: perf.nav });
  }
  res.json(trends);
});

// Volatility: standard deviation of NAV for each fund (last 5 years)
router.get("/volatility", async (req, res) => {
  const { from, to } = getFiveYearRange();
  const funds = await AppDataSource.getRepository(Fund).find({ relations: ["performances"] });
  const result = funds.map(fund => {
    const navs = (fund.performances || []).filter(p => new Date(p.date) >= from && new Date(p.date) <= to).map(p => Number(p.nav));
    const mean = navs.reduce((a, b) => a + b, 0) / (navs.length || 1);
    const variance = navs.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (navs.length || 1);
    const stddev = Math.sqrt(variance);
    return { fund, volatility: stddev };
  });
  res.json(result);
});

export default router; 
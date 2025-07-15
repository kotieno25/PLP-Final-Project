import { Router } from "express";
import { AppDataSource } from "../data-source";
import { FundPerformance } from "../models/FundPerformance";
import { Fund } from "../models/Fund";
import { Between } from "typeorm";

const router = Router();

// Get all fund performances (last 5 years by default)
router.get("/", async (req, res) => {
  let { from, to } = req.query;
  const now = new Date();
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(now.getFullYear() - 5);
  if (!from) from = fiveYearsAgo.toISOString().slice(0, 10);
  if (!to) to = now.toISOString().slice(0, 10);
  const performances = await AppDataSource.getRepository(FundPerformance).find({
    where: {
      date: Between(new Date(from as string), new Date(to as string)),
    },
    relations: ["fund"],
    order: { date: "ASC" },
  });
  res.json(performances);
});

// Get a single fund performance by ID
router.get("/:id", async (req, res) => {
  const perf = await AppDataSource.manager.findOne(FundPerformance, {
    where: { id: Number(req.params.id) },
    relations: ["fund"],
  });
  if (!perf) return res.status(404).json({ message: "Performance not found" });
  res.json(perf);
});

// Create a new fund performance (now public)
router.post("/", async (req, res) => {
  const { date, nav, yield: perfYield, fundId } = req.body;
  const fund = await AppDataSource.manager.findOne(Fund, { where: { id: fundId } });
  if (!fund) return res.status(400).json({ message: "Invalid fundId" });
  const perf = new FundPerformance();
  perf.date = new Date(date);
  perf.nav = nav;
  perf.yield = perfYield;
  perf.fund = fund;
  await AppDataSource.manager.save(perf);
  res.status(201).json(perf);
});

// Update a fund performance (admin/manager only)
router.put("/:id", async (req, res) => {
  const { date, nav, yield: perfYield, fundId } = req.body;
  const perf = await AppDataSource.manager.findOne(FundPerformance, { where: { id: Number(req.params.id) } });
  if (!perf) return res.status(404).json({ message: "Performance not found" });
  if (fundId) {
    const fund = await AppDataSource.manager.findOne(Fund, { where: { id: fundId } });
    if (!fund) return res.status(400).json({ message: "Invalid fundId" });
    perf.fund = fund;
  }
  if (date) perf.date = new Date(date);
  if (nav !== undefined) perf.nav = nav;
  if (perfYield !== undefined) perf.yield = perfYield;
  await AppDataSource.manager.save(perf);
  res.json(perf);
});

// Delete a fund performance (admin/manager only)
router.delete("/:id", async (req, res) => {
  const perf = await AppDataSource.manager.findOne(FundPerformance, { where: { id: Number(req.params.id) } });
  if (!perf) return res.status(404).json({ message: "Performance not found" });
  await AppDataSource.manager.remove(perf);
  res.status(204).send();
});

// Filtering, sorting, and pagination for fund performances (default to last 5 years)
router.get("/search", async (req, res) => {
  let { fundId, startDate, endDate, sortBy = "date", order = "ASC", page = 1, limit = 10 } = req.query;
  const now = new Date();
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(now.getFullYear() - 5);
  if (!startDate) startDate = fiveYearsAgo.toISOString().slice(0, 10);
  if (!endDate) endDate = now.toISOString().slice(0, 10);
  const qb = AppDataSource.getRepository(FundPerformance).createQueryBuilder("perf");
  if (fundId) qb.andWhere("perf.fundId = :fundId", { fundId: Number(fundId) });
  if (startDate) qb.andWhere("perf.date >= :startDate", { startDate });
  if (endDate) qb.andWhere("perf.date <= :endDate", { endDate });
  qb.leftJoinAndSelect("perf.fund", "fund");
  qb.orderBy(`perf.${sortBy}`, order === "DESC" ? "DESC" : "ASC");
  qb.skip((Number(page) - 1) * Number(limit)).take(Number(limit));
  const [performances, total] = await qb.getManyAndCount();
  res.json({ data: performances, total });
});

// Statistics endpoint: NAV and yield over a date range for a fund
router.get("/fund/:fundId/statistics", async (req, res) => {
  const fundId = Number(req.params.fundId);
  const { startDate, endDate } = req.query;
  const qb = AppDataSource.getRepository(FundPerformance).createQueryBuilder("perf");
  qb.where("perf.fundId = :fundId", { fundId });
  if (startDate) qb.andWhere("perf.date >= :startDate", { startDate });
  if (endDate) qb.andWhere("perf.date <= :endDate", { endDate });
  const performances = await qb.getMany();
  if (!performances.length) return res.status(404).json({ message: "No performances found for this fund in the given range" });
  const avgNav = performances.reduce((sum, p) => sum + Number(p.nav), 0) / performances.length;
  const avgYield = performances.reduce((sum, p) => sum + Number(p.yield), 0) / performances.length;
  res.json({ averageNav: avgNav, averageYield: avgYield });
});

export default router; 
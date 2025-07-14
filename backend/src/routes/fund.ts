import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Fund } from "../models/Fund";

const router = Router();

// Get all funds
router.get("/", async (req, res) => {
  const funds = await AppDataSource.manager.find(Fund, { relations: ["performances"] });
  res.json(funds);
});

// Get a single fund by ID
router.get("/:id", async (req, res) => {
  const fund = await AppDataSource.manager.findOne(Fund, {
    where: { id: Number(req.params.id) },
    relations: ["performances"],
  });
  if (!fund) return res.status(404).json({ message: "Fund not found" });
  res.json(fund);
});

// Create a new fund (now public)
router.post("/", async (req, res) => {
  const { name, manager } = req.body;
  const fund = new Fund();
  fund.name = name;
  fund.manager = manager;
  await AppDataSource.manager.save(fund);
  res.status(201).json(fund);
});

// Update a fund (admin/manager only)
router.put("/:id", async (req, res) => {
  const { name, manager } = req.body;
  const fund = await AppDataSource.manager.findOne(Fund, { where: { id: Number(req.params.id) } });
  if (!fund) return res.status(404).json({ message: "Fund not found" });
  fund.name = name ?? fund.name;
  fund.manager = manager ?? fund.manager;
  await AppDataSource.manager.save(fund);
  res.json(fund);
});

// Delete a fund (admin/manager only)
router.delete("/:id", async (req, res) => {
  const fund = await AppDataSource.manager.findOne(Fund, { where: { id: Number(req.params.id) } });
  if (!fund) return res.status(404).json({ message: "Fund not found" });
  await AppDataSource.manager.remove(fund);
  res.status(204).send();
});

// Filtering, sorting, and pagination for funds
router.get("/search", async (req, res) => {
  const { name, manager, sortBy = "id", order = "ASC", page = 1, limit = 10 } = req.query;
  const qb = AppDataSource.getRepository(Fund).createQueryBuilder("fund");
  if (name) qb.andWhere("fund.name ILIKE :name", { name: `%${name}%` });
  if (manager) qb.andWhere("fund.manager ILIKE :manager", { manager: `%${manager}%` });
  qb.leftJoinAndSelect("fund.performances", "performance");
  qb.orderBy(`fund.${sortBy}`, order === "DESC" ? "DESC" : "ASC");
  qb.skip((Number(page) - 1) * Number(limit)).take(Number(limit));
  const [funds, total] = await qb.getManyAndCount();
  res.json({ data: funds, total });
});

// Statistics endpoint: average NAV and yield for a fund
router.get("/:id/statistics", async (req, res) => {
  const fundId = Number(req.params.id);
  const performances = await AppDataSource.getRepository("FundPerformance").find({
    where: { fund: { id: fundId } },
  });
  if (!performances.length) return res.status(404).json({ message: "No performances found for this fund" });
  const avgNav = performances.reduce((sum, p) => sum + Number(p.nav), 0) / performances.length;
  const avgYield = performances.reduce((sum, p) => sum + Number(p.yield), 0) / performances.length;
  res.json({ averageNav: avgNav, averageYield: avgYield });
});

export default router; 
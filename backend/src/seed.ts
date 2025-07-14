import "dotenv/config";
import { AppDataSource } from "./data-source";
import { Fund } from "./models/Fund";
import { FundPerformance } from "./models/FundPerformance";

async function seed() {
  await AppDataSource.initialize();

  // Sample funds
  const fund1 = new Fund();
  fund1.name = "Alpha Growth Fund";
  fund1.manager = "Jane Doe";

  const fund2 = new Fund();
  fund2.name = "Beta Income Fund";
  fund2.manager = "John Smith";

  await AppDataSource.manager.save([fund1, fund2]);

  // Sample performances
  const perf1 = new FundPerformance();
  perf1.date = new Date("2024-01-31");
  perf1.nav = 105.23;
  perf1.yield = 2.1;
  perf1.fund = fund1;

  const perf2 = new FundPerformance();
  perf2.date = new Date("2024-02-29");
  perf2.nav = 107.45;
  perf2.yield = 2.3;
  perf2.fund = fund1;

  const perf3 = new FundPerformance();
  perf3.date = new Date("2024-01-31");
  perf3.nav = 98.76;
  perf3.yield = 1.8;
  perf3.fund = fund2;

  await AppDataSource.manager.save([perf1, perf2, perf3]);

  console.log("Sample data seeded successfully.");
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
}); 
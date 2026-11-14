import { migrate, pool } from "./db.js";

console.log("[db] Connecting to Neon Postgres and running migrations...");
try {
  await migrate();
  console.log("[db] Migration and seed completed successfully!");
  process.exit(0);
} catch (e) {
  console.error("[db] Migration failed:", e);
  process.exit(1);
} finally {
  await pool.end();
}

import "dotenv/config";
import app from "./app.js";
import { closeDatabase } from "./models/employeeModel.js";

const port = Number(process.env.PORT) || 5000;
const server = app.listen(port, () => {
  console.log(`Employee API is running at http://localhost:${port}/api`);
});

function shutDown() {
  server.close(() => {
    closeDatabase();
    process.exit(0);
  });
}

process.on("SIGINT", shutDown);
process.on("SIGTERM", shutDown);
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { PAGE_ROUTE_FILES, PAGE_PATHS } from "./shared/config/siteRoutes.js";
import { handleAnalyzeRequest } from "./shared/server/analyzeHandler.js";
import { handleNewsRequest } from "./shared/server/newsHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/analyze", handleAnalyzeRequest);
app.get("/api/news", handleNewsRequest);
app.get("/api/news/:category", handleNewsRequest);

PAGE_ROUTE_FILES.forEach(({ route, file }) => {
  app.get(route, (_req, res) => {
    res.sendFile(path.join(__dirname, file));
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Home: http://localhost:${PORT}${PAGE_PATHS.home}`);
  console.log(`Dashboard: http://localhost:${PORT}${PAGE_PATHS.dashboard}`);
});

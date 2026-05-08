import { handleAnalyzeRequest } from "../shared/server/analyzeHandler.js";

export default async function handler(req, res) {
  return handleAnalyzeRequest(req, res);
}

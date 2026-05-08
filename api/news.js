import { handleNewsRequest } from "../shared/server/newsHandler.js";

export default async function handler(req, res) {
  return handleNewsRequest(req, res);
}

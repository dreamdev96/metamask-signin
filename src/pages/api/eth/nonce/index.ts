import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(400).send({ error: "GET request required" });
  }
  const { wallet } = req.query;
  const signature = v4();

  return res.status(200).send({ wallet, signature });
}

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(400).send({ error: "POST request required" });
  }
  const { wallet, signature } = req.body;
  // fake validation of wallet and signature
  const signed = !!(wallet && signature);

  return res.status(200).send({ signed });
}

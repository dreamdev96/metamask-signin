import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(400).send({ error: "POST request required" });
  }
  const { username, email, password } = req.body;
  // fake registration with email/password
  const signed = !!(username && email && password);

  return res.status(200).send({ signed });
}

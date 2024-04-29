import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(400).send({ error: "POST request required" });
  }
  const { email, password } = req.body;
  // fake sign-in validation for email/password
  const signed = !!(email && password);

  return res.status(200).send({ signed });
}

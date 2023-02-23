import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const username = String(req.query.username);

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "Usuário não existente." });
  }

  return res.json({});
}

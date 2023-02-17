import dayjs from "dayjs";
import { prisma } from "./../../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const username = String(req.query.username);
  const { date } = req.query;
  const referenceDate = dayjs(String(date));

  if (!date) {
    return res.status(400).json({ message: "Data não informada" });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "usuário não existente" });
  }

  const isPastDate = referenceDate.endOf("day").isBefore(new Date());

  if (isPastDate) {
    return res.json({ availability: [] });
  }
}

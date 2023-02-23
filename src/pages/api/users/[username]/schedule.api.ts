import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
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

  const createSchedulingBody = z.object({
    name: z.string(),
    email: z.string().email(),
    obs: z.string(),
    date: z.string().dateTime(),
  });

  const { date, name, email, obs } = createSchedulingBody.parse(req.body);

  const schedulingDate = dayjs(date).startOf("hour");

  if (schedulingDate.isBefore(new Date())) {
    return res.status(400).json({
      message: "A data escolhida já passou",
    });
  }

  const conflictingSchedule = await prisma.schedule.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  });

  if (conflictingSchedule) {
    return res.status(400).json({
      message: "A data escolhida já foi agendada.",
    });
  }

  await prisma.schedule.create({
    data: {
      name,
      email,
      observations: obs,
      date: schedulingDate.toDate(),
      user_id: user.id,
    },
  });

  return res.status(201).end();
}

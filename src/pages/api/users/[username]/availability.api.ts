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
    return res.json({ possibleTime: [], availableTimes: [] });
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get("day"),
    },
  });

  if (!userAvailability) {
    return res.json({ possibleTime: [], availableTimes: [] });
  }

  const { time_end_in_minutes, time_start_in_minutes } = userAvailability;

  const startHour = time_start_in_minutes / 60;
  const endHour = time_end_in_minutes / 60;

  const possibleTime = Array.from({ length: endHour - startHour }).map(
    (_, i) => {
      return startHour + i;
    }
  );

  const blockedTimes = await prisma.schedule.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set("hour", startHour).toDate(),
        lte: referenceDate.set("minute", endHour).toDate(),
      },
    },
  });

  const availableTimes = possibleTime.filter((time) => {
    const isTimeBlocked = blockedTimes.some(
      (blockedTime) => blockedTime.date.getHours() === time
    );
    const isTimeInPast = referenceDate.set("hour", time).isBefore(new Date());

    return !isTimeBlocked && !isTimeInPast;
  });

  return res.json({ availableTimes, possibleTime });
}

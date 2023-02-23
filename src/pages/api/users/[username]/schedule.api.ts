import { google } from "googleapis";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "../../../../libs/prisma";
import { getGoogleOauthService } from "../../../../libs/google";

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
    observations: z.string(),
    date: z.string(),
  });

  const { date, name, email, observations } = createSchedulingBody.parse(
    req.body
  );

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

  const scheduleId = await prisma.schedule.create({
    data: {
      name,
      email,
      observations,
      date: schedulingDate.toDate(),
      user_id: user.id,
    },
  });

  const calendar = google.calendar({
    version: "v3",
    auth: await getGoogleOauthService(user.id),
  });

  await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Ig Call: ${name}`,
      description: observations,
      start: {
        dateTime: schedulingDate.format(),
      },
      end: {
        dateTime: schedulingDate.add(1, "hour").format(),
      },
      attendees: [
        {
          email,
          displayName: name,
        },
      ],
      conferenceData: {
        createRequest: {
          requestId: scheduleId.id,
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    },
  });

  return res.status(201).end();
}

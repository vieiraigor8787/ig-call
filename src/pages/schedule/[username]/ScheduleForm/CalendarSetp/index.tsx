import {
  Container,
  TimePicker,
  TimePickerList,
  TimePickerHeader,
  TimePickerItem,
} from "./styles";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import { Calendar } from "../../../../../components/Calendar";
import { api } from "../../../../../libs/axios";

interface Available {
  possibleTimes: number[];
  availableTimes: number[];
}

interface CalendarStepProps {
  onSelectedDateTime: (date: Date) => void;
}

export function CalendarStep({ onSelectedDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const isDateSelected = !!selectedDate;

  const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
  const describeDate = selectedDate
    ? dayjs(selectedDate).format("DD[ de ]MMMM")
    : null;

  const router = useRouter();
  const username = String(router.query.username);

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format("YYYY-MM-DD")
    : null;

  const { data: available } = useQuery<Available>(
    ["availability", selectedDateWithoutTime],
    async () => {
      const res = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      });

      return res.data;
    },
    {
      enabled: !!selectedDate,
    }
  );

  function handleSelectedTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set("hour", hour)
      .startOf("hour")
      .toDate();

    onSelectedDateTime(dateWithTime);
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} - <span>{describeDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            {available?.possibleTimes.map((hour) => {
              return (
                <TimePickerItem
                  key={hour}
                  onClick={() => handleSelectedTime(hour)}
                  disabled={!available.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, "0")}:00h
                </TimePickerItem>
              );
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}

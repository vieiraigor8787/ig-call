import {
  Container,
  TimePicker,
  TimePickerList,
  TimePickerHeader,
  TimePickerItem,
} from "./styles";
import { Calendar } from "../../../../../components/Calendar";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { api } from "../../../../../libs/axios";
import { useRouter } from "next/router";

interface Available {
  possibleTimes: number[];
  availableTimes: number[];
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [available, setAvailable] = useState<Available | null>(null);
  console.log(selectedDate);
  const isDateSelected = !!selectedDate;

  const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
  const describeDate = selectedDate
    ? dayjs(selectedDate).format("DD[ de ]MMMM")
    : null;

  const router = useRouter();
  const username = String(router.query.username);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    api
      .get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format("YYY-MM-DD"),
        },
      })
      .then((response) => {
        setAvailable(response.data);
      });
  }, [selectedDate, username]);

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

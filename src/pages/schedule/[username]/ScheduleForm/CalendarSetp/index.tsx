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

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [available, setAvailable] = useState(null);

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
      .then((response) => console.log(response.data));
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
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>09:00</TimePickerItem>
            <TimePickerItem>10:00</TimePickerItem>
            <TimePickerItem>11:00</TimePickerItem>
            <TimePickerItem>12:00</TimePickerItem>
            <TimePickerItem>13:00</TimePickerItem>
            <TimePickerItem>14:00</TimePickerItem>
            <TimePickerItem>15:00</TimePickerItem>
            <TimePickerItem>16:00</TimePickerItem>
            <TimePickerItem>17:00</TimePickerItem>
            <TimePickerItem>18:00</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}

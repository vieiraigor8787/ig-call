import {
  Container,
  TimePicker,
  TimePickerList,
  TimePickerHeader,
  TimePickerItem,
} from "./styles";
import { Calendar } from "../../../../../components/Calendar";

export function CalendarStep() {
  const isDateSelected = true;

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar />
      if (isDateSelected) &&{" "}
      {
        <TimePicker>
          <TimePickerHeader>
            terça=feiera <span>20 de setrembro</span>
          </TimePickerHeader>
          <TimePickerList>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>08:00</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      }
    </Container>
  );
}

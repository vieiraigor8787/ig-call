import { CaretLeft, CaretRight } from "phosphor-react";
import {
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
  CalendarActions,
} from "./styles";

import { getWeekDays } from "../../utils/get-week-days";

export function Calendar() {
  const shortWeekDays = getWeekDays({ short: true });

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          Fevereiro <span>2023</span>
        </CalendarTitle>
        <CalendarActions>
          <button>
            <CaretLeft />
          </button>
          <button>
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>
      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr></tr>
        </tbody>
        <CalendarDay></CalendarDay>
      </CalendarBody>
    </CalendarContainer>
  );
}

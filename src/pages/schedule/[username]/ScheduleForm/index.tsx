import { useState } from "react";
import { CalendarStep } from "./CalendarSetp";
import { ConfirmStep } from "./ConfirmStep";

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>();

  if (selectedDateTime) {
    return <ConfirmStep />;
  }
  return <CalendarStep onSelectedDateTime={setSelectedDateTime} />;
}

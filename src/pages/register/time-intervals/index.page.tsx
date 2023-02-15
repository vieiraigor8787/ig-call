import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { getWeekDays } from "../../../utils/get-week-days";
import { Container, Header } from "../styles";
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from "./styles";

export default function TimeIntervals() {
  const { control, register, watch } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: "08:00", endTime: "18:00" },
        { weekDay: 1, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 2, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 3, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 4, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 5, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekDay: 6, enabled: false, startTime: "08:00", endTime: "18:00" },
      ],
    },
  });

  const weekDays = getWeekDays();

  const { fields } = useFieldArray({
    name: "intervals",
    control,
  });

  const intervals = watch("intervals");

  return (
    <Container>
      <Header>
        <Heading>Quase lá</Heading>
        <Text>
          Defina o interfvalo de horários que você está disponível em cada dia
          da semana
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form">
        <IntervalContainer>
          {fields.map((field, i) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${i}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true);
                          }}
                        />
                      );
                    }}
                  />
                  <Text>{weekDays[field.weekDay]}</Text>
                </IntervalDay>
                <IntervalInputs>
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    {...register(`intervals.${i}.startTime`)}
                    disabled={intervals[i].enabled === false}
                  />
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    {...register(`intervals.${i}.endTime`)}
                    disabled={intervals[i].enabled === false}
                  />
                </IntervalInputs>
              </IntervalItem>
            );
          })}
        </IntervalContainer>

        <Button type="submit">
          Próximo passo <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  );
}

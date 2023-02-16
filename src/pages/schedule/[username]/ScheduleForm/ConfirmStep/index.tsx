import { Button, Text, TextInput } from "@ignite-ui/react";
import { CalendarBlank, Clock } from "phosphor-react";
import { ConfirmForm, FormActions, FormHeader } from "./styles";

export function ConfirmStep() {
  return (
    <ConfirmForm>
      <FormHeader>
        <Text>
          <CalendarBlank />
          16 de Fevereiro de 2033
        </Text>
        <Text>
          <Clock />
          18:00
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="seu nome" />
      </label>
      <label>
        <Text size="sm">E-mail</Text>
        <TextInput type="email" placeholder="jhondoe@example.com" />
      </label>
      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  );
}

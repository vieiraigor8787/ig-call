import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { CalendarBlank, Clock } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";
import { api } from "../../../../../libs/axios";
import { useRouter } from "next/router";

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: "Mínimo de 3 caracteres" }),
  email: z.string().email({ message: "Digite um endereço de e-mail válido" }),
  observations: z.string().nullable(),
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

interface ConfirmStepProps {
  schedulingDate: Date;
  onCancelConfirmation: () => void;
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(confirmFormSchema),
  });

  const router = useRouter();
  const username = String(router.query.username);

  async function handleConfirmStep(data: ConfirmFormData) {
    const { name, email, observations } = data;

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    });

    await router.push(`/schedule/${username}`);

    onCancelConfirmation();
  }

  const describedDate = dayjs(schedulingDate).format("DD[ de ]MMMM[ de ]YYYY");
  const describedTime = dayjs(schedulingDate).format("HH[h]mm");

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmStep)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="seu nome" {...register("name")} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>
      <label>
        <Text size="sm">E-mail</Text>
        <TextInput
          type="email"
          placeholder="jhondoe@example.com"
          {...register("email")}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>
      <label>
        <Text size="sm">Observações</Text>
        <TextArea
          placeholder="Escreva aqui alguma observação"
          {...register("observations")}
        />
      </label>
      <FormActions>
        <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  );
}

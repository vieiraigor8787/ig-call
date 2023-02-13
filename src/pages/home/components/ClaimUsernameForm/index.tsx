import { Button, TextInput } from "@ignite-ui/react";
import { Text } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormAnnotation } from "./styles";

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Mínimo 3 caracteres" })
    .regex(/^([a-z\\-]+)$/, {
      message: "Só pode conter letras e hifen",
    })
    .transform((username) => username.toLowerCase()),
});

type claimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<claimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  async function handleClaimUsername(data: claimUsernameFormData) {}

  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="seu-usuario"
        {...register("username")}
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : "Digite o nome do usuário desejado"}
        </Text>
      </FormAnnotation>
    </Form>
  );
}

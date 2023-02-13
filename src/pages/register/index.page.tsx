import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Container, Form, FormError, Header } from "./styles";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Mínimo 3 caracteres" })
    .regex(/^([a-z\\-]+)$/, {
      message: "Só pode conter letras e hifen",
    })
    .transform((username) => username.toLowerCase()),

  name: z
    .string()
    .min(3, { message: "Mínimo 3 caracteres" })
    .regex(/^([a-z\\]+)$/, {
      message: "Só pode conter letras",
    })
    .transform((name) => name.toLowerCase()),
});

type registerFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  async function handleRegister(data: registerFormData) {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem vindo ao Ig-Call</Heading>
        <Text>
          {" "}
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text>Nome do usuário</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuario"
            {...register("username")}
          ></TextInput>

          {errors.username && (
            <FormError color="" size="sm">
              {errors.username.message}
            </FormError>
          )}
        </label>

        <label>
          <Text>Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register("name")}></TextInput>

          {errors.name && (
            <FormError color="" size="sm">
              {errors.name.message}
            </FormError>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
}

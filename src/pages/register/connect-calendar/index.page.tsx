import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";

import { Container, Header } from "./../styles";
import { ConnectBox, ConnectItem } from "./styles";

export default function Register() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda</Heading>
        <Text>
          {" "}
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button variant="secondary">
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}

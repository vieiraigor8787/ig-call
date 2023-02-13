import { Heading, Text } from "@ignite-ui/react";
import Image from "next/image";
import { Container, Hero, Preview } from "./styles";

import previewImg from "../../assets/app-preview.png";

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>
        <Text size="lg">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
      </Hero>
      <Preview>
        <Image
          src={previewImg}
          height={400}
          quality={100}
          alt="calendario simbolizando a aplicação em funcionamento"
        />
      </Preview>
    </Container>
  );
}

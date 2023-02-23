import { Avatar, Text } from "@ignite-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { prisma } from "../../../libs/prisma";
import { ScheduleForm } from "./ScheduleForm";
import { Container, UserHeader } from "./styles";

interface ScheduleProps {
  user: {
    name: string;
    bio: string;
    avatarUrl: string;
  };
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <>
      <NextSeo title={`Agendar com ${user.name} | Ig Call`} noindex />

      <Container>
        <UserHeader>
          <Avatar src={user.avatarUrl} />
          <Text>{user.name}</Text>
          <Text>{user.bio}</Text>
        </UserHeader>

        <ScheduleForm />
      </Container>
    </>
  );
}

//Gerar pagina estática no momento da build Next
export const getStaticPaths: GetStaticPaths = async () => {
  //somento quando o user acessar essa página
  return {
    paths: [],
    //vai gerar a página estatica, quando os dados estiverem prontos (staticprops)
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username);
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // a página irá atualizar 1x por dia
  };
};

import { Avatar, Text } from "@ignite-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { prisma } from "../../../libs/prisma";
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
    <Container>
      <UserHeader>
        <Avatar src={user.avatarUrl} />
        <Text>{user.name}</Text>
        <Text>{user.bio}</Text>
      </UserHeader>
    </Container>
  );
}

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
  };
};

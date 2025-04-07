import {
  Card,
  Text,
  Title,
  Container,
  Box,
  Divider,
  Stack,
  Flex,
  Button,
  Skeleton,
} from "@mantine/core";
import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/api";
import type { User } from "../api/api";

export default function UserDetailsPage() {
  const { id } = useParams({ strict: false });

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const user = users.find((u) => u.id === Number(id));

  if (isLoading)
    return (
      <>
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </>
    );

  if (isError)
    return (
      <Container
        style={{
          color: "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
        }}
      >
        Error loading user details.
      </Container>
    );

  if (!user) return <Container>User not found.</Container>;

  return (
    <>
      <Title
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
          marginTop: "50px",
        }}
      >
        User Details
      </Title>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          padding: "1rem",
        }}
      >
        <Card
          radius="xl"
          withBorder
          style={{
            borderColor: "#c9a9ff",
            borderWidth: "2px",
            borderStyle: "solid",
            backgroundColor: "#d0bfff",
            boxSizing: "border-box",
            width: "100%",
            maxWidth: "900px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Box mb="md">
            <Button
              component={Link}
              to="/"
              variant="light"
              color="violet"
              radius="xl"
            >
              ← Back to Users
            </Button>
          </Box>
          <Stack>
            <Box>
              <Title ta="center">{user?.name}</Title>
            </Box>

            <Divider my="xs" color="blue" />

            <Card style={{ textAlign: "center", backgroundColor: "#d0bfff" }}>
              <Flex gap={10} wrap="wrap">
                <Text fw={600} style={{ fontSize: "22px" }}>
                  Username:
                </Text>
                <Text style={{ fontSize: "22px" }}>{user?.username}</Text>
              </Flex>
              <Flex gap={10} wrap="wrap">
                <Text fw={600} style={{ fontSize: "22px" }}>
                  Email:
                </Text>
                <Text style={{ fontSize: "22px" }}>{user?.email}</Text>
              </Flex>

              <Flex gap={10} wrap="wrap">
                <Text fw={600} style={{ fontSize: "22px" }}>
                  Phone:
                </Text>
                <Text style={{ fontSize: "22px" }}>{user?.phone}</Text>
              </Flex>

              <Flex gap={10} wrap="wrap">
                <Text style={{ fontSize: "22px" }} fw={600}>
                  Website:
                </Text>
                <Text style={{ fontSize: "22px" }}>{user?.website}</Text>
              </Flex>

              <Text
                fw={600}
                style={{
                  fontSize: "22px",
                  textAlign: "left",
                  textDecoration: "underline",
                }}
              >
                Company:
              </Text>
              <Flex gap={10} wrap="wrap">
                <Text fw={600} style={{ fontSize: "20px" }}>
                  Name:
                </Text>
                <Text style={{ fontSize: "22px" }}>{user?.company?.name}</Text>
              </Flex>
              <Flex gap={10} wrap="wrap">
                <Text fw={600} style={{ fontSize: "20px" }}>
                  Catch Phrase:
                </Text>
                <Text style={{ fontSize: "22px" }}>
                  {user?.company?.catchPhrase}
                </Text>
              </Flex>

              <Flex gap={10} wrap="wrap">
                <Text fw={600} style={{ fontSize: "20px" }}>
                  Business:
                </Text>
                <Text style={{ fontSize: "22px" }}>{user?.company?.bs}</Text>
              </Flex>

              <Flex gap={10}>
                <Text
                  style={{ fontSize: "22px", textDecoration: "underline" }}
                  fw={600}
                >
                  Address:
                </Text>
                <Text style={{ fontSize: "22px" }}>
                  {user?.address?.suite}, {user?.address?.street},
                  {user?.address?.city} , {user?.address?.zipcode}
                </Text>
              </Flex>
            </Card>
          </Stack>
        </Card>
      </Box>
    </>
  );
}

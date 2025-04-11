import {
  Table,
  Container,
  Title,
  Box,
  TextInput,
  Card,
  Stack,
  Skeleton,
  Button,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/api";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { User } from "../api/api";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { Menu, ActionIcon } from "@mantine/core";
import { IconDotsVertical, IconPlus } from "@tabler/icons-react";
import SameComponent from "./sameComponent";

export default function HomePage() {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const PAGE_SIZE = 5;
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [debounce] = useDebouncedValue(input, 1000);
  const [modalOpened, setModalOpened] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const openAddModal = () => {
    setSelectedUser(undefined);
    setModalMode("add");
    setModalOpened(true);
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setModalMode("edit");
    setModalOpened(true);
  };

  const handleSubmitUser = (user: Omit<User, "id">) => {
    console.log("User Submitted:", user);
    alert(
      `${user.name} was ${modalMode === "add" ? "added" : "updated"} successfully!`
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setVisibleCount(5);
  };
  const handleClick = (id?: number) => {
    if (id != null) {
      navigate({ to: "/user/$id", params: { id: String(id) } });
    }
  };
  const filtered = data.filter((user) =>
    user?.name?.toLowerCase().includes(debounce.toLowerCase())
  );

  const visibleUsers = filtered.slice(0, visibleCount);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && visibleCount < filtered.length) {
          console.log(" Loading more users...");
          setVisibleCount((prev) => prev + PAGE_SIZE);
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef.current, filtered.length, visibleCount]);
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
        Error loading user List.
      </Container>
    );

  return (
    <Container size="lg" py="xl" px="md">
      <SameComponent
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        mode={modalMode}
        initialData={selectedUser}
        onSubmit={handleSubmitUser}
      />
      <Card
        shadow="lg"
        padding="xl"
        radius="xl"
        withBorder
        style={{
          backgroundColor: "#f3f0ff",
          borderColor: "#d0bfff",
          borderWidth: "2px",
          borderStyle: "solid",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <Stack gap="lg">
          <Title ta="center" style={{ color: "#5f3dc4" }}>
            User List
          </Title>

          <Box style={{ display: "flex", justifyContent: "center" }}>
            <TextInput
              placeholder="Search Here"
              value={input}
              leftSection={<IconSearch size={18} />}
              onChange={handleInputChange}
              w="100%"
              style={{ maxWidth: 600 }}
            />
          </Box>

          <Box>
            <Table
              highlightOnHover
              striped
              withColumnBorders
              style={{
                width: "100%",
                height: 200,
                tableLayout: "auto",
                borderCollapse: "collapse",
                border: "2px solid #d0bfff",
              }}
            >
              <Table.Thead style={{ backgroundColor: "#e5dbff" }}>
                <Table.Tr>
                  <Table.Th
                    style={{
                      color: "#3b2f63",
                      fontSize: "22px",
                      textAlign: "center",
                      paddingLeft: "12px",
                      fontWeight: 600,
                    }}
                  >
                    Name
                  </Table.Th>
                  <Table.Th
                    style={{
                      color: "#3b2f63",
                      fontSize: "22px",
                      textAlign: "center",
                      paddingLeft: "12px",
                      fontWeight: 600,
                    }}
                  >
                    Email
                  </Table.Th>
                  <Table.Th
                    style={{
                      color: "#3b2f63",
                      fontSize: "22px",
                      textAlign: "center",
                      paddingLeft: "12px",
                      fontWeight: 600,
                    }}
                  >
                    Actions
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {visibleUsers.map((user) => (
                  <Table.Tr
                    key={user?.id}
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.closest("[data-ignore-row-click]")) return;
                      handleClick(user?.id);
                    }}
                    style={{
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  >
                    <Table.Td
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {user?.name}
                    </Table.Td>
                    <Table.Td
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {user?.email}
                    </Table.Td>
                    <Table.Td
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <Menu
                        position="bottom-end"
                        withArrow
                        shadow="md"
                        width={140}
                      >
                        <Menu.Target>
                          <ActionIcon
                            variant="light"
                            color="grape"
                            data-ignore-row-click
                          >
                            <IconDotsVertical size={18} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(user);
                            }}
                          >
                            Edit User
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Button
                leftSection={<IconPlus size={16} />}
                onClick={openAddModal}
                color="grape"
                mt="md"
                radius="xl"
                w={200}
              >
                Add User
              </Button>
            </Box>

            <div ref={loaderRef} style={{ height: 1 }} />
            {visibleCount < filtered.length && (
              <Skeleton height={40} mt="lg" radius="xl" animate />
            )}
          </Box>
        </Stack>
      </Card>
    </Container>
  );
}

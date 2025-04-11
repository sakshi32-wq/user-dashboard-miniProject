import {
  Box,
  Button,
  Card,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "@mantine/form";

export default function TwoFA() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      code: "",
    },
    validate: {
      code: (value) =>
        /^\d{6}$/.test(value) ? null : "Please enter a valid 6-digit code",
    },
  });

  const handleSubmit = () => {
    if (form.validate().hasErrors) return;

    console.log("2FA Code:", form.values.code);
    alert("Two-factor authentication successful!");
    navigate({ to: "/signIn" });
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f5ff",
        padding: "1rem",
      }}
    >
      <Card
        shadow="lg"
        padding="xl"
        radius="xl"
        withBorder
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#f3f0ff",
          border: "2px solid #d0bfff",
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Title ta="center" style={{ color: "#5f3dc4" }}>
              Two-Factor Authentication
            </Title>

            <Text style={{ color: "#5f3dc4", fontWeight: 500 }}>
              Enter the 6-digit code from your authenticator app or SMS.
            </Text>

            <TextInput
              label="Authentication Code"
              placeholder="123456"
              {...form.getInputProps("code")}
              styles={{ label: { color: "#5f3dc4", fontWeight: 600 } }}
            />

            <Button
              type="submit"
              fullWidth
              radius="xl"
              style={{
                backgroundColor: "#5f3dc4",
                color: "white",
                fontWeight: 600,
              }}
            >
              Verify
            </Button>
          </Stack>
        </form>
      </Card>
    </Box>
  );
}

import {
  Box,
  Button,
  Card,
  Stack,
  Text,
  PasswordInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "@tanstack/react-router";

export default function SetNewPasswordPage() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = () => {
    if (form.validate().hasErrors) return;
    console.log("New password set:", form.values.password);
    alert("Password successfully reset!");
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
          minHeight: 320,
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Title ta="center" style={{ color: "#5f3dc4" }}>
              Set New Password
            </Title>

            <PasswordInput
              label="New Password"
              placeholder="Enter new password"
              {...form.getInputProps("password")}
              styles={{ label: { color: "#5f3dc4", fontWeight: 600 } }}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm new password"
              {...form.getInputProps("confirmPassword")}
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
                marginTop: 10,
              }}
            >
              Reset Password
            </Button>

            <Box ta="center">
              <Text size="sm">
                Go Back To
                <Text
                  span
                  style={{
                    color: "#5f3dc4",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                  onClick={() => (window.location.href = "/signIn")}
                >
                  Sign In
                </Text>
              </Text>
            </Box>
          </Stack>
        </form>
      </Card>
    </Box>
  );
}

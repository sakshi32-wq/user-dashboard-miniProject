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

export default function ForgotPassword() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
    },
  });

  const handleSubmit = () => {
    if (form.validate().hasErrors) return;

    console.log("Forgot Password for:", form.values.email);
    alert("Reset link sent!");
    navigate({ to: "/resetPassword" });
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
          height: 300,
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Title ta="center" style={{ color: "#5f3dc4" }}>
              Forgot Password
            </Title>

            <TextInput
              label="Email"
              placeholder="Enter your email"
              required
              {...form.getInputProps("email")}
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
              Send Reset Link
            </Button>

            <Box ta="center">
              <Text size="sm">
                Go Back To{" "}
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

import {
  Box,
  Button,
  Card,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "@mantine/form";

export default function SignIn() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
      password: (value) =>
        value.trim().length === 0 ? "Password is required" : null,
    },
  });

  const handleSubmit = () => {
    if (form.validate().hasErrors) return;

    console.log("Sign In Data:", form.values);
    alert("Sign in successful!");
    navigate({ to: "/homePage" });
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
          height: 500,
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Title ta="center" style={{ color: "#5f3dc4" }}>
              Welcome Back
            </Title>
            <Title ta="center" style={{ color: "#5f3dc4" }}>
              Sign In
            </Title>

            <TextInput
              label="Email"
              placeholder="Enter your email"
              {...form.getInputProps("email")}
              styles={{ label: { color: "#5f3dc4", fontWeight: 600 } }}
            />

            <PasswordInput
              label="Password"
              placeholder="Enter password"
              {...form.getInputProps("password")}
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
                marginTop: "20px",
              }}
            >
              Sign In
            </Button>

            <Box ta="center">
              <Text size="sm">
                <Text
                  span
                  style={{
                    color: "#5f3dc4",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                  onClick={() => (window.location.href = "/forgotPassword")}
                >
                  Forgot Password?
                </Text>
              </Text>
            </Box>

            <Box ta="center">
              <Text size="sm">
                Don't have an account?{" "}
                <Text
                  span
                  style={{
                    color: "#5f3dc4",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                  onClick={() => navigate({ to: "/signup" })}
                >
                  Sign Up
                </Text>
              </Text>
            </Box>
          </Stack>
        </form>
      </Card>
    </Box>
  );
}

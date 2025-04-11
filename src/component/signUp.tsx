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

export default function SignUp() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      name: (value) => (value.trim().length === 0 ? "Name is required" : null),
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = () => {
    if (form.validate().hasErrors) return;
    console.log("Sign Up Data:", form.values);
    alert("Sign up successful!");
    navigate({ to: "/otp" });
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
          backgroundColor: "#f3f0ff",
          border: "2px solid #d0bfff",
          width: "100%",
          maxWidth: 500,
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Title ta="center" style={{ color: "#5f3dc4" }}>
              Create Account
            </Title>

            <TextInput
              label="Name"
              placeholder="Enter your name"
              {...form.getInputProps("name")}
              styles={{ label: { color: "#5f3dc4", fontWeight: 600 } }}
            />

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

            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm password"
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
              }}
            >
              Sign Up
            </Button>

            <Box ta="center">
              <Text size="sm">
                Already have an account?{" "}
                <Text
                  span
                  style={{
                    color: "#5f3dc4",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                  onClick={() => navigate({ to: "/signIn" })}
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

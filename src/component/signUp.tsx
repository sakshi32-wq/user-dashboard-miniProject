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
import { useState } from "react";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    navigate({ to: "/otp" });
    console.log("Sign Up Data:", form);
    alert("Sign up successful!");
  };

  const handleSignInRedirect = () => {
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
          backgroundColor: "#f3f0ff",
          border: "2px solid #d0bfff",
          width: "100%",
          maxWidth: 500,
        }}
      >
        <Stack>
          <Title ta="center" style={{ color: "#5f3dc4" }}>
            Create Account
          </Title>

          <TextInput
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            styles={{ label: { color: "#5f3dc4", fontWeight: 600 } }}
          />
          <TextInput
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            styles={{ label: { color: "#5f3dc4", fontWeight: 600 } }}
          />
          <PasswordInput
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
            styles={{ label: { color: "#5f3dc4", fontWeight: 600 } }}
          />
          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required
            styles={{ label: { color: "#5f3dc4", fontWeight: 600 } }}
          />

          <Button
            fullWidth
            radius="xl"
            onClick={handleSubmit}
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
                onClick={handleSignInRedirect}
              >
                Sign In
              </Text>
            </Text>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}

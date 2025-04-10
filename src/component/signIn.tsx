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

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.email || !form.password) {
      alert("Please fill out all fields.");
      return;
    }
    console.log("Sign In Data:", form);
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
        <Stack>
          <Title ta="center" style={{ color: "#5f3dc4" }}>
            Welcome Back
          </Title>
          <Title ta="center" style={{ color: "#5f3dc4" }}>
            Sign In
          </Title>

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

          <Button
            fullWidth
            radius="xl"
            onClick={handleSubmit}
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
                style={{ color: "#5f3dc4", cursor: "pointer", fontWeight: 500 }}
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
                style={{ color: "#5f3dc4", cursor: "pointer", fontWeight: 500 }}
                onClick={() => (window.location.href = "/signUp")}
              >
                Sign Up
              </Text>
            </Text>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}

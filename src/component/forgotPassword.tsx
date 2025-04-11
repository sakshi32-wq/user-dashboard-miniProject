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
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    console.log("Forgot Password for:", email);
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
        <Stack>
          <Title ta="center" style={{ color: "#5f3dc4" }}>
            Forgot Password
          </Title>

          <TextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
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
              marginTop: 10,
            }}
          >
            Send Reset Link
          </Button>

          <Box ta="center">
            <Text size="sm">
              Go Back To
              <Text
                span
                style={{ color: "#5f3dc4", cursor: "pointer", fontWeight: 500 }}
                onClick={() => (window.location.href = "/signIn")}
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

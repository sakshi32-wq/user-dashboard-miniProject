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

export default function TwoFA() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (code.length !== 6) {
      alert("Please enter a valid 6-digit code.");
      return;
    }
    console.log("2FA Code:", code);
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
        <Stack>
          <Title ta="center" style={{ color: "#5f3dc4" }}>
            Two-Factor Authentication
          </Title>
          <Text style={{ color: "#5f3dc4", fontWeight: 500 }}>
            Enter the 6-digit code from your authenticator app or SMS.
          </Text>

          <TextInput
            label="Authentication Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
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
            Verify
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

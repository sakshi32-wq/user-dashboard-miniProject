import { Component, ReactNode } from "react";
import { Button, Title, Box, Text } from "@mantine/core";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
            backgroundColor: "#f8f0fc",
          }}
        >
          <Title order={1} mb={20}>
            Something went wrong.
          </Title>
          <Text size="lg" mt="sm" mb={10}>
            We're currently working on fixing this issue.
          </Text>
          <Text size="md" c="dimmed" mb={30}>
            Please refresh the page or try again in a few moments.
          </Text>
          <Button
            color="grape"
            variant="outline"
            mb={30}
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

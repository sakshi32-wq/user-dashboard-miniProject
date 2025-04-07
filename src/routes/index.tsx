import { createFileRoute } from "@tanstack/react-router";
import HomePage from "../component/Homepage";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <HomePage />;
}

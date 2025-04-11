import { createFileRoute } from "@tanstack/react-router";
import HomePage from "../component/Homepage";

export const Route = createFileRoute("/homePage")({
  component: RouteComponent,
});

function RouteComponent() {
  return <HomePage />;
}

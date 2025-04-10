import { createFileRoute } from "@tanstack/react-router";
import SignUp from "../component/signUp";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignUp />;
}

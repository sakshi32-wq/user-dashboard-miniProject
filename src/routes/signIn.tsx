import { createFileRoute } from "@tanstack/react-router";
import SignIn from "../component/signIn";

export const Route = createFileRoute("/signIn")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignIn />;
}

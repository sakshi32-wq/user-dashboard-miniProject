import { createFileRoute } from "@tanstack/react-router";
import ForgotPassword from "../component/forgotPassword";

export const Route = createFileRoute("/forgotPassword")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ForgotPassword />;
}

import { createFileRoute } from "@tanstack/react-router";
import TwoFA from "../component/otp";

export const Route = createFileRoute("/otp")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TwoFA />;
}

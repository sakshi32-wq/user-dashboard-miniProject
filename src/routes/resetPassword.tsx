import { createFileRoute } from "@tanstack/react-router";
import SetNewPasswordPage from "../component/resetPassword";

export const Route = createFileRoute("/resetPassword")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SetNewPasswordPage />;
}

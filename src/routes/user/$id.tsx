import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams();
  return <div>User ID: {id}</div>;
}

import { createFileRoute } from '@tanstack/react-router'
import UserDetailsPage from '../../component/userdetailsPage'

export const Route = createFileRoute('/user/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserDetailsPage/>
}

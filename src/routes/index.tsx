import { createFileRoute } from '@tanstack/react-router'
import UsersPage from '../component/Homepage'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <UsersPage/>
  )
}
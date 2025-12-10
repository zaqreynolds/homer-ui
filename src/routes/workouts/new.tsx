import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workouts/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/workouts/new"!</div>
}

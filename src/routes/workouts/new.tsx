import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workouts/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      Hello "/workouts/new"!
    </div>
  );
}

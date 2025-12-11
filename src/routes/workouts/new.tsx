import { Button } from "@/components/ui/button";
import { useWorkoutStore } from "@/store/workoutStore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workouts/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const draft = useWorkoutStore((state) => state.draftWorkout);
  console.log("Draft workout:", draft);
  return (
    <div className="flex flex-col w-full h-full space-y-2">
      <h2 className="mb-1">{draft?.name}</h2>
      <div className="flex space-x-2 pb-4">
        {draft?.tags?.map((tag, tagIndex) => (
          <div
            key={tagIndex}
            className="border bg-muted px-2 py-1 rounded-xl text-sm"
          >
            {tag}
          </div>
        ))}
      </div>
      <Button size="lg">Add Exercise</Button>
    </div>
  );
}

import { useWorkoutStore } from "@/store/workoutStore";
import { createFileRoute } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import { CreateExerciseSection } from "@/components/workout/CreateExerciseSection";
import type { CreateWorkout } from "@/types/workout";

export const Route = createFileRoute("/workouts/new")({
  component: CreateNewWorkout,
});

function CreateNewWorkout() {
  const draft = useWorkoutStore((state) => state.draftWorkout);

  const form = useForm<CreateWorkout>({
    defaultValues: {
      name: draft?.name || "",
      tags: draft?.tags || [],
      notes: "",
      exercises: [],
    },
  });

  return (
    <FormProvider {...form}>
      <div className="flex flex-col w-full h-full space-y-2">
        <h2 className="mb-1">{draft?.name}</h2>
        <div className="flex space-x-2 pb-4">
          {form.watch("tags")?.map((tag, tagIndex) => (
            <div
              key={tagIndex}
              className="border bg-muted px-2 py-1 rounded-xl text-sm"
            >
              {tag}
            </div>
          ))}
        </div>
        <CreateExerciseSection />
      </div>
    </FormProvider>
  );
}

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useWorkoutStore } from "@/store/workoutStore";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useNavigate } from "@tanstack/react-router";
type CreateWorkoutFormValues = {
  name: string;
  tags?: string[];
};

export const CreateWorkoutSheet = () => {
  const [open, setOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");

  const setDraftWorkout = useWorkoutStore((state) => state.setDraftWorkout);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateWorkoutFormValues>({
    defaultValues: {
      name: "",
      tags: [],
    },
  });

  const filteredTags = TAG_OPTIONS.filter((tag) =>
    tag.label.toLowerCase().includes(tagSearch.toLowerCase())
  );

  const navigate = useNavigate();

  const onSubmit = (data: CreateWorkoutFormValues) => {
    setDraftWorkout({
      name: data.name,
      tags: data.tags,
    });
    reset();
    setOpen(false);
    navigate({ to: "/workouts/new" });
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button onClick={() => setOpen(true)}>Create Workout</Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="max-h-[80vh] rounded-t-xl px-6 pt-4 overflow-y-auto"
      >
        <SheetHeader className="space-y-1 text-center">
          <SheetTitle className="text-2xl">New Workout</SheetTitle>
          <SheetDescription>
            Give your workout a name and optional tags.
          </SheetDescription>
        </SheetHeader>

        <form className="flex flex-col gap-6 mt-6">
          <div className="space-y-2">
            <div className="mb-4">
              <label htmlFor="name" className="text-sm font-medium">
                Workout Name
              </label>
              <Input
                {...register("name", { required: "Workout name is required" })}
                autoComplete="off"
                className="h-9 text-sm"
              />
              {errors.name && (
                <span className="text-sm text-red-600">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                {" "}
                <label className="text-sm font-medium">Workout Tags</label>
                <Input
                  placeholder="Search tags... "
                  value={tagSearch}
                  onChange={(e) => setTagSearch(e.target.value)}
                  autoComplete="off"
                  className="h-9 text-sm"
                />
              </div>
              <Controller
                control={control}
                name="tags"
                render={({ field }) => (
                  <div className="rounded-md border px-3 py-2 space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Choose one or more tags to group similar workouts (e.g.
                      Push, Pull, Legs).
                    </p>
                    <ToggleGroup
                      type="multiple"
                      value={field.value ?? []}
                      onValueChange={field.onChange}
                      className="flex flex-wrap gap-2"
                    >
                      {filteredTags.map((tag) => (
                        <ToggleGroupItem
                          key={tag.value}
                          value={tag.value}
                          className="px-3 py-1 rounded-full border text-xs sm:text-sm data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                        >
                          {tag.label}
                        </ToggleGroupItem>
                      ))}

                      {filteredTags.length === 0 && (
                        <span className="text-xs text-muted-foreground px-1">
                          No tags match “{tagSearch}”
                        </span>
                      )}
                    </ToggleGroup>
                  </div>
                )}
              />
              {/* You can add a tags select here later */}
              <Button
                type="submit"
                className="mt-2 w-full"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                Continue
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

const TAG_OPTIONS = [
  { value: "push", label: "Push" },
  { value: "pull", label: "Pull" },
  { value: "legs", label: "Legs" },
  { value: "upper", label: "Upper" },
  { value: "lower", label: "Lower" },
  { value: "chest", label: "Chest" },
  { value: "back", label: "Back" },
  { value: "biceps", label: "Biceps" },
  { value: "triceps", label: "Triceps" },
  { value: "arms", label: "Arms" },
  { value: "shoulders", label: "Shoulders" },
  { value: "quads", label: "Quads" },
  { value: "hamstrings", label: "Hamstrings" },
  { value: "glutes", label: "Glutes" },
  { value: "calves", label: "Calves" },
  { value: "core", label: "Core" },
  { value: "full-body", label: "Full Body" },
  { value: "cardio", label: "Cardio" },
  { value: "other", label: "Other" },
];

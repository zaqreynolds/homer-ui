import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
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
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Label } from "./ui/label";

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
        <Button onClick={() => setOpen(true)} size="lg" className="w-60">
          Create Workout
        </Button>
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

        <form
          className="flex flex-col gap-6 mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <div className="mb-4">
              <Label htmlFor="name" className="text-sm font-medium">
                Workout Name
              </Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Workout name is required" }}
                render={({ field }) => (
                  <Input
                    id="name"
                    {...field}
                    autoComplete="off"
                    className="h-9 text-sm"
                  />
                )}
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
                <Label className="text-sm font-medium">Workout Tags</Label>
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
                size="lg"
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
  { value: "upper", label: "Upper" },
  { value: "lower", label: "Lower" },
  { value: "full_body", label: "Full Body" },

  // Focus / intent
  { value: "strength", label: "Strength" },
  { value: "hypertrophy", label: "Hypertrophy" },
  { value: "conditioning", label: "Conditioning" },
  { value: "cardio", label: "Cardio" },
  { value: "mobility", label: "Mobility" },
  { value: "recovery", label: "Recovery" },
  { value: "deload", label: "Deload" },

  // Location / constraints
  { value: "gym", label: "Gym" },
  { value: "home", label: "Home" },
  { value: "outdoors", label: "Outdoors" },

  // Optional category buckets
  { value: "arms", label: "Arms" },
  { value: "legs", label: "Legs" },
  { value: "core", label: "Core" },

  { value: "other", label: "Other" },
];

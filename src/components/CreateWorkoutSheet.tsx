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

  const onSubmit = (data: CreateWorkoutFormValues) => {
    setDraftWorkout({
      name: data.name,
      tags: data.tags,
    });
    reset();
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button onClick={() => setOpen(true)}>Create Workout</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="p-6">
        <SheetHeader>
          <SheetTitle className="text-2xl">New Workout</SheetTitle>
          <SheetDescription>
            Give your workout a name and optional tags.
          </SheetDescription>
        </SheetHeader>

        <form className="flex flex-col items-center gap-4 mt-4">
          <div className="flex flex-col gap-1 w-full px-10">
            <>
              <label htmlFor="name">Workout Name</label>
              <Input
                {...register("name", { required: "Workout name is required" })}
                autoComplete="off"
              />
              {errors.name && (
                <span className="text-sm text-red-600">
                  {errors.name.message}
                </span>
              )}
            </>
            <div className="flex flex-col gap-1 w-full">
              <Input
                placeholder="Search tags... "
                value={tagSearch}
                onChange={(e) => setTagSearch(e.target.value)}
                autoComplete="off"
                className="h-8 text-sm"
              />
              <Controller
                control={control}
                name="tags"
                render={({ field }) => (
                  <div className="max-h-48 overflow-y-auto border rounded-md p-2">
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
                    <p className="text-xs text-muted-foreground">
                      Choose one or more tags to group similar workouts (e.g.
                      Push, Pull, Legs).
                    </p>
                  </div>
                )}
              />
              {/* You can add a tags select here later */}
              <Button
                type="submit"
                className="mt-2"
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
  { value: "full-body", label: "Full Body" },
  { value: "cardio", label: "Cardio" },
  { value: "other", label: "Other" },
];

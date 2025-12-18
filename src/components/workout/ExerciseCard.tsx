// src/components/workout/ExerciseCard.tsx

import { Controller, useFormContext } from "react-hook-form";
import type { CreateWorkout } from "@/types/workout";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { CreateSetsSection } from "./CreateSetSection";

type Props = {
  index: number;
  isEditing: boolean;
  onEdit: () => void;
  onDoneEditing: () => void;
  onRemove: () => void;
};

export const ExerciseCard = ({
  index,
  isEditing,
  onEdit,
  onDoneEditing,
  onRemove,
}: Props) => {
  const { control, watch, trigger, formState } =
    useFormContext<CreateWorkout>();

  const name = watch(`exercises.${index}.name`);
  const type = watch(`exercises.${index}.type`);
  const notes = watch(`exercises.${index}.notes`);
  const sets = watch(`exercises.${index}.sets`) ?? [];

  const handleSave = async () => {
    const isValid = await trigger(`exercises.${index}` as const, {
      shouldFocus: true,
    });
    if (!isValid) return;
    onDoneEditing();
  };

  const handleCancel = () => {
    // later you can resetField(`exercises.${index}`) if you want true revert
    onDoneEditing();
  };

  console.log("fieldstate errors:", formState.errors);

  return (
    <Card className="p-4">
      {/* VIEW MODE */}
      {!isEditing && (
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-medium text-sm">
                {name || "Untitled exercise"}
              </div>
              <div className="text-xs text-muted-foreground capitalize">
                {type || "strength"} • {sets.length} set
                {sets.length === 1 ? "" : "s"}
              </div>
              {notes && (
                <div className="text-xs text-muted-foreground mt-1">
                  {notes}
                </div>
              )}
            </div>
            <div className="flex gap-1">
              <Button type="button" variant="ghost" size="sm" onClick={onEdit}>
                Edit
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onRemove}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODE */}
      {isEditing && (
        <div className="flex flex-col gap-3">
          {/* Name */}
          <div className="space-y-1">
            <Label className="text-xs font-medium">Phase</Label>
            <p className="text-[10px] text-muted-foreground">
              Choose where this exercise fits in the workout.
            </p>

            <Controller
              name={`exercises.${index}.phase`}
              control={control}
              render={({ field }) => (
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={field.onChange}
                  // 👇 one pill-shaped container, no gaps
                  className="inline-flex w-full overflow-hidden rounded-full border bg-muted"
                >
                  {PHASES.map((phase, i) => (
                    <ToggleGroupItem
                      key={phase.value}
                      value={phase.value}
                      // 👇 equal-width segments, with inner dividers
                      className={[
                        "flex-1 px-2 py-2 text-[11px] sm:text-xs",
                        "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
                        "data-[state=off]:text-muted-foreground",
                        i !== 0 ? "border-l border-border" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {phase.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              )}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium">Exercise name</Label>
            <Controller
              name={`exercises.${index}.name`}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-9 text-sm"
                  autoFocus
                  autoComplete="off"
                  placeholder="e.g. Barbell Bench Press"
                />
              )}
            />
          </div>

          {/* Type */}
          <div className="space-y-1">
            <Label className="text-xs font-medium">Type</Label>
            <Controller
              name={`exercises.${index}.type`}
              control={control}
              render={({ field }) => (
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap gap-2"
                >
                  {WorkoutTypes.map((type) => (
                    <ToggleGroupItem
                      key={type}
                      value={type}
                      className="px-3 py-1 rounded-full border text-xs sm:text-sm data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                      {type}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              )}
            />
          </div>

          {/* # of Sets */}

          {/* Notes */}
          <div className="space-y-1">
            <Label className="text-xs font-medium">Notes</Label>
            <Controller
              name={`exercises.${index}.notes`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-9 text-sm"
                  placeholder="Notes (optional)"
                />
              )}
            />
          </div>

          {/* TODO: Sets editor will go here later */}
          <CreateSetsSection exerciseIndex={index} />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
const PHASES = [
  { value: "warmup", label: "Warm-up" },
  { value: "main", label: "Main" },
  { value: "cooldown", label: "Cool-down" },
] as const;
const WorkoutTypes = ["strength", "cardio", "flexibility", "balance"] as const;

// src/components/workout/ExerciseCard.tsx

import { Controller, useFormContext } from "react-hook-form";
import type { CreateWorkout } from "@/types/workout";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

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
  const { control, watch } = useFormContext<CreateWorkout>();

  const name = watch(`exercises.${index}.name`);
  const type = watch(`exercises.${index}.type`);
  const notes = watch(`exercises.${index}.notes`);
  const sets = watch(`exercises.${index}.sets`) ?? [];

  const handleSave = () => {
    // values are already in RHF via Controller fields
    onDoneEditing();
  };

  const handleCancel = () => {
    // later you can resetField(`exercises.${index}`) if you want true revert
    onDoneEditing();
  };

  return (
    <Card className="p-4 space-y-3">
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
        <div className="space-y-3">
          {/* Name */}
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

const WorkoutTypes = ["strength", "cardio", "flexibility", "balance"] as const;

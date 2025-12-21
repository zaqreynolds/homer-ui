import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import type { CreateWorkout } from "@/types/workout";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Copy, Trash2 } from "lucide-react";
import { Switch } from "../ui/switch";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useRef } from "react";

type Props = {
  exerciseIndex: number;
};

export function CreateSetsSection({ exerciseIndex }: Props) {
  const repsRefs = useRef<HTMLInputElement[]>([]);

  const { control, getValues } = useFormContext<CreateWorkout>();

  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: `exercises.${exerciseIndex}.sets` as const,
  });

  const handleDuplicateSet = (setIndex: number) => {
    // grab whatever the user has typed for this set so far
    const currentSet = getValues(
      `exercises.${exerciseIndex}.sets.${setIndex}` as const
    );

    if (!currentSet) return;

    // just insert a shallow copy right after it
    insert(setIndex + 1, { ...currentSet });
  };

  const handleAddSet = () => {
    append({
      targetReps: undefined,
      weight: undefined,
      duration: undefined,
      restTime: undefined,
    });

    setTimeout(() => {
      const lastIndex = fields.length;
      repsRefs.current[lastIndex]?.focus();
    }, 0);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <Controller
          name={`exercises.${exerciseIndex}.isBodyweight`}
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-2 mr-auto">
              <Switch checked={field.value} onCheckedChange={field.onChange} />
              <Label className="text-xs ">Bodyweight</Label>
            </div>
          )}
        />
        <Controller
          name={`exercises.${exerciseIndex}.weightUnit`}
          control={control}
          render={({ field }) => (
            <ToggleGroup
              type="single"
              value={field.value ?? "lbs"}
              onValueChange={(v) => v && field.onChange(v)}
              variant="outline"
              className="inline-flex overflow-hidden gap-0 rounded-md"
            >
              <ToggleGroupItem
                value="kg"
                className="rounded-none border-r w-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                kg
              </ToggleGroupItem>

              <ToggleGroupItem
                value="lbs"
                className="rounded-none border-l w-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                lbs
              </ToggleGroupItem>
            </ToggleGroup>
          )}
        />
      </div>
      <Label className="text-xs font-medium">Sets ({fields.length})</Label>
      <div className="space-y-2">
        {fields.map((field, setIndex) => (
          <div
            key={field.id}
            className="grid grid-cols-[auto,1fr,1fr,auto] items-center gap-2"
          >
            <div className="flex items-center gap-2 justify-between">
              <span className="text-xs text-muted-foreground">
                #{setIndex + 1}
              </span>
              {/* Remove */}
              <div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleDuplicateSet(setIndex)}
                >
                  <Copy className="h-4 w-4 text-muted-foreground mr-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => remove(setIndex)}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              {/* Target Reps */}
              <div className="flex-1">
                <Controller
                  name={`exercises.${exerciseIndex}.sets.${setIndex}.targetReps`}
                  control={control}
                  rules={{ required: "reps are required" }}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs font-medium">Reps</Label>
                      <Input
                        {...field}
                        ref={(el) => {
                          if (el) repsRefs.current[setIndex] = el;
                        }}
                        type="number"
                        inputMode="numeric"
                        className="h-8 text-xs"
                        autoComplete="off"
                        aria-invalid={!!fieldState.error}
                      />
                      {/* reserved error space so layout doesn't shift */}
                      <p className="h-4 text-[10px] text-red-500">
                        {fieldState.error ? fieldState.error.message : null}
                      </p>
                    </div>
                  )}
                />
              </div>

              {/* Weight */}
              <div className="flex-1">
                <Controller
                  name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs font-medium">Weight</Label>
                      <Input
                        {...field}
                        type="number"
                        inputMode="decimal"
                        className="h-8 text-xs"
                        autoComplete="off"
                        aria-invalid={!!fieldState.error}
                      />
                      <p className="h-4 text-[10px] text-red-500">
                        {fieldState.error ? fieldState.error.message : null}
                      </p>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddSet}
            className="ml-auto "
          >
            Add set
          </Button>
        </div>
      </div>
    </div>
  );
}

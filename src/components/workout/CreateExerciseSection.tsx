import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import type { CreateExercise } from "@/types/workout";
import { ExerciseCard } from "./ExerciseCard";

export const CreateExerciseSection = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleStartCreating = () => {
    const newIndex = fields.length;
    const blankExercise: CreateExercise = {
      name: "",
      phase: "main",
      type: "strength",
      muscleGroups: [],
      equipment: [],
      instructions: "",
      videoUrl: "",
      notes: "",
      isBodyweight: false,
      weightUnit: "lbs",
      sets: [
        {
          reps: undefined,
          weight: undefined,
          duration: undefined,
          restTime: undefined,
          notes: "",
        },
      ],
    };
    append(blankExercise);
    setEditingIndex(newIndex);
  };
  const handleEdit = (index: number) => setEditingIndex(index);

  const handleDoneEditing = () => setEditingIndex(null);

  const handleRemove = (index: number) => {
    remove(index);
    setEditingIndex(null);
  };

  const hasExercises = fields.length > 0;

  return (
    <div className="space-y-4 mt-4">
      {/* list of exercise cards */}
      <div className="space-y-4">
        {fields.map((field, index) => (
          <ExerciseCard
            key={field.id}
            index={index}
            isEditing={editingIndex === index}
            onEdit={() => handleEdit(index)}
            onDoneEditing={handleDoneEditing}
            onRemove={() => handleRemove(index)}
          />
        ))}
      </div>

      {/* Add / create button only when nothing is being edited */}
      {editingIndex === null && (
        <div className="pt-2">
          <Button
            type="button"
            size="lg"
            className="w-full"
            onClick={handleStartCreating}
          >
            {hasExercises ? "Add Another Exercise" : "Add Exercise"}
          </Button>
        </div>
      )}
    </div>
  );
};

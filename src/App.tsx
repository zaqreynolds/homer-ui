import { cn } from "./lib/utils";
import { useWorkoutStore } from "./store/workoutStore";

function App() {
  const workouts = useWorkoutStore((state) => state.workouts);
  return (
    <div
      className={cn(
        "min-h-screen bg-background text-foreground flex flex-col items-center justify-center"
      )}
    >
      hi
      <div>{workouts.length || 0} workouts</div>
    </div>
  );
}

export default App;

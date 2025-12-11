import { CreateWorkoutSheet } from "@/components/CreateWorkoutSheet";
import { Button } from "@/components/ui/button";

import { createFileRoute } from "@tanstack/react-router";

const Home = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center space-y-2">
      <h1>Welcome to Homer</h1>
      <CreateWorkoutSheet />
      <Button size="lg" className="w-60" disabled>
        Log Weight
      </Button>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});

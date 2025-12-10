import { CreateWorkoutSheet } from "@/components/CreateWorkoutSheet";

import { createFileRoute } from "@tanstack/react-router";

const Home = () => {
  return (
    <div className="flex  flex-col flex-1 w-full items-center justify-center">
      <h1>Welcome to Homer</h1>
      <CreateWorkoutSheet />
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});

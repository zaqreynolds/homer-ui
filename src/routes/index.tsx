import { createFileRoute } from "@tanstack/react-router";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <h1>Welcome to Homer 🏋️‍♂️</h1>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});

import { Outlet } from "@tanstack/react-router";
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-screen bg-background text-foreground ">
      <Outlet />
    </div>
  ),
});

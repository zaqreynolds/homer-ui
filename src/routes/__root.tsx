import { Outlet } from "@tanstack/react-router";
import { createRootRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// ...existing code...
export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      {/* single content element — use flex alignment instead of mx-auto */}
      <main className="flex-1 w-full min-h-0 flex flex-col items-center justify-center px-2 overflow-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  ),
});
// ...existing code...

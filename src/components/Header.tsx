import { useLocation, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  const router = useRouter();

  const [isHome, setIsHome] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location.pathname]);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setTitle("");
        break;
      case "/workouts/new":
        setTitle("Create New Workout");
        break;
      // Add more cases as needed for different routes
      default:
        setTitle("Homer");
    }
  }, [location.pathname]);

  const handleBackClick = () => router.history.back();

  return (
    <header className="h-16 w-full px-4 border-b border-muted-foreground/10 grid grid-cols-[56px_1fr_56px] items-center">
      {/* left: reserved area for back button (keeps width consistent) */}
      <div className="flex items-center justify-start">
        {!isHome && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackClick}
            aria-label="Back"
          >
            <ArrowLeft />
          </Button>
        )}
      </div>

      {/* center: flexible, centered, no-wrap with ellipsis */}
      <div className="flex justify-center ">
        {!isHome && (
          <h1 className="text-lg font-semibold w-full text-center truncate whitespace-nowrap mb-0">
            {title}
          </h1>
        )}
      </div>

      {/* right: reserved area for future actions (keeps center balanced) */}
      <div className="flex items-center justify-end">
        {/* place right-side actions here when needed */}
      </div>
    </header>
  );
};

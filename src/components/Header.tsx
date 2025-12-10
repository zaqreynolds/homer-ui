import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Header = () => {
  const location = useLocation();
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

  return (
    // <div className="flex flex-col min-h-screen bg-background text-foreground ">
    <header className="h-16 w-full px-4 py-3 border-b border-muted-foreground/10 flex items-center justify-between">
      {!isHome && <h1 className="text-lg font-semibold">{title}</h1>}
    </header>
  );
};

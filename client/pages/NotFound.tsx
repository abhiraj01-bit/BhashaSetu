import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="container py-20 text-center">
      <h1 className="text-6xl font-extrabold text-foreground mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Oops! Page not found</p>
      <p className="text-sm text-muted-foreground mb-8">
        The page <code className="bg-accent px-2 py-1 rounded">{location.pathname}</code> does not exist.
      </p>
      <Button asChild>
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;

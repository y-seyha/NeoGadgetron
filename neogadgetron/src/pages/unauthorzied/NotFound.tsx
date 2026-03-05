import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/20 text-center px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page not found</h2>
      <p className="text-muted-foreground mb-6">
        The you are looking for does not exist.{" "}
      </p>

      <Link to="/">
        <Button className="h-11 px-6">Go Home</Button>
      </Link>
    </div>
  );
}

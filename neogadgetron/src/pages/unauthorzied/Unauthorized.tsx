import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/20 text-center px-4">
      <h1 className="text-6xl font-bold text-yellow-500 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2">Unauthorized</h2>
      <p className="text-muted-foreground mb-6">
        You do not have permission to access this page.
      </p>
      <Link to="/">
        <Button className="h-11 px-6">Go Home</Button>
      </Link>
    </div>
  );
}

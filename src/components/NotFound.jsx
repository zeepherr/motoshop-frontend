import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-full items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <p className="text-sm font-semibold text-primary">404</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Page not found
        </h1>

        <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button render={<Link to="/register" />}>Go to Register</Button>

          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
}

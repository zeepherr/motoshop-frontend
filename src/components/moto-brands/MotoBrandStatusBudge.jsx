import { Badge } from "@/components/ui/badge";

export function MotoBrandStatusBadge({ isActive }) {
  if (isActive) {
    return (
      <Badge
        variant="secondary"
        className="border-0 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400"
      >
        Active
      </Badge>
    );
  }

  return (
    <Badge
      variant="secondary"
      className="border-0 bg-muted text-muted-foreground hover:bg-muted"
    >
      Inactive
    </Badge>
  );
}

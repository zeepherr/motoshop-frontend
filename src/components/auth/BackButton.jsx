import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => navigate(-1)}
      className="
        -ml-2 cursor-pointer gap-2
        text-muted-foreground
        hover:text-foreground
      "
    >
      <ArrowLeft className="size-4" />
      Back
    </Button>
  );
}

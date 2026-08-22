import { CheckCircle2, Pause, Save, Trash2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PosCartActions({
  hasItems,
  canComplete,
  onHold,
  onClear,
  onComplete,
  isPending,
  isEditingPending,
  isCompletingPending,
  onCancel,
}) {
  return (
    <div className="px-3 py-3 lg:px-4">
      <div className="grid grid-cols-[auto_auto_1fr] gap-2">
        {isEditingPending ? (
          <Button
            type="button"
            variant="outline"
            disabled={!hasItems || isPending}
            onClick={onHold}
            className="gap-2"
          >
            <Save className="size-4" />
            Update
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            disabled={!hasItems || isPending}
            onClick={onHold}
            className="gap-2"
          >
            <Pause className="size-4" />
            Hold
          </Button>
        )}

        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={!hasItems || isPending}
          onClick={isEditingPending ? onCancel : onClear}
          title={isEditingPending ? "Cancel order" : "Clear order"}
          className="text-destructive hover:text-destructive cursor-pointer"
        >
          {isEditingPending ? (
            <XCircle className="size-4" />
          ) : (
            <Trash2 className="size-4" />
          )}
        </Button>

        <Button
          type="button"
          disabled={!canComplete || isPending}
          onClick={onComplete}
          className="w-full cursor-pointer"
        >
          <CheckCircle2 className="size-4" />
          {isPending || isCompletingPending
            ? "Completing order..."
            : "Checkout order"}
        </Button>
      </div>
    </div>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { MotoNameForm } from "./MotoNameFrom";
export function EditMotoNameDialog({
  item,
  open,
  onOpenChange,
  onSubmit,
  isPending,
  tableName,
}) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit {tableName}</DialogTitle>

          <DialogDescription>
            Update the motorcycle {tableName} information.
          </DialogDescription>
        </DialogHeader>

        <MotoNameForm
          defaultValues={{
            name: item?.name,
            isActive: item?.isActive,
          }}
          submitLabel="Save changes"
          onSubmit={onSubmit}
          onCancel={() => {
            onOpenChange(false);
          }}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { MotoBrandForm } from "./MotoBrandFrom";
export function CreateMotoBrandDialog({
  open,
  onOpenChange,
  onSubmit,
  isPending,
  setSelectedBrand,
}) {
  function handleSubmit(values) {
    onSubmit(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add motorcycle brand</DialogTitle>

          <DialogDescription>
            Add a new motorcycle brand to your shop.
          </DialogDescription>
        </DialogHeader>

        <MotoBrandForm
          submitLabel="Add brand"
          onSubmit={handleSubmit}
          onCancel={() => {
            onOpenChange(false);
            setSelectedBrand(null);
          }}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

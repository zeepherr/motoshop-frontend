import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { MotoBrandForm } from "./MotoBrandFrom";
export function EditMotoBrandDialog({
  brand,
  open,
  onOpenChange,
  onSubmit,
  isPending,
  setSelectedBrand,
}) {
  if (!brand) return null;

  // function handleSubmit(values) {
  //   onSubmit(brand.id, values);
  // }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit brand</DialogTitle>

          <DialogDescription>
            Update the motorcycle brand information.
          </DialogDescription>
        </DialogHeader>

        <MotoBrandForm
          defaultValues={{
            name: brand?.name,
            isActive: brand?.isActive,
          }}
          submitLabel="Save changes"
          onSubmit={onSubmit}
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

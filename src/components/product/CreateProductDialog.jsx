import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ProductForm } from "./ProductForm";

export function CreateProductDialog({
  open,
  onOpenChange,
  onSubmit,
  isPending,
  categories,
}) {
  function handleSubmit(values) {
    onSubmit(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
    flex max-h-[90vh] flex-col
    overflow-hidden
    sm:max-w-3xl
  "
      >
        <DialogHeader className="shrink-0">
          <DialogTitle>Add product</DialogTitle>

          <DialogDescription>
            Add a new product to your inventory.
          </DialogDescription>
        </DialogHeader>

        <ProductForm
          isCreate={true}
          categories={categories}
          submitLabel="Add Product"
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ProductForm } from "./ProductForm";

export function EditProductDialog({
  product,
  categories,
  open,
  onOpenChange,
  onSubmit,
  isPending,
}) {
  if (!product) return null;
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
          <DialogTitle>Edit product</DialogTitle>

          <DialogDescription>Update product detail.</DialogDescription>
        </DialogHeader>

        <ProductForm
          defaultValues={{
            productCategoryId: product.productCategoryId,
            sku: product.sku || "",
            name: product.name,
            description: product.description || "",
            costPrice: product.costPrice || 0,
            sellingPrice: product.sellingPrice,
            stockQuantity: product.stockQuantity || 0,
            unit: product.unit,
            imageUrl: product.imageUrl || null,
          }}
          isCreate={false}
          categories={categories}
          submitLabel="Edit Product"
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

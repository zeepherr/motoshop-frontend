import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  createProductSchema,
  updateProductSehcma,
} from "@/validations/product.schema";

import { ProductImageField } from "./ProductImageField";

const PRODUCT_UNITS = [
  { value: "piece", label: "Piece" },
  { value: "pair", label: "Pair" },
  { value: "set", label: "Set" },
  { value: "bottle", label: "Bottle" },
  { value: "liter", label: "Liter" },
];

export function ProductForm({
  categories,
  defaultValues = {
    productCategoryId: undefined,
    sku: "",
    name: "",
    description: "",
    costPrice: "",
    sellingPrice: "",
    stockQuantity: "",
    unit: "",
    imageUrl: null,
  },
  submitLabel = "Save",
  onSubmit,
  onCancel,
  isPending,
  isCreate,
}) {
  const [newImage, setNewImage] = useState(null);

  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: zodResolver(isCreate ? createProductSchema : updateProductSehcma),

    defaultValues: {
      productCategoryId: defaultValues.productCategoryId,
      sku: defaultValues.sku ?? "",
      name: defaultValues.name ?? "",
      description: defaultValues.description ?? "",
      costPrice: defaultValues.costPrice ?? "",
      sellingPrice: defaultValues.sellingPrice ?? "",
      stockQuantity: defaultValues.stockQuantity ?? "",
      unit: defaultValues.unit ?? "",
    },
  });

  useEffect(() => {
    reset({
      productCategoryId: defaultValues.productCategoryId,
      sku: defaultValues.sku ?? "",
      name: defaultValues.name ?? "",
      description: defaultValues.description ?? "",
      costPrice: defaultValues.costPrice ?? "",
      sellingPrice: defaultValues.sellingPrice ?? "",
      stockQuantity: defaultValues.stockQuantity ?? "",
      unit: defaultValues.unit ?? "",
    });

    // Edit another product / reopen dialog
    // → previous local image must disappear.
    setNewImage(null);
  }, [
    defaultValues.productCategoryId,
    defaultValues.sku,
    defaultValues.name,
    defaultValues.description,
    defaultValues.costPrice,
    defaultValues.sellingPrice,
    defaultValues.stockQuantity,
    defaultValues.unit,
    defaultValues.imageUrl,
    reset,
  ]);

  const handleFormSubmit = (values) => {
    const changedData = {};

    if (dirtyFields.productCategoryId) {
      changedData.productCategoryId = values.productCategoryId;
    }

    if (dirtyFields.sku) {
      changedData.sku = values.sku;
    }

    if (dirtyFields.name) {
      changedData.name = values.name;
    }

    if (dirtyFields.description) {
      changedData.description = values.description;
    }

    if (dirtyFields.costPrice) {
      changedData.costPrice = values.costPrice;
    }

    if (dirtyFields.sellingPrice) {
      changedData.sellingPrice = values.sellingPrice;
    }

    if (dirtyFields.stockQuantity) {
      changedData.stockQuantity = values.stockQuantity;
    }

    if (dirtyFields.unit) {
      changedData.unit = values.unit;
    }

    if (newImage) {
      changedData.image = newImage;
    }
    onSubmit(changedData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className=" flex min-h-0 flex-1 flex-col
    overflow-hidden"
    >
      {/* Scrollable body */}
      <div
        className="min-h-0 flex-1 overflow-y-auto
    scrollbar-none
    [&::-webkit-scrollbar]:hidden"
      >
        <div className="space-y-6 py-1">
          {/* Image + Product identity */}
          <div
            className="
             grid items-start gap-5
    sm:grid-cols-[220px_minmax(0,1fr)]
            "
          >
            <ProductImageField
              currentImageUrl={defaultValues.imageUrl ?? null}
              file={newImage}
              onFileChange={setNewImage}
              onCancelFile={() => setNewImage(null)}
              disabled={isPending}
            />

            <div className="space-y-4">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="product-name">Product name</Label>

                <Input
                  id="product-name"
                  placeholder="e.g. Michelin City Extra"
                  autoComplete="off"
                  {...register("name")}
                />

                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* SKU */}
              <div className="space-y-2">
                <Label htmlFor="product-sku">SKU</Label>

                <Input
                  id="product-sku"
                  placeholder="e.g. TIRE-001"
                  autoComplete="off"
                  {...register("sku")}
                />

                {errors.sku && (
                  <p className="text-sm text-destructive">
                    {errors.sku.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>

                <Controller
                  name="productCategoryId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>

                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                {errors.productCategoryId && (
                  <p className="text-sm text-destructive">
                    {errors.productCategoryId.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="product-description">
              Description
              <span className="ml-1 text-muted-foreground">(optional)</span>
            </Label>

            <Textarea
              id="product-description"
              placeholder="Add a short product description..."
              className="min-h-24 resize-none"
              {...register("description")}
            />

            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Pricing */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Cost Price */}
            <div className="space-y-2">
              <Label htmlFor="cost-price">Cost price</Label>

              <Input
                id="cost-price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                {...register("costPrice")}
              />

              {errors.costPrice && (
                <p className="text-sm text-destructive">
                  {errors.costPrice.message}
                </p>
              )}
            </div>

            {/* Selling Price */}
            <div className="space-y-2">
              <Label htmlFor="selling-price">Selling price</Label>

              <Input
                id="selling-price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                {...register("sellingPrice")}
              />

              {errors.sellingPrice && (
                <p className="text-sm text-destructive">
                  {errors.sellingPrice.message}
                </p>
              )}
            </div>
          </div>

          {/* Inventory */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Stock Quantity */}
            <div className="space-y-2">
              <Label htmlFor="stock-quantity">Stock quantity</Label>

              <Input
                id="stock-quantity"
                type="number"
                min="0"
                step="1"
                placeholder="0"
                {...register("stockQuantity")}
              />

              {errors.stockQuantity && (
                <p className="text-sm text-destructive">
                  {errors.stockQuantity.message}
                </p>
              )}
            </div>

            {/* Unit */}
            <div className="space-y-2">
              <Label>Unit</Label>

              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>

                    <SelectContent>
                      {PRODUCT_UNITS.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.unit && (
                <p className="text-sm text-destructive">
                  {errors.unit.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="
        mt-4 flex shrink-0
        justify-end gap-2
        border-t  pt-4
  "
      >
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

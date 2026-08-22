import { ConfirmActionDialog } from "@/components/ConfirmActionDialog";
import { ContentLoader } from "@/components/loading/ContentLoader";
import { CreateProductDialog } from "@/components/product/CreateProductDialog";
import { EditProductDialog } from "@/components/product/EditProductDialog";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductHeader } from "@/components/product/ProductHeader";
import { useProductPageActions } from "@/components/product/ProductPageAction";
import { useMotoCategories } from "@/hook/moto-category/useMotoCategory";
import { useProduct } from "@/hook/product/useProduct";

function ProductPage() {
  const {
    data: products,
    isError,
    error,
    isPending: isProductLoadting,
    isRefetching,
  } = useProduct({ includeInactive: true });
  const { data: categories } = useMotoCategories({ includeInactive: false });
  const {
    createOpen,
    setCreateOpen,
    isCreating,
    handleAddProduct,
    handleCreateProduct,

    editingProduct,
    editOpen,
    setEditOpen,
    isUpdatingName,
    handleEditProduct,
    handleUpdateProduct,

    statusProduct,
    statusConfirmOpen,
    setStatusConfirmOpen,
    isUpdatingStatus,
    handleStatusChange,
    handleConfirmStatusChange,

    deletingProduct,
    deleteConfirmOpen,
    isDeleting,
    handleDeleteProduct,
    handleConfirmDelete,
    handleDeleteDialogChange,
  } = useProductPageActions();
  if (isProductLoadting) {
    return (
      <div className="relative min-h-125">
        <ContentLoader />
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-2">
      <ProductHeader onAddProduct={handleAddProduct} />

      <ProductGrid
        products={products}
        onEdit={handleEditProduct}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteProduct}
      />
      <CreateProductDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreateProduct}
        isPending={isCreating}
        categories={categories}
      />
      <EditProductDialog
        open={editOpen}
        product={editingProduct}
        categories={categories}
        onOpenChange={setEditOpen}
        onSubmit={handleUpdateProduct}
        isPending={isUpdatingName}
      />
      <ConfirmActionDialog
        open={statusConfirmOpen}
        onOpenChange={setStatusConfirmOpen}
        title={
          statusProduct?.isActive
            ? "Deactivate this motorcycle?"
            : "Activate this motorcycle?"
        }
        description={
          statusProduct?.isActive
            ? `${statusProduct?.model} will no longer be available for active use.`
            : `${statusProduct?.model} will become available for use again.`
        }
        confirmLabel={statusProduct?.isActive ? "Deactivate" : "Activate"}
        cancelLabel={"Cancel"}
        variant={statusProduct?.isActive ? "destructive" : "default"}
        isPending={isUpdatingStatus}
        onConfirm={handleConfirmStatusChange}
      />
      <ConfirmActionDialog
        open={deleteConfirmOpen}
        onOpenChange={handleDeleteDialogChange}
        title="Delete this motorcycle?"
        description={
          deletingProduct
            ? `Are you sure you want to permanently delete "${deletingProduct.name}"? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
        isPending={isDeleting}
        onConfirm={handleConfirmDelete}
      />
      {isRefetching && (
        <p className="text-sm text-muted-foreground">
          Updating Available product...
        </p>
      )}
    </div>
  );
}

export default ProductPage;

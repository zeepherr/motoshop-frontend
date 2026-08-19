import { mockProducts } from "@/components/product/Mock";
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
    isPending: isProductLoadtin,
    isRefrethcing,
  } = useProduct();
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

  console.log("1", products, "2", categories);
  return (
    <div className="space-y-4">
      <ProductHeader onAddProduct={handleAddProduct} />

      <ProductGrid
        products={mockProducts}
        onEdit={handleEditProduct}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
}

export default ProductPage;

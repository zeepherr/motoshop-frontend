import { useCreateProduct } from "@/hook/product/useCreateProduct";
import { useDeleteProduct } from "@/hook/product/useDeleteProduct";
import { useUpdateProduct } from "@/hook/product/useUpdateProduct";
import { useState } from "react";

export function useProductPageActions() {
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();

  const { mutate: updateProduct, isPending: isUpdatingName } =
    useUpdateProduct();

  const { mutate: updateProductStatus, isPending: isUpdatingStatus } =
    useUpdateProduct();

  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const [createOpen, setCreateOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const [statusProduct, setStatusProduct] = useState(null);
  const [statusConfirmOpen, setStatusConfirmOpen] = useState(false);

  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  function handleAddProduct() {
    setCreateOpen(true);
  }

  function handleCreateProduct(values) {
    console.log(values);
    createProduct(
      values,

      {
        onSuccess: () => {
          setCreateOpen(false);
        },
      },
    );
  }

  function handleEditProduct(product) {
    setEditingProduct(product);
    setEditOpen(true);
  }

  function handleUpdateProduct(values) {
    if (!editingProduct) return;
    updateProduct(
      {
        id: editingProduct.id,
        payload: values,
      },
      {
        onSuccess: () => {
          setEditOpen(false);
          setEditingProduct(null);
        },
      },
    );
  }

  function handleStatusChange(product) {
    setStatusProduct(product);
    setStatusConfirmOpen(true);
  }

  function handleConfirmStatusChange() {
    if (!statusProduct) return;
    updateProductStatus(
      {
        id: statusProduct.id,
        payload: {
          isActive: !statusProduct.isActive,
        },
      },
      {
        onSuccess: () => {
          setStatusConfirmOpen(false);
          setStatusProduct(null);
        },
      },
    );
  }

  function handleDeleteProduct(product) {
    setDeletingProduct(product);
    setDeleteConfirmOpen(true);
  }

  function handleConfirmDelete() {
    if (!deletingProduct) return;

    deleteProduct(deletingProduct.id, {
      onSuccess: () => {
        setDeleteConfirmOpen(false);
        setDeletingProduct(null);
      },
    });
  }

  function handleDeleteDialogChange(open) {
    setDeleteConfirmOpen(open);

    if (!open && !isDeleting) {
      setDeletingProduct(null);
    }
  }

  return {
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
  };
}

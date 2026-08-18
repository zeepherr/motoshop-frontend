import { useCreateMotoCategory } from "@/hook/moto-category/useCreateMotoCategory";
import { useDeleteMotoCategory } from "@/hook/moto-category/useDeleteMotoCategory";
import { useUpdateMotoCategory } from "@/hook/moto-category/useUpdateCategory";
import { useState } from "react";

export function useMotorCateoryPageActions() {
  const { mutate: createCategory, isPending: isCreating } =
    useCreateMotoCategory();

  const { mutate: updateCategoryName, isPending: isUpdatingName } =
    useUpdateMotoCategory();

  const { mutate: updateCategoryStatus, isPending: isUpdatingStatus } =
    useUpdateMotoCategory();

  const { mutate: deleteCategory, isPending: isDeleting } =
    useDeleteMotoCategory();

  const [createOpen, setCreateOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const [statusCategory, setStatusCategory] = useState(null);
  const [statusConfirmOpen, setStatusConfirmOpen] = useState(false);

  const [deletingCategory, setDeletingCategory] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  function handleAddCategory() {
    setCreateOpen(true);
  }

  function handleCreateCategory(values) {
    createCategory(
      {
        name: values.name,
      },
      {
        onSuccess: () => {
          setCreateOpen(false);
        },
      },
    );
  }

  function handleEditCategory(category) {
    setEditingCategory(category);
    setEditOpen(true);
  }

  function handleUpdateCategory(values) {
    updateCategoryName(
      {
        id: editingCategory.id,
        payload: {
          name: values.name,
        },
      },
      {
        onSuccess: () => {
          setEditOpen(false);
          setEditingCategory(null);
        },
      },
    );
  }

  function handleStatusChange(category) {
    setStatusCategory(category);
    setStatusConfirmOpen(true);
  }

  function handleConfirmStatusChange() {
    if (!statusCategory) return;

    updateCategoryStatus(
      {
        id: statusCategory.id,
        payload: {
          isActive: !statusCategory.isActive,
        },
      },
      {
        onSuccess: () => {
          setStatusConfirmOpen(false);
          setStatusCategory(null);
        },
      },
    );
  }

  function handleDeleteCategory(category) {
    setDeletingCategory(category);
    setDeleteConfirmOpen(true);
  }

  function handleConfirmDelete() {
    if (!deletingCategory) return;

    deleteCategory(deletingCategory.id, {
      onSuccess: () => {
        setDeleteConfirmOpen(false);
        setDeletingCategory(null);
      },
    });
  }

  function handleDeleteDialogChange(open) {
    setDeleteConfirmOpen(open);

    if (!open && !isDeleting) {
      setDeletingCategory(null);
    }
  }

  return {
    createOpen,
    setCreateOpen,
    isCreating,
    handleAddCategory,
    handleCreateCategory,

    editingCategory,
    editOpen,
    setEditOpen,
    isUpdatingName,
    handleEditCategory,
    handleUpdateCategory,

    statusCategory,
    statusConfirmOpen,
    setStatusConfirmOpen,
    isUpdatingStatus,
    handleStatusChange,
    handleConfirmStatusChange,

    deletingCategory,
    deleteConfirmOpen,
    isDeleting,
    handleDeleteCategory,
    handleConfirmDelete,
    handleDeleteDialogChange,
  };
}

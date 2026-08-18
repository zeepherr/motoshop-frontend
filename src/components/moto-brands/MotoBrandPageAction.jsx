import { useState } from "react";

import { useCreateMotorBrand } from "@/hook/moto-brand/useCreateMotoBrand";
import { useDeleteMotoBrand } from "@/hook/moto-brand/useDeleteMotoBrand";
import { useUpdateMotoBrand } from "@/hook/moto-brand/useUpdateMotoBrand";

export function useMotorBrandPageActions() {
  const { mutate: createBrand, isPending: isCreating } = useCreateMotorBrand();

  const { mutate: updateBrandName, isPending: isUpdatingName } =
    useUpdateMotoBrand();

  const { mutate: updateBrandStatus, isPending: isUpdatingStatus } =
    useUpdateMotoBrand();

  const { mutate: deleteBrand, isPending: isDeleting } = useDeleteMotoBrand();

  const [createOpen, setCreateOpen] = useState(false);

  const [editingBrand, setEditingBrand] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const [statusBrand, setStatusBrand] = useState(null);
  const [statusConfirmOpen, setStatusConfirmOpen] = useState(false);

  const [deletingBrand, setDeletingBrand] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  function handleAddBrand() {
    setCreateOpen(true);
  }

  function handleCreateBrand(values) {
    createBrand(
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

  function handleEditBrand(brand) {
    setEditingBrand(brand);
    setEditOpen(true);
  }

  function handleUpdateBrand(values) {
    updateBrandName(
      {
        id: editingBrand.id,
        payload: {
          name: values.name,
        },
      },
      {
        onSuccess: () => {
          setEditOpen(false);
          setEditingBrand(null);
        },
      },
    );
  }

  function handleStatusChange(brand) {
    setStatusBrand(brand);
    setStatusConfirmOpen(true);
  }

  function handleConfirmStatusChange() {
    if (!statusBrand) return;

    updateBrandStatus(
      {
        id: statusBrand.id,
        payload: {
          isActive: !statusBrand.isActive,
        },
      },
      {
        onSuccess: () => {
          setStatusConfirmOpen(false);
          setStatusBrand(null);
        },
      },
    );
  }

  function handleDeleteBrand(brand) {
    setDeletingBrand(brand);
    setDeleteConfirmOpen(true);
  }

  function handleConfirmDelete() {
    if (!deletingBrand) return;

    deleteBrand(deletingBrand.id, {
      onSuccess: () => {
        setDeleteConfirmOpen(false);
        setDeletingBrand(null);
      },
    });
  }

  function handleDeleteDialogChange(open) {
    setDeleteConfirmOpen(open);

    if (!open && !isDeleting) {
      setDeletingBrand(null);
    }
  }

  return {
    createOpen,
    setCreateOpen,
    isCreating,
    handleAddBrand,
    handleCreateBrand,

    editingBrand,
    editOpen,
    setEditOpen,
    isUpdatingName,
    handleEditBrand,
    handleUpdateBrand,

    statusBrand,
    statusConfirmOpen,
    setStatusConfirmOpen,
    isUpdatingStatus,
    handleStatusChange,
    handleConfirmStatusChange,

    deletingBrand,
    deleteConfirmOpen,
    isDeleting,
    handleDeleteBrand,
    handleConfirmDelete,
    handleDeleteDialogChange,
  };
}

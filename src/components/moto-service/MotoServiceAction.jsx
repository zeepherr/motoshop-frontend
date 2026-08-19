import { useCreateService } from "@/hook/moto-service/useCreateService";
import { useDeleteService } from "@/hook/moto-service/useDeleteService";
import { useUpdateService } from "@/hook/moto-service/useUpdateService";
import { useState } from "react";

export function useServicePageActions() {
  const { mutate: createService, isPending: isCreating } = useCreateService();

  const { mutate: updateServiceData, isPending: isUpdatingName } =
    useUpdateService();

  const { mutate: updateServiceStatus, isPending: isUpdatingStatus } =
    useUpdateService();

  const { mutate: deleteService, isPending: isDeleting } = useDeleteService();

  const [createOpen, setCreateOpen] = useState(false);

  const [editingService, setEditingService] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const [statusService, setStatusService] = useState(null);
  const [statusConfirmOpen, setStatusConfirmOpen] = useState(false);

  const [deletingService, setDeletingService] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  function handleAddService() {
    setCreateOpen(true);
  }

  function handleCreateService(values) {
    createService(values, {
      onSuccess: () => {
        setCreateOpen(false);
      },
    });
  }

  function handleEditService(service) {
    setEditingService(service);
    setEditOpen(true);
  }

  function handleUpdateService(values) {
    const data = {
      ...values,
      description: values.description?.trim() || null,
    };

    updateServiceData(
      {
        id: editingService.id,
        payload: data,
      },
      {
        onSuccess: () => {
          setEditOpen(false);
          setEditingService(null);
        },
      },
    );
  }

  function handleStatusChange(service) {
    setStatusService(service);
    setStatusConfirmOpen(true);
  }

  function handleConfirmStatusChange() {
    if (!statusService) return;

    updateServiceStatus(
      {
        id: statusService.id,
        payload: {
          isActive: !statusService.isActive,
        },
      },
      {
        onSuccess: () => {
          setStatusConfirmOpen(false);
          setStatusService(null);
        },
      },
    );
  }

  function handleDeleteService(service) {
    setDeletingService(service);
    setDeleteConfirmOpen(true);
  }

  function handleConfirmDelete() {
    if (!deletingService) return;

    deleteService(deletingService.id, {
      onSuccess: () => {
        setDeleteConfirmOpen(false);
        setDeletingService(null);
      },
    });
  }

  function handleDeleteDialogChange(open) {
    setDeleteConfirmOpen(open);

    if (!open && !isDeleting) {
      setDeletingService(null);
    }
  }

  return {
    createOpen,
    setCreateOpen,
    isCreating,
    handleAddService,
    handleCreateService,

    editingService,
    editOpen,
    setEditOpen,
    isUpdatingName,
    handleEditService,
    handleUpdateService,

    statusService,
    statusConfirmOpen,
    setStatusConfirmOpen,
    isUpdatingStatus,
    handleStatusChange,
    handleConfirmStatusChange,

    deletingService,
    deleteConfirmOpen,
    isDeleting,
    handleDeleteService,
    handleConfirmDelete,
    handleDeleteDialogChange,
  };
}

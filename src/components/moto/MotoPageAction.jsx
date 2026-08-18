import { useCreateMoto } from "@/hook/moto/useCreateMoto";
import { useDeleteMoto } from "@/hook/moto/useDeleteMotor";
import { useUpdateMoto } from "@/hook/moto/useUpdateMoto";
import { useState } from "react";

export function useMotorPageActions() {
  const { mutate: createMoto, isPending: isCreating } = useCreateMoto();

  const { mutate: updateMotoData, isPending: isUpdatingName } = useUpdateMoto();

  const { mutate: updateMotoStatus, isPending: isUpdatingStatus } =
    useUpdateMoto();

  const { mutate: deleteMoto, isPending: isDeleting } = useDeleteMoto();

  const [createOpen, setCreateOpen] = useState(false);

  const [editingMoto, setEditingMoto] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const [statusMoto, setStatusMoto] = useState(null);
  const [statusConfirmOpen, setStatusConfirmOpen] = useState(false);

  const [deletingMoto, setDeletingMoto] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  function handleAddMoto() {
    setCreateOpen(true);
  }

  function handleCreateMoto(values) {
    console.log(values);
    createMoto(
      {
        model: values.model,
        type: values.type,
        motorBrandId: values.motorBrandId,
      },
      {
        onSuccess: () => {
          setCreateOpen(false);
        },
      },
    );
  }

  function handleEditMoto(moto) {
    setEditingMoto(moto);
    setEditOpen(true);
  }

  function handleUpdateMoto(values) {
    const data = {};
    if (values.model) {
      data.model = values.model;
    }
    if (values.type) {
      data.tpye = values.type;
    }
    if (values.motorBrandId) {
      data.motorBrandId = values.motorBrandId;
    }
    updateMotoData(
      {
        id: editingMoto.id,
        payload: data,
      },
      {
        onSuccess: () => {
          setEditOpen(false);
          setEditingMoto(null);
        },
      },
    );
  }

  function handleStatusChange(moto) {
    setStatusMoto(moto);
    setStatusConfirmOpen(true);
  }

  function handleConfirmStatusChange() {
    if (!statusMoto) return;

    updateMotoStatus(
      {
        id: statusMoto.id,
        payload: {
          isActive: !statusMoto.isActive,
        },
      },
      {
        onSuccess: () => {
          setStatusConfirmOpen(false);
          setStatusMoto(null);
        },
      },
    );
  }

  function handleDeleteMoto(moto) {
    setDeletingMoto(moto);
    setDeleteConfirmOpen(true);
  }

  function handleConfirmDelete() {
    if (!deletingMoto) return;

    deleteMoto(deletingMoto.id, {
      onSuccess: () => {
        setDeleteConfirmOpen(false);
        setDeletingMoto(null);
      },
    });
  }

  function handleDeleteDialogChange(open) {
    setDeleteConfirmOpen(open);

    if (!open && !isDeleting) {
      setDeletingMoto(null);
    }
  }

  return {
    createOpen,
    setCreateOpen,
    isCreating,
    handleAddMoto,
    handleCreateMoto,

    editingMoto,
    editOpen,
    setEditOpen,
    isUpdatingName,
    handleEditMoto,
    handleUpdateMoto,

    statusMoto,
    statusConfirmOpen,
    setStatusConfirmOpen,
    isUpdatingStatus,
    handleStatusChange,
    handleConfirmStatusChange,

    deletingMoto,
    deleteConfirmOpen,
    isDeleting,
    handleDeleteMoto,
    handleConfirmDelete,
    handleDeleteDialogChange,
  };
}

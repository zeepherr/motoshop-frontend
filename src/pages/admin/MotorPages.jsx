import { ConfirmActionDialog } from "@/components/ConfirmActionDialog";
import { ContentLoader } from "@/components/loading/ContentLoader";
import { CreateMotorDialog } from "@/components/moto/CreateMotoDialog";
import { EditMotorDialog } from "@/components/moto/EditMotoDialog";
import { MotoGrid } from "@/components/moto/MotoGrid";
import { useMotorPageActions } from "@/components/moto/MotoPageAction";
import { MotoHeader } from "@/components/MotoHeader";
import { useMotoBrands } from "@/hook/moto-brand/useMotoBrand";
import { useMoto } from "@/hook/moto/useMoto";

function MotorPages() {
  const {
    data: motors,
    isError,
    error,
    isPending: isMotoLoading,
    isRefetching,
  } = useMoto();
  const { data: motoBrands } = useMotoBrands({ includeInactive: false });

  const {
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
  } = useMotorPageActions();

  if (isMotoLoading) {
    return (
      <div className="relative min-h-125">
        <ContentLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-sm text-destructive">
        Failed to load : {error.message}
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <MotoHeader onAdd={handleAddMoto} tableName={"Motor"} />

      <CreateMotorDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreateMoto}
        isPending={isCreating}
        motorBrands={motoBrands}
      />

      <MotoGrid
        motors={motors}
        onEdit={handleEditMoto}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteMoto}
      />
      <EditMotorDialog
        motor={editingMoto}
        motorBrands={motoBrands}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={handleUpdateMoto}
        isPending={isUpdatingName}
      />
      <ConfirmActionDialog
        open={statusConfirmOpen}
        onOpenChange={setStatusConfirmOpen}
        title={
          statusMoto?.isActive
            ? "Deactivate this motorcycle?"
            : "Activate this motorcycle?"
        }
        description={
          statusMoto?.isActive
            ? `${statusMoto?.model} will no longer be available for active use.`
            : `${statusMoto?.model} will become available for use again.`
        }
        confirmLabel={statusMoto?.isActive ? "Deactivate" : "Activate"}
        cancelLabel={"Cancel"}
        variant={statusMoto?.isActive ? "destructive" : "default"}
        isPending={isUpdatingStatus}
        onConfirm={handleConfirmStatusChange}
      />
      <ConfirmActionDialog
        open={deleteConfirmOpen}
        onOpenChange={handleDeleteDialogChange}
        title="Delete this motorcycle?"
        description={
          deletingMoto
            ? `Are you sure you want to permanently delete "${deletingMoto.model}"? This action cannot be undone.`
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
          Updating Available motos...
        </p>
      )}
    </div>
  );
}

export default MotorPages;

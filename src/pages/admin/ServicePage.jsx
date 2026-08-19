import { ConfirmActionDialog } from "@/components/ConfirmActionDialog";
import { CreateServiceDialog } from "@/components/moto-service/CreateServiceDialog";
import { EditServiceDialog } from "@/components/moto-service/EditServiceDialog";
import { useServicePageActions } from "@/components/moto-service/MotoServiceAction";
import { ServiceGrid } from "@/components/moto-service/ServiceGrid";
import { MotoHeader } from "@/components/MotoHeader";
import { useService } from "@/hook/moto-service/useService";

function ServicePage() {
  const {
    data: services,
    isError,
    error,
    isPending: isServiceLoading,
    isRefetching,
  } = useService();
  const {
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
  } = useServicePageActions();
  return (
    <div className="space-y-5">
      <MotoHeader onAdd={handleAddService} tableName={"Services"} />

      <CreateServiceDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        isPending={isCreating}
        onSubmit={handleCreateService}
      />

      <ServiceGrid
        services={services}
        onEdit={handleEditService}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteService}
      />
      <EditServiceDialog
        service={editingService}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={handleUpdateService}
        isPending={isUpdatingName}
      />
      <ConfirmActionDialog
        open={statusConfirmOpen}
        onOpenChange={setStatusConfirmOpen}
        title={
          statusService?.isActive
            ? "Deactivate this Service?"
            : "Activate this Service?"
        }
        description={
          statusService?.isActive
            ? `${statusService?.name} will no longer be available for active use.`
            : `${statusService?.name} will become available for use again.`
        }
        confirmLabel={statusService?.isActive ? "Deactivate" : "Activate"}
        cancelLabel={"Cancel"}
        variant={statusService?.isActive ? "destructive" : "default"}
        isPending={isUpdatingStatus}
        onConfirm={handleConfirmStatusChange}
      />
      <ConfirmActionDialog
        open={deleteConfirmOpen}
        onOpenChange={handleDeleteDialogChange}
        title="Delete this Service?"
        description={
          deletingService
            ? `Are you sure you want to permanently delete "${deletingService.name}"? This action cannot be undone.`
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
          Updating Available Services...
        </p>
      )}
    </div>
  );
}

export default ServicePage;

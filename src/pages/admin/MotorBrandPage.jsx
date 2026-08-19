import { ConfirmActionDialog } from "@/components/ConfirmActionDialog";
import { CreateMotoNameDialog } from "@/components/CreateMotoNameDialog";
import { EditMotoNameDialog } from "@/components/EditMotoNameDialog";
import { ContentLoader } from "@/components/loading/ContentLoader";
import { useMotorBrandPageActions } from "@/components/moto-brands/MotoBrandPageAction";
import { MotoItemToolbar } from "@/components/moto-brands/MotoItemToolbar";
import { MotoHeader } from "@/components/MotoHeader";
import { MotoItemTable } from "@/components/MotoItemTable";
import { useMotoBrands } from "@/hook/moto-brand/useMotoBrand";
import { useMemo, useState } from "react";

const MotorBrandPage = () => {
  const {
    data: motorBrands,
    isError,
    error,
    isPending: isBrandsLoading,
    isRefetching,
  } = useMotoBrands({ includeInactive: true });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const isFiltered = search.trim() !== "" || status !== "all";

  const {
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
  } = useMotorBrandPageActions();

  const filteredBrands = useMemo(() => {
    if (!motorBrands) return [];

    const normalizedSearch = search.trim().toLowerCase();
    return [...motorBrands]
      .filter((brand) => {
        const matchesSearch = brand.name
          .toLowerCase()
          .includes(normalizedSearch);

        const matchesStatus =
          status === "all" ||
          (status === "active" && brand.isActive) ||
          (status === "inactive" && !brand.isActive);

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (status === "all" && a.isActive !== b.isActive) {
          return Number(b.isActive) - Number(a.isActive);
        }

        return a.name.localeCompare(b.name);
      });
  }, [motorBrands, search, status]);
  const brandCounts = useMemo(() => {
    if (!motorBrands) {
      return {
        all: 0,
        active: 0,
        inactive: 0,
      };
    }

    return {
      all: motorBrands.length,
      active: motorBrands.filter((brand) => brand.isActive).length,
      inactive: motorBrands.filter((brand) => !brand.isActive).length,
    };
  }, [motorBrands]);

  function handleClearFilters() {
    setSearch("");
    setStatus("all");
  }

  if (isBrandsLoading) {
    return (
      <div className="relative min-h-125">
        <ContentLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-sm text-destructive">
        Failed to load motor brands: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <MotoHeader onAdd={handleAddBrand} tableName={"Brands"} />

      <MotoItemToolbar
        tableName={"Brand"}
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        itemCounts={brandCounts}
      />

      <MotoItemTable
        tableName={"Brand"}
        items={filteredBrands}
        onEdit={handleEditBrand}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteBrand}
        isFiltered={isFiltered}
        onClearFilters={handleClearFilters}
        status={status}
      />

      <EditMotoNameDialog
        tableName={"brand"}
        item={editingBrand}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={handleUpdateBrand}
        isPending={isUpdatingName}
      />

      <CreateMotoNameDialog
        open={createOpen}
        isPending={isCreating}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreateBrand}
        name={"brand"}
        placeholder={"eg. Honda"}
      />

      <ConfirmActionDialog
        open={statusConfirmOpen}
        onOpenChange={setStatusConfirmOpen}
        title={
          statusBrand?.isActive
            ? "Deactivate this brand?"
            : "Activate this brand?"
        }
        description={
          statusBrand?.isActive
            ? `${statusBrand?.name} will no longer be available for new records.`
            : `${statusBrand?.name} will become available for use again.`
        }
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        variant={statusBrand?.isActive ? "destructive" : "default"}
        isPending={isUpdatingStatus}
        onConfirm={handleConfirmStatusChange}
      />

      <ConfirmActionDialog
        open={deleteConfirmOpen}
        onOpenChange={handleDeleteDialogChange}
        title="Delete this brand?"
        description={
          deletingBrand
            ? `Are you sure you want to permanently delete "${deletingBrand.name}"? This action cannot be undone.`
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
          Updating motor brands...
        </p>
      )}
    </div>
  );
};

export default MotorBrandPage;

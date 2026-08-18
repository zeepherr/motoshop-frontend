import { ConfirmActionDialog } from "@/components/ConfirmActionDialog";
import { CreateMotoNameDialog } from "@/components/CreateMotoNameDialog";
import { EditMotoNameDialog } from "@/components/EditMotoNameDialog";
import { ContentLoader } from "@/components/loading/ContentLoader";
import { MotoItemToolbar } from "@/components/moto-brands/MotoItemToolbar";
import { useMotorCateoryPageActions } from "@/components/moto-category/MotoCategoryPageAction";
import { MotoHeader } from "@/components/MotoHeader";
import { MotoItemTable } from "@/components/MotoItemTable";
import { useMotoCategories } from "@/hook/moto-category/useMotoCategory";
import { useMemo, useState } from "react";

const MotorCategoryPage = () => {
  const {
    data: motoCategories,
    isError,
    error,
    isPending: isCategoryLoading,
    isRefetching,
  } = useMotoCategories();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const isFiltered = search.trim() !== "" || status !== "all";

  const {
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
  } = useMotorCateoryPageActions();

  const filteredCategory = useMemo(() => {
    if (!motoCategories) return [];

    const normalizedSearch = search.trim().toLowerCase();
    return [...motoCategories]
      .filter((category) => {
        const matchesSearch = category.name
          .toLowerCase()
          .includes(normalizedSearch);

        const matchesStatus =
          status === "all" ||
          (status === "active" && category.isActive) ||
          (status === "inactive" && !category.isActive);

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (status === "all" && a.isActive !== b.isActive) {
          return Number(b.isActive) - Number(a.isActive);
        }

        return a.name.localeCompare(b.name);
      });
  }, [motoCategories, search, status]);
  const CategoryCounts = useMemo(() => {
    if (!motoCategories) {
      return {
        all: 0,
        active: 0,
        inactive: 0,
      };
    }

    return {
      all: motoCategories.length,
      active: motoCategories.filter((category) => category.isActive).length,
      inactive: motoCategories.filter((category) => !category.isActive).length,
    };
  }, [motoCategories]);

  function handleClearFilters() {
    setSearch("");
    setStatus("all");
  }

  if (isCategoryLoading) {
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
      <MotoHeader onAdd={handleAddCategory} tableName={"Product Category"} />

      <MotoItemToolbar
        tableName={"Product-Category"}
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        itemCounts={CategoryCounts}
      />

      <MotoItemTable
        tableName={"Product-Category"}
        items={filteredCategory}
        onEdit={handleEditCategory}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteCategory}
        isFiltered={isFiltered}
        onClearFilters={handleClearFilters}
        status={status}
      />

      <EditMotoNameDialog
        tableName={"category"}
        item={editingCategory}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={handleUpdateCategory}
        isPending={isUpdatingName}
      />

      <CreateMotoNameDialog
        placeholder={"eg. Engine Oil"}
        open={createOpen}
        isPending={isCreating}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreateCategory}
        name={"category"}
      />

      <ConfirmActionDialog
        open={statusConfirmOpen}
        onOpenChange={setStatusConfirmOpen}
        title={
          statusCategory?.isActive
            ? "Deactivate this Category?"
            : "Activate this Category?"
        }
        description={
          statusCategory?.isActive
            ? `${statusCategory?.name} will no longer be available for new records.`
            : `${statusCategory?.name} will become available for use again.`
        }
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        variant={statusCategory?.isActive ? "destructive" : "default"}
        isPending={isUpdatingStatus}
        onConfirm={handleConfirmStatusChange}
      />

      <ConfirmActionDialog
        open={deleteConfirmOpen}
        onOpenChange={handleDeleteDialogChange}
        title="Delete this Category"
        description={
          deletingCategory
            ? `Are you sure you want to permanently delete "${deletingCategory.name}"? This action cannot be undone.`
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
          Updating product categories...
        </p>
      )}
    </div>
  );
};

export default MotorCategoryPage;

import { ConfirmActionDialog } from "@/components/ConfirmActionDialog";
import { ContentLoader } from "@/components/loading/ContentLoader";
import { CreateMotoBrandDialog } from "@/components/moto-brands/CreateMotoBrandDialog";
import { EditMotoBrandDialog } from "@/components/moto-brands/EditMotoBrandDialog";
import { MotoBrandHeader } from "@/components/moto-brands/MotoBrandHeader";
import { MotoBrandTable } from "@/components/moto-brands/MotoBrandTable";
import { MotoBrandToolbar } from "@/components/moto-brands/MotoBrandToolbar";
import { useCreateMotorBrand } from "@/hook/moto-brand/useCreateMotoBrand";
import { useDeleteMotoBrand } from "@/hook/moto-brand/useDeleteMotoBrand";
import { useMotoBrands } from "@/hook/moto-brand/useMotoBrand";
import { useUpdateMotoBrand } from "@/hook/moto-brand/useUpdateMotoBrand";
import { useState } from "react";

// const MotorBrandPage = () => {
//   const {
//     data: motorBrands,
//     isError,
//     error,
//     isPending: isBrandsLoading,
//     isRefetching,
//   } = useMotoBrands();
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("all");
//   const [selectedBrand, setSelectedBrand] = useState(null);
//   const [editOpen, setEditOpen] = useState(false);
//   const [createOpen, setCreateOpen] = useState(false);
//   const [statusConfirmOpen, setStatusConfirmOpen] = useState(false);
//   const { isPending: isCreateLoading, mutate: createBrand } =
//     useCreateMotorBrand();
//   const { isPending: isUpdateLoading, mutate: updateBrand } =
//     useUpdateMotoBrand();

//   if (isBrandsLoading) {
//     return (
//       <div className="relative min-h-125">
//         <ContentLoader />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="text-sm text-destructive">
//         Failed to load motor brands: {error.message}
//       </div>
//     );
//   }
//   function handleAddBrand() {
//     setCreateOpen(true);
//   }
//   function handleCreateBrand(values) {
//     createBrand(
//       { name: values.name },
//       {
//         onSuccess: () => {
//           setCreateOpen(false);
//         },
//       },
//     );
//   }

//   function handleEditBrand(brand) {
//     setSelectedBrand(brand);
//     setEditOpen(true);
//   }

//   const handleStatusChange = (brand) => {
//     setSelectedBrand(brand);
//     setStatusConfirmOpen(true);
//   };
//   const hdlActive = () => {
//     updateBrand(
//       {
//         id: selectedBrand.id,
//         payload: {
//           isActive: !selectedBrand.isActive,
//         },
//       },
//       {
//         onSuccess: () => {
//           setStatusConfirmOpen(false);
//           setSelectedBrand(null);
//         },
//       },
//     );
//   };
//   function handleUpdateBrand(values) {
//     updateBrand(
//       {
//         id: selectedBrand.id,
//         payload: {
//           name: values.name,
//         },
//       },
//       {
//         onSuccess: () => {
//           setEditOpen(false);
//           setSelectedBrand(null);
//         },
//       },
//     );
//   }
//   return (
//     <div className="space-y-5">
//       <MotoBrandHeader onAddBrand={handleAddBrand} />
//       <MotoBrandToolbar
//         search={search}
//         onSearchChange={setSearch}
//         status={status}
//         onStatusChange={setStatus}
//       />
//       <MotoBrandTable
//         brands={motorBrands}
//         onEdit={handleEditBrand}
//         onStatusChange={handleStatusChange}
//       />
//       <EditMotoBrandDialog
//         brand={selectedBrand}
//         open={editOpen}
//         onOpenChange={setEditOpen}
//         onSubmit={handleUpdateBrand}
//         isPending={isUpdateLoading}
//         setSelectedBrand={setSelectedBrand}
//       />
//       <CreateMotoBrandDialog
//         open={createOpen}
//         isPending={isCreateLoading}
//         setSelectedBrand={setSelectedBrand}
//         onOpenChange={setCreateOpen}
//         onSubmit={handleCreateBrand}
//       />
//       {isRefetching && (
//         <p className="text-sm text-muted-foreground">
//           Updating motor brands...
//         </p>
//       )}
//       <ConfirmActionDialog
//         open={statusConfirmOpen}
//         onOpenChange={setStatusConfirmOpen}
//         title={
//           selectedBrand?.isActive
//             ? "Deactivate this brand?"
//             : "Activate this brand?"
//         }
//         isPending={isUpdateLoading}
//         description={
//           selectedBrand?.isActive
//             ? `${selectedBrand?.name} will no longer be available for new records.`
//             : `${selectedBrand?.name} will become available for use again.`
//         }
//         confirmLabel={"Confirm"}
//         variant={selectedBrand?.isActive ? "destructive" : "default"}
//         onConfirm={hdlActive}
//         cancelLabel={"Cancel"}
//       />
//     </div>
//   );
// };

// export default MotorBrandPage;
const MotorBrandPage = () => {
  const {
    data: motorBrands,
    isError,
    error,
    isPending: isBrandsLoading,
    isRefetching,
  } = useMotoBrands();

  const { mutate: createBrand, isPending: isCreating } = useCreateMotorBrand();

  const { mutate: updateBrandName, isPending: isUpdatingName } =
    useUpdateMotoBrand();

  const { mutate: updateBrandStatus, isPending: isUpdatingStatus } =
    useUpdateMotoBrand();

  const { mutate: deleteBrand, isPending: isDeleting } = useDeleteMotoBrand();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [createOpen, setCreateOpen] = useState(false);

  const [editingBrand, setEditingBrand] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const [statusBrand, setStatusBrand] = useState(null);
  const [statusConfirmOpen, setStatusConfirmOpen] = useState(false);

  const [deletingBrand, setDeletingBrand] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

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

  const handleConfirmDelete = () => {
    if (!deletingBrand) return;
    deleteBrand(deletingBrand.id, {
      onSuccess: () => {
        setDeleteConfirmOpen(false);
        setDeletingBrand(null);
      },
    });
  };
  function handleDeleteDialogChange(open) {
    setDeleteConfirmOpen(open);

    if (!open && !isDeleting) {
      setDeletingBrand(null);
    }
  }
  function handleDeleteBrand(brand) {
    setDeletingBrand(brand);
    setDeleteConfirmOpen(true);
  }
  return (
    <div className="space-y-5">
      <MotoBrandHeader onAddBrand={handleAddBrand} />

      <MotoBrandToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      <MotoBrandTable
        brands={motorBrands}
        onEdit={handleEditBrand}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteBrand}
      />

      <EditMotoBrandDialog
        brand={editingBrand}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={handleUpdateBrand}
        isPending={isUpdatingName}
      />

      <CreateMotoBrandDialog
        open={createOpen}
        isPending={isCreating}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreateBrand}
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
        confirmLabel={"Confirm"}
        variant={statusBrand?.isActive ? "destructive" : "default"}
        isPending={isUpdatingStatus}
        onConfirm={handleConfirmStatusChange}
        cancelLabel={"Cancel"}
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

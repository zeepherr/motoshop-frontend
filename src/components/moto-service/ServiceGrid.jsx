import { AnimatePresence, motion } from "motion/react";

import { useMemo, useState } from "react";
import { ServiceFilters } from "./ServiceFilter";
import { ServiceItem } from "./ServiceItem";

export function ServiceGrid({ services, onEdit, onStatusChange, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredServices = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = services?.filter((service) => {
      const matchesSearch =
        service.name?.toLowerCase().includes(normalizedSearch) ||
        service.description?.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "active" && service.isActive) ||
        (selectedStatus === "inactive" && !service.isActive);

      return matchesSearch && matchesStatus;
    });

    return filtered?.sort((a, b) => {
      // Active first, inactive last
      if (a.isActive !== b.isActive) {
        return Number(b.isActive) - Number(a.isActive);
      }

      // Newest updated first inside each status group
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  }, [services, searchTerm, selectedStatus]);

  const hasActiveFilters = searchTerm.trim() !== "" || selectedStatus !== "all";

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("all");
  };

  if (!services?.length) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <p className="text-sm font-medium">No services found</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Create your first service to get started.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.06,
          },
        },
      }}
      className="space-y-3"
    >
      <ServiceFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        hasActiveFilters={hasActiveFilters}
        handleClearFilters={handleClearFilters}
      />
      <AnimatePresence mode="popLayout">
        {filteredServices.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            onEdit={onEdit}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

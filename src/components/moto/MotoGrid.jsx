import { ItemGroup } from "@/components/ui/item";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { MotoItem } from "./MotoItem";

import { MotoEmptyState } from "./MotoEmpty";
import { MotoFilters } from "./MotoFilter";

import { containerVariants, itemVariants } from "./motoGrid.motion";

export function MotoGrid({ motors, onEdit, onStatusChange, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredMotors = useMemo(() => {
    const filtered = motors?.filter((motor) => {
      const normalizedSearch = searchTerm.trim().toLowerCase();

      const matchesSearch =
        motor.model?.toLowerCase().includes(normalizedSearch) ||
        motor.motorBrand?.name?.toLowerCase().includes(normalizedSearch);

      const matchesBrand =
        selectedBrand === "all" || motor.motorBrand?.name === selectedBrand;

      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "active" && motor.isActive) ||
        (selectedStatus === "inactive" && !motor.isActive);

      return matchesSearch && matchesBrand && matchesStatus;
    });

    return filtered?.sort((a, b) => {
      // Active first, inactive last
      if (a.isActive !== b.isActive) {
        return Number(b.isActive) - Number(a.isActive);
      }

      // Newest updated first inside each status group
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  }, [motors, searchTerm, selectedBrand, selectedStatus]);

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedBrand !== "all" ||
    selectedStatus !== "all";

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedBrand("all");
    setSelectedStatus("all");
  };

  return (
    <div className="space-y-4">
      <MotoFilters
        motors={motors}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        hasActiveFilters={hasActiveFilters}
        handleClearFilters={handleClearFilters}
      />

      <AnimatePresence mode="popLayout">
        {!filteredMotors?.length ? (
          <MotoEmptyState key="empty" />
        ) : (
          <motion.div
            key="grid"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <ItemGroup
              className="
                grid justify-start gap-4
                grid-cols-[repeat(auto-fill,minmax(140px,160px))]
              "
            >
              <AnimatePresence mode="popLayout">
                {filteredMotors.map((motor) => (
                  <motion.div
                    key={motor.id}
                    layout
                    variants={itemVariants}
                    exit="exit"
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      },
                    }}
                  >
                    <MotoItem
                      motor={motor}
                      onEdit={onEdit}
                      onStatusChange={onStatusChange}
                      onDelete={onDelete}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </ItemGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

{
  /* <motion.div
  initial={WHERE_IT_STARTS}
  animate={WHERE_IT_GOES}
  exit={WHERE_IT_GOES_WHEN_REMOVED}
  transition={HOW_IT_MOVES}
/> */
}

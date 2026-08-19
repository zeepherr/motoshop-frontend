import { useMemo, useState } from "react";

import { ProductFilters } from "./ProductFilters";
import { ProductTable } from "./ProductTable";

export function ProductGrid({ products, onEdit, onStatusChange, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [sort, setSort] = useState({
    key: "name",
    direction: "asc",
  });

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = products?.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(normalizedSearch) ||
        product.sku?.toLowerCase().includes(normalizedSearch) ||
        product.description?.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "all" ||
        String(product.productCategoryId) === selectedCategory;

      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "active" && product.isActive) ||
        (selectedStatus === "inactive" && !product.isActive);

      return matchesSearch && matchesCategory && matchesStatus;
    });

    return filtered?.sort((a, b) => {
      const aValue = a[sort.key];
      const bValue = b[sort.key];

      if (typeof aValue === "string") {
        const result = aValue.localeCompare(bValue);

        return sort.direction === "asc" ? result : -result;
      }

      const result = Number(aValue) - Number(bValue);

      return sort.direction === "asc" ? result : -result;
    });
  }, [products, searchTerm, selectedCategory, selectedStatus, sort]);

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedStatus !== "all";

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedStatus("all");
  };

  const handleSort = (key) => {
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="space-y-4">
      <ProductFilters
        products={products}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        hasActiveFilters={hasActiveFilters}
        handleClearFilters={handleClearFilters}
      />

      <ProductTable
        products={filteredProducts}
        sort={sort}
        onSort={handleSort}
        onEdit={onEdit}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
      />
    </div>
  );
}

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import {
  ArrowDownUp,
  Check,
  ChevronDown,
  Eye,
  Filter,
  MoreHorizontal,
  Pencil,
  Plus,
  Power,
  Search,
  Trash2,
} from "lucide-react";

export const mockProducts = [
  {
    id: 1,
    productCategoryId: 1,
    sku: "OIL-MOTUL-001",
    name: "Motul 5100 10W40",
    description: "High performance synthetic motorcycle engine oil",
    costPrice: 280,
    sellingPrice: 350,
    stockQuantity: 18,
    unit: "Bottle",
    imgUrl:
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=200&auto=format&fit=crop",
    isActive: true,
    createdAt: "2026-08-01T10:00:00Z",
    updatedAt: "2026-08-18T10:00:00Z",
    productCategory: {
      id: 1,
      name: "Engine Oil",
    },
  },
  {
    id: 2,
    productCategoryId: 2,
    sku: "TIRE-IRC-9090",
    name: "IRC Tire 90/90-17",
    description: "Durable rear motorcycle tire for daily riding",
    costPrice: 920,
    sellingPrice: 1250,
    stockQuantity: 8,
    unit: "Piece",
    imgUrl:
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=200&auto=format&fit=crop",
    isActive: true,
    createdAt: "2026-08-02T10:00:00Z",
    updatedAt: "2026-08-17T10:00:00Z",
    productCategory: {
      id: 2,
      name: "Tires",
    },
  },
  {
    id: 3,
    productCategoryId: 3,
    sku: "PLUG-NGK-001",
    name: "NGK Spark Plug",
    description: "Standard spark plug for common motorcycles",
    costPrice: 110,
    sellingPrice: 180,
    stockQuantity: 0,
    unit: "Piece",
    imgUrl:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&auto=format&fit=crop",
    isActive: true,
    createdAt: "2026-08-03T10:00:00Z",
    updatedAt: "2026-08-18T10:00:00Z",
    productCategory: {
      id: 3,
      name: "Spare Parts",
    },
  },
  {
    id: 4,
    productCategoryId: 4,
    sku: "HELMET-KYT-001",
    name: "KYT TT Course Helmet",
    description: "Full-face motorcycle helmet with clear visor",
    costPrice: 2200,
    sellingPrice: 2850,
    stockQuantity: 3,
    unit: "Piece",
    imgUrl:
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=200&auto=format&fit=crop",
    isActive: true,
    createdAt: "2026-08-04T10:00:00Z",
    updatedAt: "2026-08-16T10:00:00Z",
    productCategory: {
      id: 4,
      name: "Accessories",
    },
  },
  {
    id: 5,
    productCategoryId: 1,
    sku: "OIL-CASTROL-001",
    name: "Castrol Power1 10W40",
    description: "4T motorcycle engine oil for smooth acceleration",
    costPrice: 240,
    sellingPrice: 320,
    stockQuantity: 24,
    unit: "Bottle",
    imgUrl:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=200&auto=format&fit=crop",
    isActive: true,
    createdAt: "2026-08-05T10:00:00Z",
    updatedAt: "2026-08-19T10:00:00Z",
    productCategory: {
      id: 1,
      name: "Engine Oil",
    },
  },
  {
    id: 6,
    productCategoryId: 3,
    sku: "BRAKE-HONDA-001",
    name: "Honda Front Brake Pad",
    description: "Front brake pad replacement for Honda motorcycles",
    costPrice: 180,
    sellingPrice: 280,
    stockQuantity: 6,
    unit: "Set",
    imgUrl:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=200&auto=format&fit=crop",
    isActive: false,
    createdAt: "2026-08-05T10:00:00Z",
    updatedAt: "2026-08-14T10:00:00Z",
    productCategory: {
      id: 3,
      name: "Spare Parts",
    },
  },
  {
    id: 7,
    productCategoryId: 2,
    sku: "TIRE-MICHELIN-001",
    name: "Michelin City Grip 2",
    description: "Premium scooter tire designed for wet and dry roads",
    costPrice: 1450,
    sellingPrice: 1850,
    stockQuantity: 12,
    unit: "Piece",
    imgUrl:
      "https://images.unsplash.com/photo-1558980664-10ea2926d6dc?w=200&auto=format&fit=crop",
    isActive: true,
    createdAt: "2026-08-06T10:00:00Z",
    updatedAt: "2026-08-19T10:00:00Z",
    productCategory: {
      id: 2,
      name: "Tires",
    },
  },
];

export function ProductTableMock() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRows, setSelectedRows] = useState([]);
  const [sort, setSort] = useState({
    key: "name",
    direction: "asc",
  });

  const categories = useMemo(() => {
    const map = new Map();

    mockProducts.forEach((product) => {
      map.set(product.productCategory.id, product.productCategory);
    });

    return Array.from(map.values());
  }, []);

  const filteredProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    const result = mockProducts.filter((product) => {
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.sku.toLowerCase().includes(search) ||
        product.description?.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "all" ||
        String(product.productCategoryId) === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    return [...result].sort((a, b) => {
      let first = a[sort.key];
      let second = b[sort.key];

      if (sort.key === "name") {
        first = first.toLowerCase();
        second = second.toLowerCase();
      }

      if (first < second) {
        return sort.direction === "asc" ? -1 : 1;
      }

      if (first > second) {
        return sort.direction === "asc" ? 1 : -1;
      }

      return 0;
    });
  }, [searchTerm, selectedCategory, sort]);

  const selectedCategoryName =
    categories.find((category) => String(category.id) === selectedCategory)
      ?.name ?? "All Categories";

  const allVisibleSelected =
    filteredProducts.length > 0 &&
    filteredProducts.every((product) => selectedRows.includes(product.id));

  function handleSort(key) {
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  }

  function handleSelectAll(checked) {
    if (checked) {
      setSelectedRows((current) => [
        ...new Set([
          ...current,
          ...filteredProducts.map((product) => product.id),
        ]),
      ]);
      return;
    }

    const visibleIds = filteredProducts.map((product) => product.id);

    setSelectedRows((current) =>
      current.filter((id) => !visibleIds.includes(id)),
    );
  }

  function handleSelectRow(productId, checked) {
    setSelectedRows((current) =>
      checked
        ? [...current, productId]
        : current.filter((id) => id !== productId),
    );
  }

  return (
    <div className="relative bg-background px-6 pb-6">
      {/* Header */}
      <div
        className=" sticky top-0 z-20  bg-background/95
         backdrop-blur"
      >
        <div className="w-full flex items-center justify-between">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold tracking-tight">Products</h1>

            <p className="text-sm text-muted-foreground">
              Manage your shop products, pricing and inventory
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={() => console.log("click")}
            className="
          h-8 w-full cursor-pointer
          gap-1.5 px-3 text-xs
          sm:h-9 sm:w-auto sm:text-sm
        "
          >
            <Plus className="size-3.5 sm:size-4" />
            Add Product
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-md">
            <Search
              className="
                absolute left-3 top-1/2 size-4
                -translate-y-1/2 text-muted-foreground
              "
            />

            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search products or SKU..."
              className="h-9 pl-9"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  className="
                    h-9 min-w-44 justify-between
                    bg-background font-normal
                  "
                />
              }
            >
              <span className="flex min-w-0 items-center gap-2">
                <Filter className="size-4 shrink-0" />

                <span className="truncate">{selectedCategoryName}</span>
              </span>

              <ChevronDown className="size-4 text-muted-foreground" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem
                onClick={() => setSelectedCategory("all")}
                className="justify-between"
              >
                All Categories
                {selectedCategory === "all" && <Check className="size-4" />}
              </DropdownMenuItem>

              {categories.map((category) => {
                const value = String(category.id);

                return (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => setSelectedCategory(value)}
                    className="justify-between"
                  >
                    {category.name}

                    {selectedCategory === value && <Check className="size-4" />}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-250 text-sm">
            <thead>
              <tr className="border-b bg-background">
                <th className="w-14 px-4 py-3 text-center">
                  <Checkbox
                    checked={allVisibleSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all products"
                  />
                </th>

                <th className="px-3 py-3 text-left font-medium">
                  <button
                    type="button"
                    onClick={() => handleSort("name")}
                    className="
                        inline-flex cursor-pointer items-center
                        gap-1 font-medium
                      "
                  >
                    Product
                    <ArrowDownUp className="size-3.5" />
                  </button>
                </th>

                <th className="px-3 py-3 text-left font-medium">Details</th>

                <th className="px-3 py-3 text-left font-medium">
                  <button
                    type="button"
                    onClick={() => handleSort("sellingPrice")}
                    className="
                        inline-flex cursor-pointer items-center
                        gap-1 font-medium
                      "
                  >
                    Price
                    <ArrowDownUp className="size-3.5" />
                  </button>
                </th>

                <th className="px-3 py-3 text-left font-medium">
                  <button
                    type="button"
                    onClick={() => handleSort("stockQuantity")}
                    className="
                        inline-flex cursor-pointer items-center
                        gap-1 font-medium
                      "
                  >
                    Stock
                    <ArrowDownUp className="size-3.5" />
                  </button>
                </th>

                <th className="px-3 py-3 text-left font-medium">Status</th>

                <th className="w-32 px-3 py-3 text-center font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  checked={selectedRows.includes(product.id)}
                  onCheckedChange={(checked) =>
                    handleSelectRow(product.id, checked)
                  }
                />
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="
                        h-32 text-center
                        text-muted-foreground
                      "
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div
        className="
            mt-6 flex flex-col gap-3
            text-sm text-muted-foreground
            sm:flex-row sm:items-center sm:justify-between
          "
      >
        <p>
          Showing {filteredProducts.length} of {mockProducts.length} products
        </p>

        <div className="flex items-center gap-4">
          <span>
            Sort by: {sort.key} ({sort.direction})
          </span>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cursor-pointer"
          >
            Export List
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProductRow({ product, checked, onCheckedChange }) {
  return (
    <tr
      className="
        border-b transition-colors
        last:border-b-0 hover:bg-muted/30
      "
    >
      <td className="px-4 py-2 text-center">
        <Checkbox
          checked={checked}
          onCheckedChange={onCheckedChange}
          aria-label={`Select ${product.name}`}
        />
      </td>

      {/* Product */}
      <td className="px-3 py-2">
        <div className="flex min-w-56 items-center gap-3">
          <div
            className="
              size-12 shrink-0 overflow-hidden
              rounded-md bg-muted
            "
          >
            <img
              src={product.imgUrl}
              alt={product.name}
              className="size-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate font-medium">{product.name}</p>

            <p
              className="
                truncate text-sm
                text-muted-foreground
              "
            >
              {product.sku}
            </p>
          </div>
        </div>
      </td>

      {/* Details */}
      <td className="max-w-70 px-3 py-2">
        <div className="min-w-48">
          <p className="font-medium">{product.productCategory.name}</p>

          <p
            className="
              truncate text-sm
              text-muted-foreground
            "
          >
            {product.description || "No description"}
          </p>
        </div>
      </td>

      {/* Price */}
      <td className="whitespace-nowrap px-3 py-2">
        <span className="font-semibold">
          ฿
          {Number(product.sellingPrice).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </td>

      {/* Stock */}
      <td className="whitespace-nowrap px-3 py-2">
        <div className="flex flex-col">
          <span className="font-medium">
            {product.stockQuantity} {product.unit}
          </span>

          <StockLabel quantity={product.stockQuantity} />
        </div>
      </td>

      {/* Status */}
      <td className="px-3 py-2">
        <ProductStatusBadge isActive={product.isActive} />
      </td>

      {/* Actions */}
      <td className="px-3 py-2">
        <div className="flex items-center justify-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="cursor-pointer"
            aria-label={`View ${product.name}`}
          >
            <Eye className="size-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="cursor-pointer"
            aria-label={`Edit ${product.name}`}
          >
            <Pencil className="size-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  type="button"
                  variant="secondary"
                  size="icon-sm"
                  className="
                    size-8 cursor-pointer
                    bg-foreground text-background
                    hover:bg-foreground/85
                    hover:text-background
                  "
                  aria-label={`Actions for ${product.name}`}
                />
              }
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Pencil className="size-4" />
                Edit Product
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Power className="size-4" />
                {product.isActive ? "Deactivate Product" : "Activate Product"}
              </DropdownMenuItem>

              <DropdownMenuItem
                className="
                  text-destructive
                  focus:text-destructive
                "
              >
                <Trash2 className="size-4" />
                Delete Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
}

function ProductStatusBadge({ isActive }) {
  return (
    <span
      className={
        isActive
          ? `
            inline-flex rounded-full
            bg-emerald-100 px-2.5 py-1
            text-xs font-medium text-emerald-700
            dark:bg-emerald-950
            dark:text-emerald-400
          `
          : `
            inline-flex rounded-full
            bg-muted px-2.5 py-1
            text-xs font-medium text-muted-foreground
          `
      }
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

function StockLabel({ quantity }) {
  if (quantity === 0) {
    return <span className="text-xs text-destructive">Out of Stock</span>;
  }

  if (quantity <= 5) {
    return <span className="text-xs text-amber-600">Low Stock</span>;
  }

  return <span className="text-xs text-emerald-600">In Stock</span>;
}

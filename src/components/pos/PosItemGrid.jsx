import { PackageOpen } from "lucide-react";

import { useService } from "@/hook/moto-service/useService";
import { useProduct } from "@/hook/product/useProduct";

import { useMemo } from "react";
import { PosProductCard } from "./PosProductCard";
import { PosServiceCard } from "./PosServiceCard";

export function PosItemGrid({ mode, searchTerm, selectedCategory }) {
  const isProductMode = mode === "PRODUCT";

  const {
    data: products = [],
    isPending: isProductsPending,
    isError: isProductsError,
  } = useProduct({ includeInactive: false });

  const {
    data: services = [],
    isPending: isServicesPending,
    isError: isServicesError,
  } = useService({ includeInactive: false });

  const filteredItems = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (isProductMode) {
      return products.filter((product) => {
        const matchesSearch =
          !search ||
          product.name.toLowerCase().includes(search) ||
          product.sku?.toLowerCase().includes(search);

        const matchesCategory =
          selectedCategory === "all" ||
          String(product.productCategoryId) === String(selectedCategory);

        return matchesSearch && matchesCategory;
      });
    }

    return services.filter((service) => {
      return !search || service.name.toLowerCase().includes(search);
    });
  }, [products, services, searchTerm, selectedCategory, isProductMode]);

  const isPending = isProductMode ? isProductsPending : isServicesPending;

  const isError = isProductMode ? isProductsError : isServicesError;

  if (isPending) {
    return (
      <PosItemGridShell>
        <div
          className="
            grid grid-cols-2 gap-2
            sm:grid-cols-3
            xl:grid-cols-4
            2xl:grid-cols-5
          "
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="
                h-48 animate-pulse
                rounded-xl bg-muted
              "
            />
          ))}
        </div>
      </PosItemGridShell>
    );
  }

  if (isError) {
    return (
      <PosItemGridShell>
        <div
          className="
            flex h-full items-center justify-center
            text-sm text-destructive
          "
        >
          Failed to load items.
        </div>
      </PosItemGridShell>
    );
  }

  if (!filteredItems.length) {
    return (
      <PosItemGridShell>
        <div
          className="
            flex h-full flex-col
            items-center justify-center
            gap-2 text-center
          "
        >
          <PackageOpen className="size-8 text-muted-foreground" />

          <p className="font-medium">
            No {isProductMode ? "products" : "services"} found
          </p>

          <p className="text-sm text-muted-foreground">
            Try changing your search or filter.
          </p>
        </div>
      </PosItemGridShell>
    );
  }

  return (
    <PosItemGridShell>
      <div
        className="
          grid grid-cols-3 gap-1.5
          sm:grid-cols-4 sm:gap-2
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        {isProductMode
          ? filteredItems.map((product) => (
              <PosProductCard key={product.id} product={product} />
            ))
          : filteredItems.map((service) => (
              <PosServiceCard key={service.id} service={service} />
            ))}
      </div>
    </PosItemGridShell>
  );
}

function PosItemGridShell({ children }) {
  return (
    <section
      className="
        min-h-90  rounded-2xl
        border bg-card p-2
        scrollbar-none
        lg:min-h-0
        lg:flex-1
        lg:overflow-y-auto
      "
    >
      {children}
    </section>
  );
}

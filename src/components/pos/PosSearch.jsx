import { Barcode, Search } from "lucide-react";
import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";

import { useProduct } from "@/hook/product/useProduct";

export function PosSearch({ searchTerm, onSearchChange }) {
  const [sku, setSku] = useState("");

  const skuRef = useRef(null);

  const { data: products = [] } = useProduct();

  const handleSkuSubmit = (event) => {
    if (event.key !== "Enter") return;

    const value = sku.trim();

    if (!value) return;

    const product = products.find(
      (product) => product.sku.toLowerCase() === value.toLowerCase(),
    );

    if (!product) {
      console.log("Product not found");
      return;
    }

    console.log("Found:", product);

    // NEXT:
    // addItem(product)

    setSku("");

    requestAnimationFrame(() => {
      skuRef.current?.focus();
    });
  };

  return (
    <section
      className="
        grid shrink-0 grid-cols-1 gap-2
        md:grid-cols-[minmax(0,1fr)_280px]
      "
    >
      {/* Search */}
      <div className="relative">
        <Search
          className="
            absolute left-3 top-1/2 size-4
            -translate-y-1/2
            text-muted-foreground
          "
        />

        <Input
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="h-9 pl-9"
        />
      </div>

      {/* SKU */}
      <div className="relative">
        <Barcode
          className="
            absolute left-3 top-1/2 size-4
            -translate-y-1/2
            text-muted-foreground
          "
        />

        <Input
          ref={skuRef}
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          onKeyDown={handleSkuSubmit}
          placeholder="Scan or enter SKU"
          autoComplete="off"
          className="h-9 pl-9"
        />
      </div>
    </section>
  );
}

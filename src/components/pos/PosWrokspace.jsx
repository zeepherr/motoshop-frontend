import { useState } from "react";

import { useMotoCategories } from "@/hook/moto-category/useMotoCategory";
import { PosBrowseControls } from "./PosBrowseControls";
import { PosItemGrid } from "./PosItemGrid";
import { PosSearch } from "./PosSearch";

export function PosWorkspace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mode, setMode] = useState("PRODUCT");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: categories, isPending } = useMotoCategories({
    includeInactive: false,
  });

  return (
    <main
      className="
        flex min-w-0 flex-col gap-3
        lg:h-full lg:min-h-0 lg:gap-4 sm:mt-4 mt-1.5
      "
    >
      <PosSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <PosBrowseControls
        mode={mode}
        onModeChange={setMode}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        isCategoriesPending={isPending}
      />

      <PosItemGrid
        mode={mode}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />
    </main>
  );
}

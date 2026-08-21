import { PosCategories } from "./PosCategories";
import { PosModeSwitch } from "./PosModeSwitch";

export function PosBrowseControls({
  mode,
  onModeChange,
  categories,
  selectedCategory,
  onCategoryChange,
  isCategoriesPending,
}) {
  const handleModeChange = (newMode) => {
    if (newMode === mode) return;
    onModeChange(newMode);
    onCategoryChange("all");
  };
  return (
    <div
      className="
        flex shrink-0 items-center gap-2
      "
    >
      {/* Categories */}
      <div className="min-w-0 flex-1">
        {mode === "PRODUCT" && (
          <PosCategories
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            isPending={isCategoriesPending}
          />
        )}
      </div>

      {/* Product / Service */}
      <div className="shrink-0 flex ">
        <PosModeSwitch mode={mode} onModeChange={handleModeChange} />
      </div>
    </div>
  );
}

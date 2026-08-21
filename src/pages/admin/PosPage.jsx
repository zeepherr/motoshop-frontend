import { PosCart } from "@/components/pos/PosCart";
import { PosWorkspace } from "@/components/pos/PosWrokspace";

function PosPage() {
  return (
    <div
      className="
        mx-auto w-full max-w-[1800px]
        sm:px-2.5 pr-1.5
        lg:h-full lg:min-h-0 lg:p-4
      "
    >
      <div
        className="
          grid grid-cols-1 gap-3
          lg:h-full lg:min-h-0
          lg:grid-cols-[minmax(0,1fr)_360px]
          lg:gap-4
        "
      >
        <PosWorkspace />

        <PosCart />
      </div>
    </div>
  );
}

export default PosPage;

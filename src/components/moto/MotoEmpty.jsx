import { Bike } from "lucide-react";
import { motion } from "motion/react";

import { emptyStateVariants } from "./motoGrid.motion";

export function MotoEmptyState() {
  return (
    <motion.div
      variants={emptyStateVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      transition={{
        ease: "easeOut",
      }}
    >
      <div
        className="
          flex min-h-80 flex-col items-center justify-center
          rounded-xl border border-dashed bg-card/40
          px-6 py-12 text-center
        "
      >
        <div
          className="
            mb-4 flex size-14 items-center justify-center
            rounded-2xl border border-primary/20
            bg-primary/10 text-primary
          "
        >
          <Bike className="size-7" />
        </div>

        <h3 className="text-base font-semibold">No motorcycles yet</h3>

        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Add your first motorcycle model to start building your shop's
          motorcycle catalog.
        </p>
      </div>
    </motion.div>
  );
}

import { Bike } from "lucide-react";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";

import { Badge } from "@/components/ui/badge";
import { MotoActions } from "./MotoAction";

export function MotoItem({ motor, onEdit, onStatusChange, onDelete }) {
  const hasImage = Boolean(motor.imageUrl?.trim());

  return (
    <Item
      variant="outline"
      className="
        group relative flex items-stretch gap-0 overflow-hidden p-0
        transition-all duration-200
        hover:border-primary/50
        hover:shadow-[0_10px_30px_var(--glow-primary)]
      "
    >
      <ItemHeader className="bg-sidebar-accent p-3 pb-0">
        <div
          className="
            aspect-4/3 w-full overflow-hidden
            rounded-lg border bg-muted/30
          "
        >
          {hasImage ? (
            <img
              src={motor.imageUrl}
              alt={`${motor.motorBrand?.name ?? ""} ${motor.model}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="
                flex h-full w-full items-center justify-center
                bg-linear-to-br
                from-primary/10
                via-muted/20
                to-accent/10
              "
            >
              <div
                className="
                  flex size-16 items-center justify-center
                  rounded-2xl border border-primary/20
                  bg-primary/5 text-primary
                "
              >
                <Bike className="size-8" />
              </div>
            </div>
          )}
        </div>
      </ItemHeader>

      <ItemContent className="p-4 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground">
              {motor.motorBrand?.name ?? "Unknown brand"}
            </p>

            <ItemTitle className="mt-0.5 truncate text-base font-semibold">
              {motor.model}
            </ItemTitle>
          </div>

          <div
            className={
              motor.isActive
                ? "flex shrink-0 items-center gap-1.5 text-xs font-medium text-success"
                : "flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground"
            }
          >
            <span
              className={
                motor.isActive
                  ? "size-1.5 rounded-full bg-success"
                  : "size-1.5 rounded-full bg-muted-foreground"
              }
            />

            {motor.isActive ? "Active" : "Inactive"}
          </div>
        </div>

        <ItemDescription className="mt-3">
          <Badge variant="secondary">
            {motor.type === "AUTOMATIC" ? "Automatic" : "Manual"}
          </Badge>
        </ItemDescription>
      </ItemContent>

      <div className="absolute right-2.5 bottom-2.5">
        <MotoActions
          motor={motor}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      </div>
    </Item>
  );
}

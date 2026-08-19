import {
  CircleCheck,
  CircleOff,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ServiceItem({ service, onEdit, onStatusChange, onDelete }) {
  return (
    <motion.div
      layout
      variants={{
        hidden: {
          opacity: 0,
          y: 16,
        },

        show: {
          opacity: 1,
          y: 0,
        },
      }}
      exit={{
        opacity: 0,
        scale: 0.98,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className={`${service.isActive ? "" : "bg-muted"}
        group flex items-center gap-5
        rounded-xl border bg-card
        px-5 py-4
        transition-shadow
        hover:shadow-sm
      `}
    >
      <div className="w-20 shrink-0">
        <p className="text-lg font-semibold tracking-tight">
          ฿{Number(service.price).toLocaleString()}
        </p>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{service.name}</p>

        <p
          className={`
      mt-1 min-h-5 truncate text-sm
      ${service.description ? "text-muted-foreground" : "invisible"}
    `}
        >
          {service.description || "No description"}
        </p>
      </div>

      <Badge
        variant={"secodary"}
        className={`shrink-0${service.isActive ? "border-0 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400" : "border-0 bg-muted text-muted-foreground hover:bg-muted"}`}
      >
        {service.isActive ? "Active" : "Inactive"}
      </Badge>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0 cursor-pointer"
              aria-label={`Actions for ${service.name}`}
            />
          }
        >
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem
            onClick={() => onEdit(service)}
            className="cursor-pointer"
          >
            <Pencil className="size-4" />
            Edit Service
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onStatusChange(service)}
            className="cursor-pointer"
          >
            {service.isActive ? (
              <>
                <CircleOff className="size-4" />
                Deactivate
              </>
            ) : (
              <>
                <CircleCheck className="size-4" />
                Activate
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(service)}
            className="text-destructive focus:text-destructive cursor-pointer"
          >
            <Trash2 className="size-4" />
            Delete Motorcycle
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}

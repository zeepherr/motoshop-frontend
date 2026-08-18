// import { MoreHorizontal, Pencil, Power } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// export function MotoBrandRowActions({ brand, onEdit, onStatusChange }) {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger
//         render={
//           <Button
//             variant="ghost"
//             size="icon"
//             className="size-8"
//             aria-label={`Actions for ${brand.name}`}
//           />
//         }
//       >
//         <MoreHorizontal className="size-4" />
//       </DropdownMenuTrigger>

//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => onEdit(brand)}>
//           <Pencil className="size-4" />
//           Edit Brand
//         </DropdownMenuItem>

//         <DropdownMenuItem onClick={() => onStatusChange(brand)}>
//           <Power
//             className={`size-4 ${brand.isActive ? "" : "text-destructive"}`}
//           />

//           {brand.isActive ? "Deactivate Brand" : "Activate Brand"}
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

import {
  CircleCheck,
  CircleOff,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MotoBrandRowActions({
  brand,
  onEdit,
  onStatusChange,
  onDelete,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            aria-label={`Actions for ${brand.name}`}
          />
        }
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center justify-between font-normal">
            <span className="text-xs text-muted-foreground">Status</span>

            <span
              className={`flex items-center gap-1.5 text-xs font-medium ${
                brand.isActive
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-muted-foreground"
              }`}
            >
              <span
                className={`size-2 rounded-full ${
                  brand.isActive
                    ? "bg-emerald-500 animate-ping opacity-75 inline-flex"
                    : "bg-muted-foreground"
                }`}
              />

              {brand.isActive ? "Active" : "Inactive"}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onEdit(brand)}>
          <Pencil className="size-4" />
          Edit Brand
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onStatusChange(brand)}
          className={
            brand.isActive
              ? "text-destructive focus:text-destructive"
              : "text-emerald-600 focus:text-emerald-600 dark:text-emerald-400"
          }
        >
          {brand.isActive ? (
            <>
              <CircleOff className="size-4" />
              Deactivate Brand
            </>
          ) : (
            <>
              <CircleCheck className="size-4" />
              Activate Brand
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => onDelete(brand)}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="size-4" />
          Delete Brand
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

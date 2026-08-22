import {
  MoreHorizontal,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function UserTable({ users, totalUsers, onRoleChange, isUpdatingRole }) {
  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="min-w-65 px-5">User</TableHead>

              <TableHead className="min-w-65">Contact</TableHead>

              <TableHead className="min-w-37.5">Role</TableHead>

              <TableHead className="min-w-37.5">Status</TableHead>

              <TableHead className="min-w-37.5">Joined</TableHead>

              <TableHead className="w-16">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length > 0 ? (
              users.map((user) => {
                const fullName =
                  `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
                  "Unnamed user";

                const initials =
                  `${user.firstName?.[0] ?? ""}${
                    user.lastName?.[0] ?? ""
                  }`.toUpperCase() || "U";

                return (
                  <TableRow
                    key={user.id}
                    className="group transition-colors hover:bg-muted/20"
                  >
                    {/* USER */}
                    <TableCell className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex size-10 shrink-0
                            items-center justify-center
                            rounded-full
                            bg-primary/10
                            text-xs font-semibold
                            text-primary
                          "
                        >
                          {initials}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {fullName}
                          </p>

                          <p className="mt-0.5 text-xs text-muted-foreground">
                            ID #{user.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* CONTACT */}
                    <TableCell>
                      <div className="min-w-0">
                        <p className="max-w-64 truncate text-sm">
                          {user.email || user.phone || "No contact information"}
                        </p>

                        {user.email && user.phone && (
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {user.phone}
                          </p>
                        )}
                      </div>
                    </TableCell>

                    {/* ROLE */}
                    <TableCell>
                      {user.role === "STAFF" ? (
                        <span
                          className="
                            inline-flex items-center gap-1.5
                            rounded-full
                            bg-primary/10
                            px-2.5 py-1
                            text-xs font-medium
                            text-primary
                          "
                        >
                          <ShieldCheck className="size-3.5" />
                          Staff
                        </span>
                      ) : (
                        <span
                          className="
                            inline-flex items-center gap-1.5
                            rounded-full
                            bg-muted
                            px-2.5 py-1
                            text-xs font-medium
                            text-muted-foreground
                          "
                        >
                          <UserRound className="size-3.5" />
                          Member
                        </span>
                      )}
                    </TableCell>

                    {/* STATUS */}
                    <TableCell>
                      <span
                        className={`
                          inline-flex items-center gap-1.5
                          rounded-full
                          px-2.5 py-1
                          text-xs font-medium

                          ${
                            user.isActive
                              ? "bg-emerald-500/10 text-emerald-600"
                              : "bg-muted text-muted-foreground"
                          }
                        `}
                      >
                        <span
                          className={`
                            size-1.5 rounded-full

                            ${
                              user.isActive
                                ? "bg-emerald-500"
                                : "bg-muted-foreground"
                            }
                          `}
                        />

                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>

                    {/* JOINED */}
                    <TableCell className="text-sm text-muted-foreground">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </TableCell>

                    {/* ACTION */}
                    <TableCell className="pr-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              disabled={isUpdatingRole}
                            />
                          }
                        >
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-52">
                          {user.role === "MEMBER" ? (
                            <DropdownMenuItem
                              onClick={() => onRoleChange(user, "STAFF")}
                            >
                              <ShieldCheck className="size-4" />
                              Promote to Staff
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => onRoleChange(user, "MEMBER")}
                            >
                              <UserRound className="size-4" />
                              Change to Member
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-64">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
                      <UsersRound className="size-5 text-muted-foreground" />
                    </div>

                    <p className="text-sm font-medium">No users found</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Try changing your search or role filter.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {users.length > 0 && (
        <div className="border-t bg-muted/10 px-4 py-2.5">
          <p className="text-xs text-muted-foreground">
            Showing {users.length} of {totalUsers} users
          </p>
        </div>
      )}
    </>
  );
}

import { useChangeUserRole } from "@/hook/user/useChangeUserRole";
import { useMemo, useState } from "react";

export function useUserPageActions(userList = []) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const [roleUser, setRoleUser] = useState(null);
  const [nextRole, setNextRole] = useState(null);
  const [roleConfirmOpen, setRoleConfirmOpen] = useState(false);

  const { mutate: changeUserRole, isPending: isUpdatingRole } =
    useChangeUserRole();

  const filteredUsers = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return userList.filter((user) => {
      const fullName =
        `${user.firstName ?? ""} ${user.lastName ?? ""}`.toLowerCase();

      const email = user.email?.toLowerCase() ?? "";
      const phone = user.phone ?? "";

      const matchesSearch =
        !keyword ||
        fullName.includes(keyword) ||
        email.includes(keyword) ||
        phone.includes(keyword);

      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [userList, searchTerm, roleFilter]);

  const memberCount = userList.filter((user) => user.role === "MEMBER").length;

  const staffCount = userList.filter((user) => user.role === "STAFF").length;

  const handleRoleChange = (user, role) => {
    setRoleUser(user);
    setNextRole(role);
    setRoleConfirmOpen(true);
  };

  const handleConfirmRoleChange = () => {
    if (!roleUser || !nextRole) return;

    changeUserRole(
      {
        userId: roleUser.id,
        role: nextRole,
      },
      {
        onSuccess: () => {
          setRoleConfirmOpen(false);
          setRoleUser(null);
          setNextRole(null);
        },
      },
    );
  };

  const handleRoleDialogChange = (open) => {
    if (isUpdatingRole) return;

    setRoleConfirmOpen(open);

    if (!open) {
      setRoleUser(null);
      setNextRole(null);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,

    filteredUsers,
    memberCount,
    staffCount,

    roleUser,
    nextRole,
    roleConfirmOpen,
    isUpdatingRole,
    handleRoleChange,
    handleConfirmRoleChange,
    handleRoleDialogChange,
  };
}

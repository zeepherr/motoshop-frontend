import { ConfirmActionDialog } from "@/components/ConfirmActionDialog";
import { ContentLoader } from "@/components/loading/ContentLoader";

import { UserHeader } from "@/components/user/UserHeader";
import { useUserPageActions } from "@/components/user/UserPageAction";
import { UserSummary } from "@/components/user/UserSummary";
import { UserTable } from "@/components/user/UserTable";
import { UserToolbar } from "@/components/user/UserToolbar";

import { useUser } from "@/hook/user/useUser";

function UsersPage() {
  const { data: users, isLoading, isRefetching } = useUser();

  const userList = users?.data ?? users ?? [];

  const {
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
  } = useUserPageActions(userList);

  if (isLoading) {
    return (
      <div className="relative min-h-125">
        <ContentLoader />
      </div>
    );
  }

  return (
    <div className="mt-2 space-y-4">
      <UserHeader totalUsers={userList.length} />

      <UserSummary
        totalUsers={userList.length}
        memberCount={memberCount}
        staffCount={staffCount}
      />

      <div className="overflow-hidden rounded-xl border bg-card">
        <UserToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
        />

        <UserTable
          users={filteredUsers}
          totalUsers={userList.length}
          onRoleChange={handleRoleChange}
          isUpdatingRole={isUpdatingRole}
        />
      </div>

      <ConfirmActionDialog
        open={roleConfirmOpen}
        onOpenChange={handleRoleDialogChange}
        title={
          nextRole === "STAFF"
            ? "Promote this member to staff?"
            : "Change this staff member to member?"
        }
        description={
          roleUser
            ? nextRole === "STAFF"
              ? `${roleUser.firstName} ${roleUser.lastName} will receive staff access to the shop management system.`
              : `${roleUser.firstName} ${roleUser.lastName} will lose staff access and become a regular member.`
            : ""
        }
        confirmLabel={
          nextRole === "STAFF" ? "Promote to Staff" : "Change to Member"
        }
        cancelLabel="Cancel"
        variant={nextRole === "STAFF" ? "default" : "destructive"}
        isPending={isUpdatingRole}
        onConfirm={handleConfirmRoleChange}
      />

      {isRefetching && (
        <p className="text-sm text-muted-foreground">Updating users...</p>
      )}
    </div>
  );
}

export default UsersPage;

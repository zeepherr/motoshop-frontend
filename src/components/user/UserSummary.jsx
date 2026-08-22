import { ShieldCheck, UserRound, UsersRound } from "lucide-react";

function SummaryCard({ label, value, icon: Icon, primary = false }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>

          <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>

        <div
          className={
            primary
              ? "flex size-10 items-center justify-center rounded-lg bg-primary/10"
              : "flex size-10 items-center justify-center rounded-lg bg-muted"
          }
        >
          <Icon
            className={
              primary ? "size-5 text-primary" : "size-5 text-muted-foreground"
            }
          />
        </div>
      </div>
    </div>
  );
}

export function UserSummary({ totalUsers, memberCount, staffCount }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <SummaryCard
        label="Total Users"
        value={totalUsers}
        icon={UsersRound}
        primary
      />

      <SummaryCard label="Members" value={memberCount} icon={UserRound} />

      <SummaryCard
        label="Staff"
        value={staffCount}
        icon={ShieldCheck}
        primary
      />
    </div>
  );
}

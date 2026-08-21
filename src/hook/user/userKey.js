export const userKeys = {
  all: ["users"],
  active: () => [...userKeys.all, "active"],
  includeInactive: () => [...userKeys.all, "including-inactive"],
};

export const productKeys = {
  all: ["products"],
  active: () => [...productKeys.all, "active"],
  includeInactive: () => [...productKeys.all, "including-inactive"],
};

export const motorCategoryKeys = {
  all: ["motor-categories"],
  active: () => [...motorCategoryKeys.all, "active"],

  includingInactive: () => [...motorCategoryKeys.all, "including-inactive"],
};

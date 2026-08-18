export const motorBrandKeys = {
  all: ["motor-brands"],
  active: () => [...motorBrandKeys.all, "active"],

  includingInactive: () => [...motorBrandKeys.all, "including-inactive"],
};

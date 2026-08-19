export const motorServiceKeys = {
  all: ["motor-services"],
  active: () => [...motorServiceKeys.all, "active"],

  includingInactive: () => [...motorServiceKeys.all, "including-inactive"],
};

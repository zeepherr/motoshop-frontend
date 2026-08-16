import { useEffect } from "react";

import { restoreSession } from "@/api/auth/auth.session";
import useAuthStore from "../../stores/auth.store";
import { FullPageLoader } from "../FullPageLoader";
const AuthInitializer = ({ children }) => {
  const status = useAuthStore((state) => state.status);

  useEffect(() => {
    restoreSession();
  }, []);

  if (status === "checking") {
    return <FullPageLoader />;
  }

  return children;
};
export default AuthInitializer;

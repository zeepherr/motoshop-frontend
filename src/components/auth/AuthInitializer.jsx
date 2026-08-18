import { useEffect } from "react";

import { restoreSession } from "@/api/auth/auth.session";
import useAuthStore from "../../stores/auth.store";
import { TopLoaderBar } from "../loading/TopLoaderBar";
const AuthInitializer = ({ children }) => {
  const status = useAuthStore((state) => state.status);

  useEffect(() => {
    restoreSession();
  }, []);

  if (status === "checking") {
    return (
      <div className="min-h-screen bg-background">
        <TopLoaderBar />
      </div>
    );
  }

  return children;
};
export default AuthInitializer;

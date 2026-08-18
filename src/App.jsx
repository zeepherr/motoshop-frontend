import { RouterProvider } from "react-router";
import AuthInitializer from "./components/auth/AuthInitializer";
import { GlobalTopLoader } from "./components/loading/GlobalTopLoader";
import { Toaster } from "./components/ui/sonner";
import router from "./routes/App.route";

const App = () => {
  return (
    <>
      <Toaster />
      <AuthInitializer>
        <GlobalTopLoader />
        <RouterProvider router={router} />
      </AuthInitializer>
    </>
  );
};

export default App;

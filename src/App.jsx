import { RouterProvider } from "react-router";
import AuthInitializer from "./components/auth/AuthInitializer";
import { Toaster } from "./components/ui/sonner";
import router from "./routes/App.route";

const App = () => {
  return (
    <>
      <Toaster />
      <AuthInitializer>
        <RouterProvider router={router} />
      </AuthInitializer>
    </>
  );
};

export default App;

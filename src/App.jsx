import { RouterProvider } from "react-router";
import AuthInitializer from "./components/auth/AuthInitializer";
import { GlobalTopLoader } from "./components/loading/GlobalTopLoader";
import { Toaster } from "./components/ui/sonner";
import router from "./routes/App.route";

const App = () => {
  return (
    <main className=" transition-all duration-500 ease-in-out">
      <Toaster />
      <AuthInitializer>
        <GlobalTopLoader />
        <RouterProvider router={router} />
      </AuthInitializer>
    </main>
  );
};

export default App;

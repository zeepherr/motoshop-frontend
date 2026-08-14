import { RouterProvider } from "react-router";
import AuthInitializer from "./components/auth/AuthInitializer";
import router from "./routes/App.route";

const App = () => {
  return (
    <>
    <AuthInitializer>
      <RouterProvider router={router} />
    </AuthInitializer>
    </>
  );
};

export default App;

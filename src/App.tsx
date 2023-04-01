import "react-toastify/dist/ReactToastify.css";

import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoadingPage from "./pages/LoadingPage";
import { router } from "./SiteRoutes";

function App() {
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <RouterProvider router={router} />
      </Suspense>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;

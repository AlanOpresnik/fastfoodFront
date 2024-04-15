import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import "@fontsource-variable/onest";
import Navbar from "./components/Navbar/Navbar.jsx";
import { Button } from "@mui/material";
import DividerTempo from "./components/DividerTempo/DividerTempo.jsx";
import DividerLorenzo from "./components/DividerLorenzo/DividerLorenzo.jsx";
import Register from "./components/register/Register.jsx";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext.jsx";
import AdminSection from "./admin/components/AdminSection.jsx";
import ProductCard from "./components/ProductsSection/ProductCard.jsx";
import ProductCarrusel from "./components/ProductsSection/ProductCarrusel.jsx";

const router = createHashRouter([
  {
    path: "/",

    element: (
      <>
        <UserProvider>
          <Navbar />
          <App />
          <div className="max-w-[1550px] px-4 mx-auto">
            <div className="mt-12 text-center p-4">
              <h2 className="text-5xl md:text-7xl font-extrabold text-black text-center">
                WIN ON AIR
              </h2>
              <p className="text-md md:text-lg">
                Diseño avanzado que cumple con las especificaciones exactas de
                los mejores atletas.
              </p>
              <Button
                className="!rounded-full !mt-4 !bg-black !py-3 !px-6"
                variant="contained"
              >
                Explora AIR
              </Button>
            </div>
            <section>
              <DividerTempo />
            </section>
            <section className="mt-12">
              <DividerLorenzo />
            </section>
            <section className="mt-12">
              <h4 className="text-3xl px-4">Lo nuevo de Nike</h4>
              <ProductCarrusel />
            </section>
          </div>
        </UserProvider>
      </>
    ),
  },
  {
    path: "/login",

    element: (
      <>
        <Toaster position="top-center" />
        <UserProvider>
          <Login />
        </UserProvider>
      </>
    ),
  },
  {
    path: "/register",

    element: (
      <>
        <Toaster position="top-right" />
        <UserProvider>
          <Register />
        </UserProvider>
      </>
    ),
  },
  {
    path: "/admin",

    element: (
      <>
        <Toaster position="top-right" />
        <h2>admin</h2>
        <AdminSection />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

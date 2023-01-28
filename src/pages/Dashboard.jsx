import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/Layout";
import { useSidebar } from "../hooks/useSidebar";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Dashboard() {
  const { user } = useAuth();
  let { setSidebar, sidebar } = useSidebar();

  const navigate = useNavigate();
  useEffect(() => {
    user.roles.forEach((role) => {
      if (role.name === "admin") {
        navigate("/admin");
      }
    });

    return () => {};
  }, []);

  return (
    <div className="flex gap-3">
      <Layout />
      {!sidebar && (
        <RxHamburgerMenu
          className="absolute top-10 left-4 text-lg text-primary-900 md:hidden "
          onClick={() => {
            setSidebar(true);
          }}
        />
      )}
      <div className="p-10 w-full">
        <Outlet />
      </div>
    </div>
  );
}

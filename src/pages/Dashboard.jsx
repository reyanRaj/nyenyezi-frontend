import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/Layout";

export default function Dashboard() {
  const { user } = useAuth();
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
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
}

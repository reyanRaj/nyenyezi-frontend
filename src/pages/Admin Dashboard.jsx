import React from "react";
import AdminLayout from "../components/Admin Layout";
import { Outlet, Route, Routes } from "react-router-dom";
import AdminDashboardHomePage from "./Admin Dashboard Home Page";
import AddUser from "./AddUser";
import AddCustomer from "./AddCustomer";
import AddProduct from "./AddProduct";

export default function AdminDashboard() {
  return (
    <div className="flex gap-3">
      <AdminLayout />
      <div className="p-10 w-full">
        <Outlet />
      </div>
    </div>
  );
}

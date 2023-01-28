import React from "react";
import AdminLayout from "../components/Admin Layout";
import { Outlet, Route, Routes } from "react-router-dom";
import AdminDashboardHomePage from "./Admin Dashboard Home Page";
import AddUser from "./AddUser";
import AddCustomer from "./AddCustomer";
import AddProduct from "./AddProduct";
import { SidebarProvider, useSidebar } from "../hooks/useSidebar";
import { RxHamburgerMenu } from "react-icons/rx";

export default function AdminDashboard() {
  let { setSidebar, sidebar } = useSidebar();

  return (
    <div className="flex gap-3">
      <AdminLayout />
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

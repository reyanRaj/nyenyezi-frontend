import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

//pages
import AdminDashboard from "../pages/Admin Dashboard";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminProtectedRoute } from "./AdminProtectedRoute";
import AdminDashboardHomePage from "../pages/Admin Dashboard Home Page";
import AddUser from "../pages/AddUser";
import AddProduct from "../pages/AddProduct";
import AddCustomer from "../pages/AddCustomer";
import DashboardHomePage from "../pages/Dashboard Home Page";
import AddTransactions from "../pages/AddTransactions";
import Transactions from "../pages/Transactions";
import GetUser from "../pages/GetUser";
import GetProduct from "../pages/GetProduct";
import GetCustomer from "../pages/GetCustomer";
function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHomePage />} />
        <Route path="transactions/add" element={<AddTransactions />} />
        <Route path="transactions" element={<Transactions />} />
      </Route>
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardHomePage />} />
        <Route path="user/add" element={<AddUser />} />
        <Route path="product/add" element={<AddProduct />} />
        <Route path="costumer/add" element={<AddCustomer />} />
        <Route path="user" element={<GetUser />} />
        <Route path="product" element={<GetProduct />} />
        <Route path="customer" element={<GetCustomer />} />
      </Route>
      <Route path="login" element={<Login />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default Router;

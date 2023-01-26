import React from "react";
import { BsClockHistory } from "react-icons/bs";
import { MdAddShoppingCart } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="flex items-stretch">
      <aside className="w-64" aria-label="Sidebar">
        <div className="px-3 py-4 w-64 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800 h-screen fixed">
          <Link to="/admin" className="flex items-center pl-2.5 mb-5">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-primary-900 dark:text-white font-['Poppins']">
              Nyenyezi
            </span>
          </Link>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <RxDashboard />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/transactions/add"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MdAddShoppingCart />
                <span className="ml-3">Add Transactions</span>
              </Link>
            </li>

            {/* <li>
              <Link
                to="/admin/user"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiUsers />
                <span className="ml-3">All Users</span>
              </Link>
            </li> */}

            <li>
              <Link
                to="/transactions"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BsClockHistory />
                <span className="ml-3">History</span>
              </Link>
            </li>

            {/* <li>
              <Link
                to="/admin/constumer"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiUsers />
                <span className="ml-3">All Costumers</span>
              </Link>
            </li> */}
            {/* 
            <li>
              <Link
                to="/admin/product/add"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MdOutlineProductionQuantityLimits />
                <span className="ml-3">Add Product</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </aside>
      {/* <Outlet /> */}
    </div>
  );
}

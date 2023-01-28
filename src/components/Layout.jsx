import React from "react";
import { BsClockHistory } from "react-icons/bs";
import { MdAddShoppingCart } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Button } from "flowbite-react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useSidebar } from "../hooks/useSidebar";
import { AiFillCloseCircle } from "react-icons/ai";

export default function AdminSidebar() {
  let { logout } = useAuth();
  let { sidebar, setSidebar } = useSidebar();

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className="flex items-stretch">
      {sidebar && (
        <aside className="w-64" aria-label="Sidebar">
          <div className="px-3 py-4 w-64 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800 h-screen fixed">
            <div className="flex mb-5 justify-between items-center">
              <Link
                to="/admin"
                className="flex items-center pl-2.5text-primary-900"
              >
                <span className="self-center text-xl font-semibold whitespace-nowrap text-primary-900 dark:text-white font-['Poppins']">
                  Nyenyezi
                </span>
              </Link>
              <AiFillCloseCircle
                className="cursor-pointer md:hidden text-primary-900"
                onClick={() => {
                  setSidebar(false);
                }}
              />
            </div>
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
            <Button
              outline={true}
              gradientDuoTone="pinkToOrange"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </div>
        </aside>
      )}
      {/* <Outlet /> */}
    </div>
  );
}

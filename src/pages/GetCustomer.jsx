import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import EditCustomerModal from "../components/EditCustomerModal";
import ConfirmModal from "../components/ConfirmModal";
import UserCard from "../components/UserCard";

export default function GetCustomer() {
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const { token } = useAuth();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletableCustomer, setDeletableCustomer] = useState(0);
  const [editableCustomer, setEditableCustomer] = useState(0);
  const [editCustomerModal, setEditCustomerModal] = useState(false);

  useEffect(() => {
    try {
      async function init() {
        let headers = {
          "x-access-token": token,
        };
        let response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/getAllCostumers`,
          { headers }
        );

        setCustomers(response.data.costumers);
      }
      setLoading(true);
      init();
    } catch (err) {
      if (err.response.data.message) {
        setAlert(err.response.data.message);
        return;
      }

      setAlert("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [alert]);
  const onEditClicked = (index) => {
    setEditCustomerModal(true);
    setEditableCustomer(index);
  };
  const onDeleteClicked = (index) => {
    setDeleteModal(true);
    setDeletableCustomer(index);
  };
  const onDeleteModalNoClicked = () => {
    setDeleteModal(false);
  };
  const onDeleteModalYesClicked = async () => {
    try {
      setLoading(true);
      let headers = {
        "x-access-token": token,
      };
      let response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/deleteCostumer/${
          customers[deletableCustomer]._id
        }`,
        { headers }
      );
      setAlert(response.data.message);
    } catch (err) {
      if (err.response.data.message) {
        setAlert(err.response.data.message);
        return;
      }

      setAlert("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
      setDeleteModal(false);
    }
  };
  return (
    <div>
      {customers[editableCustomer] && (
        <EditCustomerModal
          key={editableCustomer}
          show={editCustomerModal}
          setShow={setEditCustomerModal}
          customer={customers[editableCustomer]}
          setLoading={setLoading}
          setAlert={setAlert}
        />
      )}
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white font-['Baloo 2'] ">
        Customers
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        Here are all the customers assosciated with Nyenyezi
      </p>
      <ConfirmModal
        show={deleteModal}
        setShow={setDeleteModal}
        text="Are your sure your want to delete this customer"
        onYesClicked={onDeleteModalYesClicked}
        onNoClicked={onDeleteModalNoClicked}
      />
      {loading && <Spinner />}
      {alert && <Alert text={alert} />}
      <div className="grid gap-6 mb-6 md:grid-cols-4">
        {customers.map((customer, index) => {
          return (
            <UserCard
              username={customer.username}
              email={customer.email}
              key={index}
              onEditClicked={() => {
                onEditClicked(index);
              }}
              onDeleteClicked={() => {
                onDeleteClicked(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

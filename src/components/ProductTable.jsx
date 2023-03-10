import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";
import ConfirmModal from "./ConfirmModal";
import axios from "axios";
import EditProductModal from "./EditProductModal";

export default function ProductTable(props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editableProduct, setEditableProduct] = useState(0);

  const [deletableProduct, setDeletableProduct] = useState(0);
  const { token } = useAuth();

  const onDeleteClicked = (index) => {
    setShowDeleteModal(true);
    setDeletableProduct(index);
  };
  const onEditClick = (i) => {
    setShowEditModal(true);
    setEditableProduct(i);
  };
  const onDeleteModalYesClicked = async () => {
    try {
      props.setLoading(true);
      let headers = {
        "x-access-token": token,
      };
      let response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/deleteProduct/${
          props.products[deletableProduct]._id
        }`,
        { headers }
      );
      props.setAlert(response.data.message);
    } catch (err) {
      if (err.response.data.message) {
        props.setAlert(err.response.data.message);
        return;
      }

      props.setAlert("Something went wrong");
      console.log(err);
    } finally {
      props.setLoading(false);
      setShowDeleteModal(false);
      window.scrollTo(0, 0);
    }
  };

  const onDeleteModalNoClicked = () => {
    setShowDeleteModal(false);
  };

  return (
    <div>
      {props.products[editableProduct] && (
        <EditProductModal
          setLoading={props.setLoading}
          setAlert={props.setAlert}
          show={showEditModal}
          setShow={setShowEditModal}
          product={props.products[editableProduct]}
        />
      )}
      <ConfirmModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        text="Do you really want to delete this product?"
        onYesClicked={onDeleteModalYesClicked}
        onNoClicked={onDeleteModalNoClicked}
      />
      <div className="relative overflow-x-auto">
        <table className=" text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {props.products.map((product, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.name}
                  </th>
                  <td className="px-6 py-4">
                    N {product.price.$numberDecimal || product.price}
                  </td>
                  <td className="px-6 py-4 flex">
                    <Button
                      text="Edit"
                      color="blue"
                      onClick={() => {
                        onEditClick(index);
                      }}
                    />
                    <Button
                      text="Delete"
                      color="red"
                      onClick={() => {
                        onDeleteClicked(index);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

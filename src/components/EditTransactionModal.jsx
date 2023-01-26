import React, { useState, useEffect } from "react";
import { Modal, Button, Label, TextInput, Textarea } from "flowbite-react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Select from "./Select";

export default function EditProductModal(props) {
  const onClose = () => {
    props.setShow(false);
  };
  const { token } = useAuth();
  const [customer, setCustomer] = useState(props.transaction.customer._id);
  const [product, setProduct] = useState(props.transaction.product._id);
  const [quantity, setQuantity] = useState(props.transaction.quantity);
  let customerSelectOptions,
    productSelectOptions = [];

  useEffect(() => {
    setCustomer(props.transaction.customer._id);
    setProduct(props.transaction.product._id);
    setQuantity(props.transaction.quantity);
  }, [props.transaction]);

  customerSelectOptions = props.customers.map((customer) => {
    return {
      text: customer.username,
      value: customer._id,
    };
  });

  productSelectOptions = props.products.map((prodcut) => {
    return {
      text: prodcut.name,
      value: prodcut._id,
    };
  });

  const onUpdateClicked = async () => {
    try {
      props.setLoading(true);

      let transaction = props.transaction;

      if (customer) {
        transaction.customer = customer;
      }

      if (product) {
        transaction.product = product;
      }

      if (quantity) {
        transaction.quantity = quantity;
      }

      let headers = {
        "x-access-token": token,
      };
      let response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/updateTransaction`,
        { transaction },
        { headers }
      );

      props.setAlert(response.data.message);
    } catch (err) {
      if (err.response.data.message) {
        props.setAlert(err.response.data.message);
        return;
      }

      setAlert("Something went wrong");
      console.log(err);
    } finally {
      props.setLoading(false);
      props.setShow(false);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div>
      <React.Fragment>
        <Modal show={props.show} size="md" popup={true} onClose={onClose}>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Update Transaction
              </h3>
              <div></div>
              <div>
                <div className="mb-2 block">
                  <Select
                    label="Customers"
                    options={customerSelectOptions}
                    value={props.customers.findIndex(function (item, i) {
                      return item._id === customer;
                    })}
                    onChange={(event) => {
                      setCustomer(props.customers[event.target.value]._id);
                    }}
                  />
                </div>
                <div className="mb-2 block">
                  <Select
                    label="Products"
                    options={productSelectOptions}
                    value={props.products.findIndex(function (item, i) {
                      return item._id === product;
                    })}
                    onChange={(event) => {
                      setProduct(props.products[event.target.value]._id);
                    }}
                  />
                </div>
                <div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="quantity" value="quantity" />
                    </div>
                    <TextInput
                      id="quantity"
                      value={quantity}
                      onChange={(event) => {
                        setQuantity(event.target.value);
                      }}
                      type="number"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <Button onClick={onUpdateClicked}>Update</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </div>
  );
}

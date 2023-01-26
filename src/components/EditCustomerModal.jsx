import React, { useState, useEffect } from "react";
import { Modal, Button, Label, TextInput, Checkbox } from "flowbite-react";
import axios from "axios";
import bcryptjs from "bcryptjs";
import { useAuth } from "../hooks/useAuth";

export default function EditCustomerModal(props) {
  const onClose = () => {
    props.setShow(false);
  };
  const [username, setUsername] = useState(props.customer.username);
  const { token } = useAuth();

  const [email, setEmail] = useState(props.customer.email);

  useEffect(() => {
    setUsername(props.customer.username);
    setEmail(props.customer.email);
  }, [props.customer]);

  const onUpdateClicked = async () => {
    try {
      props.setLoading(true);

      let customer = props.customer;

      if (username) {
        customer.username = username;
      }

      if (email) {
        customer.email = email;
      }

      //   console.log(data);

      let headers = {
        "x-access-token": token,
      };
      let response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/updateCostumer`,
        { customer },
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
                Update Customer
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="User Name" />
                </div>
                <TextInput
                  id="name"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                  type="text"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="User email" />
                </div>
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  type="email"
                />
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

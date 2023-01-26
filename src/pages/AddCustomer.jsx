import React from "react";
import TextInput from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export default function AddCustomer() {
  const { token } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = () => {
    if (!firstName || !lastName) {
      setAlert("Enter all information");
      return;
    }

    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setAlert("Invalid Email");
      return;
    }
    setLoading(true);
    let data = {
      username: firstName + " " + lastName,
      email,
    };

    let headers = {
      "x-access-token": token,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/addCostumer`, data, {
        headers,
      })
      .then((response) => {
        if (!response.status == 201) {
          setAlert(response.data.message);
          return;
        }

        setAlert(response.data.message);
      })
      .catch((err) => {
        if (err.response.data.message) {
          setAlert(err.response.data.message);
          return;
        }

        setAlert("Something went wrong");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white font-['Baloo 2'] ">
        Add Customer
      </h1>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        Add a new customer to Nyenyezi,
      </p>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        Just enter the email and name of customer.
      </p>

      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <TextInput
          label="First Name"
          placeholder="John"
          type="text"
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
          value={firstName}
        />
        <TextInput
          label="Last Name"
          placeholder="Doe"
          type="text"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
          value={lastName}
        />
        <TextInput
          label="Email"
          placeholder="user@company.com"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
        />
      </div>

      <Button text="Submit" color="blue" onClick={onSubmitHandler} />
      {loading && <Spinner />}
      {alert && <Alert text={alert} />}
    </div>
  );
}

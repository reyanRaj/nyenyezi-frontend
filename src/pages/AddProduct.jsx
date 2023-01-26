import React from "react";
import TextInput from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Textarea from "../components/Textarea";

export default function AddProduct() {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = () => {
    if (!name || !price) {
      setAlert("Enter all information");
      return;
    }

    setLoading(true);
    let data = {
      name,
      description,
      price,
    };

    let headers = {
      "x-access-token": token,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/addProduct`, data, {
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
        Add Product
      </h1>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        Add a new product to Nyenyezi,
      </p>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        Just enter an unique name, a price and an optional short description
        about your product
      </p>

      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <TextInput
          label="Name"
          placeholder="Iphone 11"
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
          value={name}
        />
        <TextInput
          label="Price (in $)"
          placeholder="1999.99"
          type="number"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
          value={price}
        />
        <Textarea
          label="Description"
          placeholder="One of the most reputated phone in the world ....."
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </div>
      <Button text="Submit" color="blue" onClick={onSubmitHandler} />
      {loading && <Spinner />}
      {alert && <Alert text={alert} />}
    </div>
  );
}

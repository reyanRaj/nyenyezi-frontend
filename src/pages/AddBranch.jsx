import React from "react";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import TextInput from "../components/Input";
import Button from "../components/Button";

export default function AddBranch() {
  const [branchName, setBranchName] = useState("");
  const { token } = useAuth();
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = () => {
    if (!branchName) {
      setAlert("Enter the branch Name");
      return;
    }

    setLoading(true);
    let data = {
      branchName,
    };

    let headers = {
      "x-access-token": token,
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/addBranch`, data, {
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
        Add Branch
      </h1>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        Embed a new branch with Nyenyezi,
      </p>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        Just enter the name of the branch
      </p>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <TextInput
          label="Branch Name"
          placeholder="Zambezi"
          type="text"
          onChange={(event) => {
            setBranchName(event.target.value);
          }}
          value={branchName}
        />
      </div>
      <Button text="Submit" color="blue" onClick={onSubmitHandler} />
      {loading && <Spinner />}
      {alert && <Alert text={alert} />}
    </div>
  );
}

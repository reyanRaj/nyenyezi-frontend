import React from "react";
import TextInput from "../components/Input";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Select from "../components/Select";

export default function AddUser() {
  const { token } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(0);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  useEffect(() => {
    try {
      async function init() {
        setLoading(true);
        let headers = {
          "x-access-token": token,
        };

        let response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/getAllBranches`,
          { headers }
        );

        setBranches(response.data.branches);
      }

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
  }, []);

  let branchesOptions = branches.map((branch) => {
    return { text: branch.name, value: branch._id };
  });

  let roleOptions = [{ text: "User" }, { text: "Admin" }];

  const onSubmitHandler = () => {
    if (!firstName || !lastName || !password) {
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
      password,
      branch: branches[selectedBranchIndex],
      role: selectedRoleIndex == 0 ? "user" : "admin",
    };
    console.log(data);
    let headers = {
      "x-access-token": token,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/addUser`, data, {
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
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white font-['Baloo 2'] ">
        Add User
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        Register a new user with Nyenyezi,
      </p>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        Just enter the email and password of user.
      </p>

      <div className="grid gap-6 mb-6 md:grid-cols-2">
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

        <Select
          label="Select Branch"
          options={branchesOptions}
          value={selectedBranchIndex}
          onChange={(event) => {
            setSelectedBranchIndex(event.target.value);
          }}
        />

        <Select
          label="Select Role"
          options={roleOptions}
          value={selectedRoleIndex}
          onChange={(event) => {
            setSelectedRoleIndex(event.target.value);
          }}
        />

        <TextInput
          label="Password"
          placeholder="..........."
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
        />
      </div>
      <Button text="Submit" color="blue" onClick={onSubmitHandler} />
      {loading && <Spinner />}
      {alert && <Alert text={alert} />}
    </div>
  );
}

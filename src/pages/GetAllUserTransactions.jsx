import React, { useState, useEffect } from "react";
import TransactionTable from "../components/TransactionTable";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { TextInput } from "flowbite-react";
import moment from "moment";

export default function GetAllUserTransactions() {
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const navigate = useNavigate();
  const [updater, setUpdater] = useState(Date.now());

  useEffect(() => {
    try {
      async function init() {
        let headers = {
          "x-access-token": token,
        };
        let response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/admin/getAllUserTransactions?date=${date}`,
          { headers }
        );
        setTransactions(response.data.transactions);

        let response_1 = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/getAllCostumers`,
          { headers }
        );
        setCustomers(response_1.data.costumers);

        let response_2 = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/getAllProducts`,
          { headers }
        );

        setProducts(response_2.data.products);

        let response_3 = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/getAllUsers`,
          { headers }
        );

        setUsers(response_3.data.users);
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
  }, [alert, date, updater]);

  const mailCSVClicked = async () => {
    try {
      setLoading(true);

      if (!email) {
        return setAlert("Enter Email address");
      }
      let headers = {
        "x-access-token": token,
      };
      let response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/mailCSVAll?date=${date}`,
        { email: email, date },
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
    }
  };

  const downloadCSVClicked = async () => {
    try {
      setLoading(true);

      let headers = {
        "x-access-token": token,
      };
      let response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/admin/generateCSVAll/?date=${date}`,
        { headers }
      );
      saveAs(
        `${import.meta.env.VITE_BACKEND_URL}/${response.data.url}`,
        "Transaction.csv"
      );
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
  };

  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white font-['Baloo 2'] ">
        All Transactions
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        Here are all the transactions assosciated by users including you
      </p>
      <div className="flex mb-6 items-center flex-wrap">
        <Button color="blue" text="Download CSV" onClick={downloadCSVClicked} />
        <Button color="blue" text="Mail CSV" onClick={mailCSVClicked} />
        <Input
          style={{ marginTop: "0px" }}
          type="email"
          placeholder="user@company.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextInput
          type={"date"}
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
      </div>
      {loading && <Spinner />}
      {alert && <Alert text={alert} />}
      {users.length && (
        <TransactionTable
          transactions={transactions}
          setAlert={setAlert}
          setLoading={setLoading}
          products={products}
          customers={customers}
          maximise={true}
          users={users}
          setUpdater={setUpdater}
        />
      )}
    </div>
  );
}

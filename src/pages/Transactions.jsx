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

export default function Transactions() {
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      async function init() {
        let headers = {
          "x-access-token": token,
        };
        let response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/getTransactions`,
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
        `${import.meta.env.VITE_BACKEND_URL}/api/user/mailCSV`,
        { email: email },
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
        `${import.meta.env.VITE_BACKEND_URL}/api/user/generateCSV`,
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
        Transactions
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        Here are all the transactions assosciated with Nyenyezi
      </p>
      <div className="flex mb-6 items-center">
        <Button color="blue" text="Download CSV" onClick={downloadCSVClicked} />
        <Button color="blue" text="Mail CSV" onClick={mailCSVClicked} />
        <Input
          type="email"
          placeholder="user@company.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      {loading && <Spinner />}
      {alert && <Alert text={alert} />}
      <TransactionTable
        transactions={transactions}
        setAlert={setAlert}
        setLoading={setLoading}
        products={products}
        customers={customers}
      />
    </div>
  );
}

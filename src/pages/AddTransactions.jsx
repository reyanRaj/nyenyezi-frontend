import React from "react";
import AddTransactionCard from "../components/AddTransactionCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import Button from "../components/Button";
import { Label, TextInput } from "flowbite-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function AddTransactions() {
  let { token } = useAuth();
  let total = 0;
  let navigate = useNavigate();
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [transactionCards, setTransactionCards] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [updater, setUpdater] = useState(Date.now());
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const handleAddTranctionCard = (e) => {
    e.preventDefault();
    setTransactionCards([
      ...transactionCards,
      <AddTransactionCard
        customers={customers}
        products={products}
        key={transactions.length}
        index={transactions.length}
        transactions={transactions}
        setTransactions={setTransactions}
        setUpdater={setUpdater}
        updater={updater}
        transactionCards={transactionCards}
        setTransactionCards={setTransactionCards}
      />,
    ]);
  };

  const handleSumbit = (e) => {
    saveTransations();
  };

  const saveTransations = async () => {
    try {
      let headers = {
        "x-access-token": token,
      };
      let response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/addTransactions`,
        { transactions, date },
        { headers }
      );

      setAlert(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1000);
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

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        let headers = {
          "x-access-token": token,
        };
        let response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/getAllCostumers`,
          { headers }
        );
        setCustomers(response.data.costumers);

        let response_2 = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/getAllProducts`,
          { headers }
        );

        setProducts(response_2.data.products);

        setTransactionCards([
          <AddTransactionCard
            customers={response.data.costumers}
            products={response_2.data.products}
            key={0}
            setUpdater={setUpdater}
            updater={updater}
            index={0}
            transactions={transactions}
            setTransactions={setTransactions}
            transactionCards={transactionCards}
            setTransactionCards={setTransactionCards}
          />,
        ]);
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
    }
    getData();

    return () => {};
  }, []);
  const handleRemoveTranctionCard = () => {
    let tempTransactionCard = transactionCards;
    tempTransactionCard.pop();
    setTransactionCards(tempTransactionCard);

    let tempTransactionData = transactions;
    tempTransactionData.pop();
    setTransactions(tempTransactionData);

    setUpdater(Date.now());
  };

  transactions.map((transaction) => {
    total = transaction.total + total;
  });
  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white font-['Baloo 2'] ">
        Add Transaction
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        Add a new transactions with Nyenyezi,
      </p>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        Just enter the transaction informations below
      </p>
      {loading && <Spinner />}
      {alert && <Alert text={alert} />}
      <Label htmlFor="date" value="Select date" />
      <TextInput
        type={"date"}
        value={date}
        id="date"
        onChange={(event) => {
          setDate(event.target.value);
        }}
        className="mb-6"
      />

      {products.length && (
        <>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="md:px-6 md:py-3">
                    Customer
                  </th>
                  <th scope="col" className="md:px-6 md:py-3">
                    Product
                  </th>
                  <th scope="col" className="md:px-6 md:py-3">
                    Quantity
                  </th>
                  <th scope="col" className="md:px-6 md:py-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>{transactionCards}</tbody>
            </table>
          </div>

          <Button
            color="blue"
            text="Add more"
            onClick={handleAddTranctionCard}
            style={{
              background: "white",
              color: "#1a56db",
            }}
          />

          <p className="mb-3 font-['Poppins']  font-bold text-gray-900 dark:text-gray-400">
            Grand Total: N {total.toFixed(2)}
          </p>
          {transactionCards.length > 1 && (
            <Button
              color="red"
              text="Remove"
              onClick={handleRemoveTranctionCard}
            />
          )}
          <Button color="blue" text="Submit" onClick={handleSumbit} />
        </>
      )}
    </div>
  );
}

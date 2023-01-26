import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductTable from "../components/ProductTable";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import { useAuth } from "../hooks/useAuth";

export default function GetProduct() {
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      async function init() {
        let headers = {
          "x-access-token": token,
        };
        let response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/getAllProducts`,
          { headers }
        );

        setProducts(response.data.products);
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

  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white font-['Baloo 2'] ">
        Products
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        Here are all the products assosciated with Nyenyezi
      </p>
      {loading && <Spinner />}
      {alert && <Alert text={alert} />}
      {products && (
        <ProductTable
          products={products}
          setLoading={setLoading}
          setAlert={setAlert}
        />
      )}
    </div>
  );
}

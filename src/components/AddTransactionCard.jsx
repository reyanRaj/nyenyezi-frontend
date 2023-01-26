import React, { useState, useEffect } from "react";
import Select from "./Select";
import Input from "./Input";
import { AiFillCloseCircle } from "react-icons/ai";
import Button from "./Button";
import { TextInput } from "flowbite-react";
import DatePicker from "./DatePicker";

export default function AddTransactionCard(props) {
  let customerSelectOptions = [];
  let productSelectOptions = [];
  const [selectedCustomer, setSelectedCustomer] = useState(0);
  const [selectedProduct, setSelectedProdcut] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    props.setUpdater(Date.now());
  }, []);

  useEffect(() => {
    let temp = props.transactions;
    let productPrice = props.products[selectedProduct].price["$numberDecimal"];
    let totalPrice = (parseFloat(productPrice) * quantity * 116) / 100;

    temp[props.index] = {
      customer: props.customers[selectedCustomer]._id,
      product: props.products[selectedProduct]._id,
      quantity: quantity,
      total: parseFloat(totalPrice),
    };

    props.setUpdater(Date.now());
    props.setTransactions(temp);
  }, [selectedCustomer, selectedProduct, quantity]);

  const handleRemove = (e) => {
    let tempCards = props.transactionCards;
    let tempData = props.transactions;
    console.log(tempCards);

    tempData.splice(props.index, 1);
    tempCards.splice(props.index, 1);

    props.setTransactions(tempData);
    props.setTransactionCards(tempCards);
  };

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

  return (
    <>
      {/* <p class="mb-3 font-['Poppins']  font-bold text-gray-900 dark:text-gray-400">
        Price: ${props.products[selectedProduct].price.$numberDecimal} *{" "}
        {quantity}
      </p>

      <p class="mb-3 font-['Poppins']  font-bold text-gray-900 dark:text-gray-400">
        VAT: 16%
      </p>

      <p class="mb-3 font-['Poppins']  font-bold text-gray-900 dark:text-gray-400">
        Total: $
        {(
          (props.products[selectedProduct].price.$numberDecimal *
            quantity *
            116) /
          100
        ).toFixed(2)}
      </p> */}

      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <DatePicker readOnly={true} />
        </th>
        <td class="px-6 py-4">
          <Select
            options={customerSelectOptions}
            value={selectedCustomer}
            onChange={(event) => {
              setSelectedCustomer(event.target.value);
            }}
          />
        </td>
        <td class="px-6 py-4">
          <Select
            options={productSelectOptions}
            value={selectedProduct}
            onChange={(event) => {
              setSelectedProdcut(event.target.value);
            }}
          />
        </td>
        <td class="px-6 py-4">
          <Input
            placeholder="4"
            type="number"
            value={quantity}
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
          />
        </td>
      </tr>
    </>
  );
}

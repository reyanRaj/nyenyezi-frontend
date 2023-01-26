import React, { useState, useEffect } from "react";
import { Modal, Button, Label, TextInput, Textarea } from "flowbite-react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export default function EditProductModal(props) {
  const onClose = () => {
    props.setShow(false);
  };
  const [name, setName] = useState(props.product.name);
  const { token } = useAuth();

  const [price, setPrice] = useState(props.product.price.$numberDecimal);
  const [description, setDescription] = useState(props.product.description);

  useEffect(() => {
    setName(props.product.name);
    setPrice(props.product.price.$numberDecimal);
    setDescription(props.product.description);
  }, [props.product]);

  const onUpdateClicked = async () => {
    try {
      props.setLoading(true);

      let product = props.product;

      if (name) {
        product.name = name;
      }

      if (price) {
        product.price = parseFloat(price);
      }

      if (description) {
        product.description = description;
      }

      console.log(product);

      let headers = {
        "x-access-token": token,
      };
      let response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/updateProduct`,
        { product },
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
                Update Product
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Product Name" />
                </div>
                <TextInput
                  id="name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  type="text"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="price" value="Product price" />
                </div>
                <TextInput
                  id="price"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                  type="number"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="description" value="Product Description" />
                </div>
                <Textarea
                  id="description"
                  value={description}
                  row={4}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
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

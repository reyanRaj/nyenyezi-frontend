import React, { useState, useEffect } from "react";
import { Modal, Button, Label, TextInput, Checkbox } from "flowbite-react";
import axios from "axios";
import bcryptjs from "bcryptjs";
import { useAuth } from "../hooks/useAuth";

export default function EditUserModal(props) {
  const onClose = () => {
    props.setShow(false);
  };
  const [username, setUsername] = useState(props.user.username);
  const { token } = useAuth();

  const [email, setEmail] = useState(props.user.email);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setUsername(props.user.username);
    setEmail(props.user.email);
  }, [props.user]);

  const onUpdateClicked = async () => {
    try {
      props.setLoading(true);

      let user = props.user;

      if (username) {
        user.username = username;
      }

      if (email) {
        user.email = email;
      }

      if (password) {
        user.password = bcryptjs.hashSync(password, 8);
      }

      //   console.log(data);

      let headers = {
        "x-access-token": token,
      };
      let response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/updateUser`,
        { user },
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
                Update User
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="User Name" />
                </div>
                <TextInput
                  id="name"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                  type="text"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="User email" />
                </div>
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  type="email"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="User password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
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

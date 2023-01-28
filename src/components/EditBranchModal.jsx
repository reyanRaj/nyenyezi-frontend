import { Button, Label, Modal, TextInput } from "flowbite-react";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export default function EditBranchModal(props) {
  const [branchName, setBranchName] = useState(props.branch.name);

  let { token } = useAuth();
  const onClose = () => {
    props.setShow(false);
  };

  //   useEffect(() => {
  //     setBranchName(props.branch.name);
  //   }, [props.branch]);

  const onUpdateClicked = async () => {
    try {
      props.setLoading(true);

      let branch = props.branch;

      if (branchName) {
        branch.name = branchName;
      }

      let headers = {
        "x-access-token": token,
      };
      let response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/updateBranch`,
        { branch },
        { headers }
      );

      props.setAlert(response.data.message);
    } catch (err) {
      if (err.response.data.message) {
        props.setAlert(err.response.data.message);
        return;
      }

      console.log(err);
      setAlert("Something went wrong");
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
                Update Branch
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="User Name" />
                </div>
                <TextInput
                  id="name"
                  value={branchName}
                  onChange={(event) => {
                    setBranchName(event.target.value);
                  }}
                  type="text"
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

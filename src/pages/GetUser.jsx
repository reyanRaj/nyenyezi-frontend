import React from "react";
import { useEffect } from "react";
import UserCard from "../components/UserCard";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import ConfirmModal from "../components/ConfirmModal";
import EditUserModal from "../components/EditUserModal";

export default function GetUser() {
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const { token } = useAuth();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletableUser, setDeletableUser] = useState(0);
  const [editableUser, setEditableUser] = useState(0);
  const [editUserModal, setEditUserModal] = useState(false);
  const [branches, setBranches] = useState([]);
  const [updater, setUpdater] = useState(Date.now());

  useEffect(() => {
    try {
      async function init() {
        let headers = {
          "x-access-token": token,
        };
        let response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/getAllUsers`,
          { headers }
        );

        setUsers(response.data.users);

        let response_2 = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/getAllBranches`,
          { headers }
        );

        setBranches(response_2.data.branches);
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
  }, [alert, updater]);
  const onEditClicked = (index) => {
    setEditUserModal(true);
    setEditableUser(index);
  };
  const onDeleteClicked = (index) => {
    setDeleteModal(true);
    setDeletableUser(index);
  };
  const onDeleteModalNoClicked = () => {
    setDeleteModal(false);
  };
  const onDeleteModalYesClicked = async () => {
    try {
      setLoading(true);
      let headers = {
        "x-access-token": token,
      };
      let response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/deleteUser/${
          users[deletableUser]._id
        }`,
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
      setDeleteModal(false);
    }
  };
  return (
    <div>
      {users[editableUser] && (
        <EditUserModal
          key={editableUser}
          show={editUserModal}
          setShow={setEditUserModal}
          user={users[editableUser]}
          setUsers={setUsers}
          setLoading={setLoading}
          branches={branches}
          setAlert={setAlert}
          setUpdater={setUpdater}
        />
      )}
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white font-['Baloo 2'] ">
        Users
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        Here are all the users assosciated with Nyenyezi
      </p>
      <ConfirmModal
        show={deleteModal}
        setShow={setDeleteModal}
        text="Are your sure your want to delete this user"
        onYesClicked={onDeleteModalYesClicked}
        onNoClicked={onDeleteModalNoClicked}
      />
      {loading && <Spinner />}
      {alert && <Alert text={alert} />}
      <div className="grid gap-6 mb-6 md:grid-cols-4">
        {users.map((user, index) => {
          return (
            <UserCard
              username={user.username}
              email={user.email}
              branch={user.branch.name}
              role={user.roles[0].name}
              key={index}
              onEditClicked={() => {
                onEditClicked(index);
              }}
              onDeleteClicked={() => {
                onDeleteClicked(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

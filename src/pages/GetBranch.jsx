import axios from "axios";
import React, { useEffect, useState } from "react";
import Alert from "../components/Alert";
import BranchCard from "../components/BranchCard";
import ConfirmModal from "../components/ConfirmModal";
import EditBranchModal from "../components/EditBranchModal";
import Spinner from "../components/Spinner";
import { useAuth } from "../hooks/useAuth";

export default function GetBranch() {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [alert, setAlert] = useState("");
  const [branches, setBranches] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletableBranch, setDeletableBranch] = useState(0);
  const [editableBranch, setEditableBranch] = useState(0);
  const [editBranchModal, setEditBranchModal] = useState(false);

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
  });

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
        `${import.meta.env.VITE_BACKEND_URL}/api/user/deleteBranch/${
          branches[deletableBranch]._id
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

  const onDeleteClicked = (index) => {
    setDeleteModal(true);
    setDeletableBranch(index);
  };

  const onEditClicked = (index) => {
    setEditableBranch(index);
    setEditBranchModal(true);
  };

  return (
    <div>
      <ConfirmModal
        show={deleteModal}
        setShow={setDeleteModal}
        text="Are your sure your want to delete this user"
        onYesClicked={onDeleteModalYesClicked}
        onNoClicked={onDeleteModalNoClicked}
      />
      {branches[editableBranch] && (
        <EditBranchModal
          show={editBranchModal}
          setShow={setEditableBranch}
          branch={branches[editableBranch]}
          loading={loading}
          setLoading={setLoading}
          setAlert={setAlert}
          key={editableBranch}
        />
      )}
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white font-['Baloo 2'] ">
        Branches
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        Here are all the braches assosciated with Nyenyezi
      </p>

      {loading && <Spinner />}
      {alert && <Alert text={alert} />}
      <div className="grid gap-6 mb-6 md:grid-cols-4">
        {branches.map((branch, index) => {
          return (
            <BranchCard
              name={branch.name}
              key={index}
              onDeleteClicked={() => {
                onDeleteClicked(index);
              }}
              onEditClicked={() => {
                onEditClicked(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

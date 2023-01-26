import { Button, Modal } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ConfirmModal(props) {
  return (
    <div>
      <Modal
        show={props.show}
        size="md"
        popup={true}
        onClose={() => {
          props.setShow(false);
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {props.text}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={props.onYesClicked}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={props.onNoClicked}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

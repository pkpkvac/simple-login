import React, { useState } from "react";
// import Check from '../../public/images/check.png'
import classes from "./Modal.module.css";

const Modal = (props) => {
  const [success, setSuccess] = useState("");

  let Display;

  const SuccessMessage = () => (
    <div style={{ padding: 50 }}>
      <h3 style={{ color: "green" }}>SUCCESSFUL UPLOAD</h3>
    </div>
  );
  const ErrorMessage = () => (
    <div style={{ padding: 50 }}>
      <h3 style={{ color: "red" }}>FAILED UPLOAD</h3>
      <span style={{ color: "red", backgroundColor: "black" }}>ERROR: </span>
      <br />
    </div>
  );

  if (props.success) {
    Display = SuccessMessage;
    console.log(" GO11T :" + props.success);
  } else {
    Display = ErrorMessage;
  }

  if (!props.show) {
    return null;
  }

  return (
    <div className={classes.modal} onClick={props.onCloseModal}>
      <div
        className={classes["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes["modal-header"]}>
          <h4 className={classes["modal-title"]}>
            {props.success ? "SUCCESSFUL UPLOAD" : "DAMN"}
          </h4>
        </div>
        <div className={classes["modal-body"]}>
          <Display />
        </div>
        <div className={classes["modal-footer"]}>
          {/* <button onClick={props.onCloseModal} className={classes["button"]}>
            Close
          </button> */}

          <button onClick={props.onCloseModal} class={classes.button}>
            Upload More Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

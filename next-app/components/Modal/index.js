import React from 'react';
import classes from './Modal.module.css';

const Modal = (props) => {
  let Display;

  const SuccessMessage = () => (
    <div style={{ padding: 50 }}>
      <h3 style={{ color: 'green', textAlign: 'center', fontWeight: '600' }}>
        SUCCESSFUL UPLOAD
      </h3>
    </div>
  );
  const ErrorMessage = () => (
    <div style={{ padding: 50 }}>
      <h3 style={{ color: 'red', textAlign: 'center', fontWeight: '600' }}>
        FAILED UPLOAD
      </h3>
    </div>
  );

  if (props.success) {
    Display = SuccessMessage;
  } else {
    Display = ErrorMessage;
  }

  if (!props.show) {
    return null;
  }

  return (
    <div className={classes.modal} onClick={props.onCloseModal}>
      <div
        className={classes['modal-content']}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes['modal-header']}>
          <h4 className={classes['modal-title']}>
            {props.success
              ? 'SUCCESSFUL UPLOAD'
              : 'TELL MEHDI-O TO CALL HIS DEV'}
          </h4>
        </div>
        <div className={classes['modal-body']}>
          <Display />
        </div>
        <div className={classes['modal-footer']}>
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

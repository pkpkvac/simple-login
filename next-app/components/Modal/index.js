import React from "react";
import ReactDOM from "react-dom";
import VideocamIcon from "@material-ui/icons/Videocam";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import IconButton from "@material-ui/core/IconButton";
import Upload from "../Upload";

const Modal = ({ isShowing, hide }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <p>Hello, I'm a modal.</p>
              {/* https://www.geeksforgeeks.org/how-to-create-a-upload-file-button-in-reactjs/ */}
              <input type="file" accept="image/*" style={{ display: "none" }} />
              <label htmlFor="contained-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <VideocamIcon fontSize="large" />
                </IconButton>
              </label>
              <input type="file" accept="image/*" style={{ display: "none" }} />

              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                style={{ display: "none" }}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PublishIcon />
                </IconButton>
              </label>
              <Button variant="contained" color="primary" component="span">
                Save
              </Button>
              <Upload></Upload>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;

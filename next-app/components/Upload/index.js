import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Upload = (props) => {
  // change to function component
  let uploadInput;
  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(false);
  const [fileSelected, setfileSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (ev) => {
    setSuccess(false);
    setUrl("");
    setfileSelected(true);
  };

  const handleUpload = (ev) => {
    setLoading(true);
    let file = uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = uploadInput.files[0].name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    axios
      .post("/api/fileupload", {
        fileName: fileName,
        fileType: fileType,
        weddingID: props.weddingID,
      })
      .then((response) => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        setUrl(url);

        var options = {
          headers: {
            "Content-Type": fileType,
          },
        };
        axios
          .put(signedRequest, file, options)
          .then((result) => {
            props.onFileUpload(true);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            props.onFileUpload(false);
          });
      })
      .catch((err) => {
        setLoading(false);
        props.onFileUpload(false);
      });
  };

  const RenderSpinner = () => (
    <div>
      <p>Loading...</p> <CircularProgress />
    </div>
  );

  const SuccessMessage = () => (
    <div style={{ padding: 50 }}>
      <h3 style={{ color: "green" }}>SUCCESSFUL UPLOAD</h3>
      {/* <a href={url}>Access the file here</a> */}
      <br />
    </div>
  );
  const ErrorMessage = () => (
    <div style={{ padding: 50 }}>
      <h3 style={{ color: "red" }}>FAILED UPLOAD</h3>
      <span style={{ color: "red", backgroundColor: "black" }}>ERROR: </span>
      <span>{errorMessage}</span>
      <br />
    </div>
  );
  const classes = useStyles();

  return (
    <div className="Upload">
      <center>
        <p>Upload a file</p>

        {/* <div>{JSON.stringify(props.prompt.label)}</div> */}

        <div>{loading ? <RenderSpinner /> : null}</div>

        <div>{success ? <SuccessMessage /> : null}</div>
        {/* <div>{success ? { toggle } : null}</div> */}

        <div>{error ? <ErrorMessage /> : null}</div>

        <input
          onChange={handleChange}
          ref={(ref) => {
            uploadInput = ref;
          }}
          type="file"
          style={{ display: "inline", marginBottom: "25px" }}
        />

        <br />

        <a
          class="btn-upload"
          onClick={handleUpload}
          style={{ display: fileSelected ? "inline" : "none" }}
        >
          Upload
        </a>
      </center>
    </div>
  );
};

export default Upload;

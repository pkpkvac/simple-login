import React, { Component, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

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
  const [errorMessage, seterrorMessage] = useState(null);
  const [fileSelected, setfileSelected] = useState(false);

  const handleChange = (ev) => {
    setSuccess(false);
    setUrl("");
    setfileSelected(true);
  };

  console.log(props.prompt);

  const handleUpload = (ev) => {
    let file = uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = uploadInput.files[0].name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");

    // *** will need to add a promise here for SendGrid API as well, also, change code to use fetch instead of axios

    axios
      .post("http://localhost:3001/sign_s3", {
        fileName: fileName,
        fileType: fileType,
        //weddingID (to generate s3 folder in the bucket)
      })
      .then((response) => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        setUrl(url);
        console.log("Recieved a signed request " + signedRequest);

        var options = {
          headers: {
            "Content-Type": fileType,
          },
        };
        axios
          .put(signedRequest, file, options)
          .then((result) => {
            console.log("Response from s3");
            setSuccess(true);
          })
          .catch((error) => {
            alert("ERROR " + JSON.stringify(error));
          });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

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
        <h1>Upload a file</h1>

        <div>{JSON.stringify(props.prompt.label)}</div>

        <div>{success ? <SuccessMessage /> : null}</div>

        <div>{error ? <ErrorMessage /> : null}</div>

        <input
          onChange={handleChange}
          ref={(ref) => {
            uploadInput = ref;
          }}
          type="file"
          style={{ display: props.prompt.label ? "inline" : "none" }}
        />

        {/* <input
          color="primary"
          accept="image/*"
          type="file"
          onChange={handleChange}
          id="icon-button-file"
          style={{ display: "none" }}
        /> */}
        <br />
        {/* <button onClick={handleUpload}>UPLOAD</button> */}

        <Button
          onClick={handleUpload}
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
          style={{
            display:
              props.prompt.label !== undefined && fileSelected
                ? "inline"
                : "none",
          }}
        >
          Upload
        </Button>
      </center>
    </div>
  );
};

// class Upload extends Component {
//   // change to function component
//   constructor(props) {
//     super(props);
//     this.state = {
//       success: false,
//       url: "",
//       error: false,
//       errorMessage: "",
//     };
//   }

//   handleChange = (ev) => {
//     this.setState({ success: false, url: "" });
//   };
//   handleUpload = (ev) => {
//     let file = this.uploadInput.files[0];
//     // Split the filename to get the name and type
//     let fileParts = this.uploadInput.files[0].name.split(".");
//     let fileName = fileParts[0];
//     let fileType = fileParts[1];
//     console.log("Preparing the upload");

//     // *** will need to add a promise here for SendGrid API as well, also, change code to use fetch instead of axios

//     axios
//       .post("http://localhost:3001/sign_s3", {
//         fileName: fileName,
//         fileType: fileType,
//         //weddingID (to generate s3 folder in the bucket)
//       })
//       .then((response) => {
//         var returnData = response.data.data.returnData;
//         var signedRequest = returnData.signedRequest;
//         var url = returnData.url;
//         this.setState({ url: url });
//         console.log("Recieved a signed request " + signedRequest);

//         var options = {
//           headers: {
//             "Content-Type": fileType,
//           },
//         };
//         axios
//           .put(signedRequest, file, options)
//           .then((result) => {
//             console.log("Response from s3");
//             this.setState({ success: true });
//           })
//           .catch((error) => {
//             alert("ERROR " + JSON.stringify(error));
//           });
//       })
//       .catch((error) => {
//         alert(JSON.stringify(error));
//       });
//   };

//   render() {
//     const SuccessMessage = () => (
//       <div style={{ padding: 50 }}>
//         <h3 style={{ color: "green" }}>SUCCESSFUL UPLOAD</h3>
//         <a href={this.state.url}>Access the file here</a>
//         <br />
//       </div>
//     );
//     const ErrorMessage = () => (
//       <div style={{ padding: 50 }}>
//         <h3 style={{ color: "red" }}>FAILED UPLOAD</h3>
//         <span style={{ color: "red", backgroundColor: "black" }}>ERROR: </span>
//         <span>{this.state.errorMessage}</span>
//         <br />
//       </div>
//     );
//     return (
//       <div className="Upload">
//         <center>
//           <h1>Upload a file</h1>

//           <div>{JSON.stringify(this.props.prompt.label)}</div>

//           <div>{this.state.success ? <SuccessMessage /> : null}</div>

//           <div>{this.state.error ? <ErrorMessage /> : null}</div>

//           <input
//             onChange={this.handleChange}
//             ref={(ref) => {
//               this.uploadInput = ref;
//             }}
//             type="file"
//           />
//           <br />
//           <button onClick={this.handleUpload}>UPLOAD</button>
//         </center>
//       </div>
//     );
//   }
// }

export default Upload;

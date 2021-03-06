import React, { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    setUrl('');
    setfileSelected(true);
  };

  const handleUpload = (ev) => {
    setLoading(true);
    let file = uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    axios
      .post('/api/fileupload', {
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
            'Content-Type': fileType,
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
      <h3 style={{ color: 'green' }}>SUCCESSFUL UPLOAD</h3>
      {/* <a href={url}>Access the file here</a> */}
      <br />
    </div>
  );
  const ErrorMessage = () => (
    <div style={{ padding: 50 }}>
      <h3 style={{ color: 'red' }}>FAILED UPLOAD</h3>
      <span style={{ color: 'red', backgroundColor: 'black' }}>ERROR: </span>
      <span>{errorMessage}</span>
      <br />
    </div>
  );

  return (
    <div className='Upload'>
      <center>
        <div>{loading ? <RenderSpinner /> : null}</div>

        <div>{success ? <SuccessMessage /> : null}</div>

        <div>{error ? <ErrorMessage /> : null}</div>

        <input
          onChange={handleChange}
          ref={(ref) => {
            uploadInput = ref;
          }}
          type='file'
          style={{ display: 'inline', marginBottom: '25px' }}
        />

        <br />

        <a
          class='btn-upload'
          onClick={handleUpload}
          style={{ display: fileSelected ? 'inline' : 'none' }}
        >
          Upload
        </a>
      </center>
    </div>
  );
};

export default Upload;

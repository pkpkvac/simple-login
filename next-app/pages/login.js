import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    //call api
    fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        if (data && data.error) {
          setLoginError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set("token", data.token, { expires: 2 });
          Router.push("/");
        }
      });
  }
  return (
    <center>
      {/* <form onSubmit={handleSubmit}> */}
      {/* <p>Login</p> */}
      <div>
        <TextField
          id="outlined-basic"
          label="email"
          variant="outlined"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="password"
          variant="outlined"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}

      {/* <Button
          onClick={handleUpload}
          variant="contained"
          color="secondary"
          className={classes.button}
          
          style={{
            display:
              props.prompt.label !== undefined && fileSelected
                ? "inline"
                : "none",
          }}
        >
          Upload
        </Button> */}

      <Button
        onClick={handleSubmit}
        type="submit"
        value="Submit"
        variant="contained"
        color="secondary"
      >
        Login
      </Button>
      {/* <input type="submit" value="Submit" /> */}
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      {/* </form> */}
    </center>
  );
};

export default Login;

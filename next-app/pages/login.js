import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../pages/_app";
import Footer from "../components/Footer/Footer";

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
    <div class="login-div">
      <section class="section-steps">
        <div class="row">
          <h4>How it works &mdash; Simple as 1, 2, 3</h4>
        </div>
        <div class="row">
          <div class="col span-1-of-2 steps-box">
            <img src="../images/app-iPhone.png" class="app-screen" />
          </div>
          <div class="col span-1-of-2 steps-box">
            <div class="works-step">
              <div>1</div>
              <p>
                Think of a good story, try to keep it under 5 minutes. If you
                need inspiration, look at our Prompts section on the next page
              </p>
            </div>
            <div class="works-step">
              <div>2</div>
              <p>
                Record your story using your phone, your camera, or use our
                online service to connect directly to your phone
              </p>
            </div>
            <div class="works-step">
              <div>3</div>
              <p>
                Login and upload the story you recorded from the previous step.
                Feel free to attach photos related to the story
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="section-login">
        {/* <form onSubmit={handleSubmit}> */}
        {/* <p>Login</p> */}

        <div class="row">
          <TextField
            style={{ marginBottom: "10px" }}
            id="outlined-basic"
            label="email"
            variant="outlined"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="row">
          <TextField
            style={{ marginBottom: "10px" }}
            id="outlined-basic"
            label="password"
            variant="outlined"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="row">
          <Button
            onClick={handleSubmit}
            type="submit"
            value="Submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          {/* <input type="submit" value="Submit" /> */}
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          {/* </form> */}
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
      </section>
      <Footer />
    </div>
  );
};

export default Login;

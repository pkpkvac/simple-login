import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";

// This will be the admin page, and  will not have a visible anchor ; will access via /admin ; here we will create new users to add to the DB

const Signup = () => {
  const [signupError, setSignupError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log("signup" + data);
        if (data && data.error) {
          setSignupError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set("token", data.token, { expires: 2 });
          Router.push("/");
        }
      });
  }
  return (
    <>
      <div className="imperator-div">
        <img className="imperator" src="/images/the-imperator.jpg"></img>
        <form onSubmit={handleSubmit}>
          <p>Sign Up</p>
          <label htmlFor="email">
            wedding id
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="text"
            />
          </label>

          <br />

          <label for="password">
            password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
            />
          </label>

          <br />

          <input type="submit" value="Submit" />
          {signupError && <p style={{ color: "red" }}>{signupError}</p>}
        </form>
      </div>
    </>
  );
};

export default Signup;

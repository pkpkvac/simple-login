import { useState } from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import Link from "next/link";
import cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import "../pages/_app";
import EmbeddedVideo from "../components/EmbeddedVideo";
import Prompt, { selectedOption } from "../components/Prompts";
import Modal from "../components/Modal";
import useModal from "./useModal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Upload from "../components/Upload";

function Home() {
  const { isShowing, toggle } = useModal();
  const [prompt, setPrompt] = useState("test");

  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }

  return (
    <div>
      <center>
        <Head>
          <title>Story Tree</title>

          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <h1>Story Tree</h1>
      </center>
      <h2></h2>
      {loggedIn && (
        <>
          {/* <div>
            <TextField id="outlined-basic" label="Name" variant="outlined" />
          </div> */}

          <div>
            <Prompt setPrompt={setPrompt} />
          </div>

          {/* <div>{JSON.stringify(prompt.label)}</div> */}

          <Upload prompt={prompt} />

          <div>
            <Button
              onClick={() => {
                cookie.remove("token");
                revalidate();
              }}
              variant="contained"
              color="secondary"
            >
              Logout
            </Button>
          </div>
          {/* <div className="Home">
            <button className="button-default" onClick={toggle}>
              Select
            </button>
            <Modal isShowing={isShowing} hide={toggle} />
          </div> */}
        </>
      )}
      {!loggedIn && (
        <>
          <EmbeddedVideo name="none" />
          <div>
            <Link href="/login">
              <Button variant="contained" color="primary">
                Login
              </Button>
            </Link>
          </div>
          {/* <div>
            <Link href="/signup">
              <Button variant="contained" color="primary">
                Signup
              </Button>
            </Link>
          </div> */}
        </>
      )}

      {/* {loggedIn && (
        <>
           
          <p>Welcome {data.email}!</p>
          <button
            onClick={() => {
              cookie.remove("token");
              revalidate();
            }}
          >
            Logout
          </button>
        </>
      )}
      {!loggedIn && (
        <>
          <Link href="/login">Login</Link>
          
        </>
      )} */}
    </div>
  );
}
{
  /* loggedIn && skipIntro && (<> .... </>) */
}

export default Home;

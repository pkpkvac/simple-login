import Head from "next/head";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import Link from "next/link";
import cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import EmbeddedVideo from "../components/EmbeddedVideo/index.js";
import Prompt from "../components/Prompts";

// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }

function Home() {
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
      <Head>
        <title>H & V main page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>Story Tree</h1>

      <h2></h2>
      {loggedIn && (
        <>
          <button
            onClick={() => {
              cookie.remove("token");
              revalidate();
            }}
          >
            Logout
          </button>

          <div>
            <Prompt />
          </div>
        </>
      )}
      {!loggedIn && (
        <>
          <EmbeddedVideo name="none" />
          <div>
            <Link href="/login">Login</Link>
          </div>
          <div>
            <Link href="/signup">Signup</Link>
          </div>
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

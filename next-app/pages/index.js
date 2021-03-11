import Head from "next/head";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import Link from "next/link";
import cookie from "js-cookie";
import { Redirect } from "react-router-dom";

function Home() {
  let state = {
    redirect: false,
  };
  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
    state.redirect = true;
  }
  return (
    <div>
      <Head>
        <title>H & V main page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>H & V login</h1>

      <h2></h2>
      {loggedIn && (
        <>
          {/* {state.redirect ? <Redirect push to="/signup" /> : null} */}
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
          {/* <p>or</p>
          <Link href="/signup">Sign Up</Link> */}
        </>
      )}
    </div>
  );
}

export default Home;

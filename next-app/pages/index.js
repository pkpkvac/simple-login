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
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Upload from "../components/Upload";
import { BiBrain } from "react-icons/bi";
import { BiCameraMovie } from "react-icons/bi";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { GiFairyWand } from "react-icons/gi";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

import Footer from "../components/Footer/Footer";

function Home() {
  const [prompt, setPrompt] = useState("");

  //will likely have to manage the state here between the views:
  //1. SelectView - contains lightbulb
  //2. UploadView - have the select box & upload & RenderSpinner
  //3. SuccessView - img, 2 buttons (logout, upload again)

  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }

  const slides = [
    { title: ["I shouldn't tell this story at a wedding, but ..."] },
    { title: ["Most embarassing story of the groom/bride I know"] },
    { title: ["Funniest travel story"] },
    { title: ["Funniest prank story"] },
  ];

  return (
    <div>
      {/* <center>
        <Head>
          <title>Story Tree</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
      </center> */}

      {loggedIn && (
        <>
          <body>
            <section class="section-slider">
              <div class="row">
                <Slider className="slider">
                  {slides.map((slide, index) => (
                    <div key={index}>
                      <h5>{slide.title}</h5>
                      {/* <div>{[...slide.description].join("<br>")}</div> */}
                    </div>
                  ))}
                </Slider>
              </div>
            </section>

            {/* <div>
            <TextField id="outlined-basic" label="Name" variant="outlined" />
          </div> */}

            {/* <div>
            <Prompt setPrompt={setPrompt} />
          </div> */}

            {/* <div>{JSON.stringify(prompt.label)}</div> */}

            <Upload prompt={prompt} />

            <section>
              <center>
                <Button
                  onClick={() => {
                    cookie.remove("token");
                    revalidate();
                  }}
                  variant="contained"
                  color="secondary"
                  style={{ textAlign: "center" }}
                >
                  Logout
                </Button>
              </center>
            </section>
          </body>
        </>
      )}
      {!loggedIn && (
        <>
          <header>
            <nav>
              <div class="row">
                <img
                  src="/images/logo-circular.png"
                  alt="Storytree logo"
                  class="logo"
                />

                <ul class="main-nav">
                  <li>
                    <a href="/login">Login</a>
                  </li>
                  <li>
                    <a href="#">How it works</a>
                  </li>
                  <li>
                    <a href="#">Ideas</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </div>
            </nav>

            <div class="hero-text-box">
              <h1>
                Share the stories <br /> that brought you here
              </h1>
              {/* <Link href="/login">Login</Link> */}

              <a class="btn btn-full" href="/login">
                Login
              </a>
              <a class="btn btn-ghost" href="#">
                Explain
              </a>
            </div>

            {/* <div className="film__container">
                <div className="film__box">
                  <EmbeddedVideo />
                </div>
              </div>

              <div>
                <a class="btn btn-login" href="/login">
                  Login
                </a>
              </div>
               */}
          </header>
          <body>
            <section class="section-features">
              <div class="row">
                <h2>Share stories &mdash; Share memories</h2>
                <p class="long-copy">
                  Hello, we’d like to encourage you to share your funniest,
                  dorkiest, cringest, and most important moments about your
                  beloved couple
                </p>
              </div>

              <div class="row">
                <div class="col span-1-of-4 box">
                  <h3>Brainstorm a tale</h3>
                  <BiBrain color="#24a058" size="3em" />
                  <p>
                    Think of a good story, try to keep it under 5 minutes. If
                    you need inspiration, look at our Prompts section
                  </p>
                </div>
                <div class="col span-1-of-4 box">
                  <h3>Record your story</h3>
                  <BiCameraMovie color="#24a058" size="3em" />
                  <p>
                    Record your story using your phone, your camera, or use our
                    online service to connect directly to your phone
                  </p>
                </div>
                <div class="col span-1-of-4 box">
                  <h3>Upload your story</h3>
                  <HiOutlineCloudUpload color="#24a058" size="3em" />
                  <p>
                    Login and upload the story you recorded from the previous
                    step. Feel free to attach photos related to the story
                  </p>
                </div>
                <div class="col span-1-of-4 box">
                  <h3>Wait for it ...</h3>
                  <GiFairyWand color="#24a058" size="3em" />
                  <p>
                    Wait for Mehdi to work his editing magic, and on the day of
                    the wedding, see your story told!
                  </p>
                </div>
              </div>
            </section>
          </body>
        </>
      )}
      <Footer />
    </div>
  );
}
{
  /* loggedIn && skipIntro && (<> .... </>) */
}

export default Home;

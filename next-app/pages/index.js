import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import { Link } from 'react-scroll';
import cookie from 'js-cookie';
import '../pages/_app';
import Upload from '../components/Upload';
import { BiBrain } from 'react-icons/bi';
import { BiCameraMovie } from 'react-icons/bi';
import { HiOutlineCloudUpload } from 'react-icons/hi';
import { GiFairyWand } from 'react-icons/gi';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import Modal from '../components/Modal';
import Footer from '../components/Footer/Footer';

function Home() {
  const [prompt, setPrompt] = useState('');
  const [showModal, setShowModal] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  // Maybe use a ref for the showModal if you have problems

  const { data, revalidate } = useSWR('/api/me', async function (args) {
    const res = await fetch(args);
    return res.json();
  });
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }

  const fileUploadHandler = (uploadStatus) => {
    setUploadStatus(uploadStatus);
    setShowModal(true);
  };

  const slides = [
    { title: ["I shouldn't tell this story at a wedding, but ..."] },
    { title: ['Most embarassing story of the groom/bride I know'] },
    { title: ['Funniest travel story'] },
    { title: ['Funniest prank story'] },
  ];

  return (
    <div>
      {loggedIn && (
        <>
          <section class='header-lite'>
            <nav>
              <div class='row'>
                <img
                  src='/images/logo-circular.png'
                  alt='Storytree logo'
                  class='logo'
                />

                <a
                  class='btn-logout'
                  onClick={() => {
                    cookie.remove('token');
                    revalidate();
                  }}
                >
                  Logout
                </a>
              </div>
            </nav>
          </section>

          <body>
            <section class='section-slider'>
              <div class='row'>
                <Slider className='slider'>
                  {slides.map((slide, index) => (
                    <div key={index}>
                      <h5>{slide.title}</h5>
                    </div>
                  ))}
                </Slider>
              </div>
            </section>

            <Upload
              weddingID={data.email}
              onFileUpload={fileUploadHandler}
              prompt={prompt}
            />
            <Modal
              onCloseModal={() => setShowModal(false)}
              show={showModal}
              success={uploadStatus}
            />
            <section>
              <center></center>
            </section>
          </body>
        </>
      )}
      {!loggedIn && (
        <>
          <header>
            <nav>
              <div class='row box'>
                <div class='col span-1-of-2 box'>
                  <img
                    src='/images/logo-circular.png'
                    alt='Storytree logo'
                    class='logo'
                  />
                </div>
                <div class='col span-1-of-2 box'>
                  <ul class='main-nav'>
                    <li>
                      <a href='/login'>Login</a>
                    </li>
                    <li>
                      <Link
                        className='Link'
                        to='how-it-works'
                        spy={true}
                        smooth={true}
                      >
                        HOW IT WORKS
                      </Link>
                    </li>
                    {/* <li>
                      <a href='#'>Ideas</a>
                    </li> */}
                    <li>
                      <a href='https://www.hereandvowstudio.com/book-meeting'>
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div class='hero-text-box'>
              <h1>
                Share the stories <br /> that brought you here
              </h1>

              <a class='btn btn-full' href='/login'>
                Login
              </a>
              <Link className='Link' to='how-it-works' spy={true} smooth={true}>
                <a class='btn btn-ghost' href='#'>
                  Explain
                </a>
              </Link>
            </div>
          </header>
          <body>
            <section id='how-it-works' class='section-features'>
              <div class='row'>
                <h2>Share stories &mdash; Share memories</h2>
                <p class='long-copy'>
                  Hello, we’d like to encourage you to share your funniest,
                  dorkiest, cringest, and most important moments about your
                  beloved couple
                </p>
              </div>

              <div class='row'>
                <div class='col span-1-of-4 box'>
                  <h3>Brainstorm a tale</h3>
                  <BiBrain color='#24a058' size='3em' />
                  <p>
                    Think of a good story, try to keep it under 5 minutes. If
                    you need inspiration, look at our Prompts section
                  </p>
                </div>
                <div class='col span-1-of-4 box'>
                  <h3>Record your story</h3>
                  <BiCameraMovie color='#24a058' size='3em' />
                  <p>
                    Record your story using your phone, your camera, or use our
                    online service to connect directly to your phone
                  </p>
                </div>
                <div class='col span-1-of-4 box'>
                  <h3>Upload your story</h3>
                  <HiOutlineCloudUpload color='#24a058' size='3em' />
                  <p>
                    Login and upload the story you recorded from the previous
                    step. Feel free to attach photos related to the story
                  </p>
                </div>
                <div class='col span-1-of-4 box'>
                  <h3>Wait for it ...</h3>
                  <GiFairyWand color='#24a058' size='3em' />
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

export default Home;

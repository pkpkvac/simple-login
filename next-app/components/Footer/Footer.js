import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div class="row">
        <div class="col span-1-of-2">
          <ul class="footer-nav">
            <li>
              <a href="https://www.hereandvowstudio.com/about">About us</a>
            </li>
          </ul>
        </div>
        <div class="col span-1-of-2">
          <ul class="social-links">
            <li>
              <a href="#">
                <i class="ion-social-facebook"></i>
                <FaFacebook />
              </a>
            </li>
            <li>
              <a href="#">
                <i class="ion-social-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <p>Copyright &copy; 2021 by Storytree. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

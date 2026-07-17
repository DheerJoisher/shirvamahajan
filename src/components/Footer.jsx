import {
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FaY } from "react-icons/fa6";
import './Footer.css';

function Footer() {
  const scrollToSection = (event, href) => {
    event.preventDefault();
    document
      .querySelector(href)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="social-icons">
          <a href="https://www.youtube.com/@ShirvaSetu" aria-label="Youtube">
            <FaYoutube />
          </a>

          <a href="mailto:contact@shirvamahajan.org" aria-label="Email">
            <FaEnvelope />
          </a>

          <a href="tel:+919876543210" aria-label="Phone">
            <FaPhoneAlt />
          </a>
        </div>

        <h3 className="footer-title">Shri Shirva Bhanushali Mahajan Trust</h3>

        <p className="footer-tagline">
          Preserving Heritage • Serving the Community
        </p>

        <ul className="footer-nav">
          <li>
            <a href="#about" onClick={(e) => scrollToSection(e, "#about")}>
              About
            </a>
          </li>

          <li>
            <a href="#history" onClick={(e) => scrollToSection(e, "#history")}>
              History
            </a>
          </li>

          <li>
            <a
              href="#committee"
              onClick={(e) => scrollToSection(e, "#committee")}
            >
              Committee
            </a>
          </li>

          <li>
            <a
              href="#donation"
              onClick={(e) => scrollToSection(e, "#donation")}
            >
              Donation
            </a>
          </li>

          <li>
            <a href="mailto:contact@shirvamahajan.org">Contact</a>
          </li>
        </ul>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Shri Shirva Bhanushali Mahajan Trust. All
          Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

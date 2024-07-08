import React from "react";
import instagram from "./imgs/drustvene-mreze/logo-instagram.png";
import facebook from "./imgs/drustvene-mreze/logo-facebook.png";
import twitter from "./imgs/drustvene-mreze/logo-twitter.png";
import linkedin from "./imgs/drustvene-mreze/logo-linkedin.png";
import logo from "./imgs/logo.png";

export default function Footer({ setIsOpenOverlay }) {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="flex-column">
          <h2 className="footer-heading">
            Olakšajte sebi svakodnevnicu. Najbolji trenutak za pridruživanje
            našoj porodici je upravo sada.
          </h2>
          <div className="btn-footer-wrapper">
            <a href="#otvori-nalog">
              <button className="btn btn-footer">Učlani se besplatno</button>
            </a>
          </div>
        </div>

        <div className="flex-column" id="kontaktirajte-nas">
          <div className="footer-socials">
            <div className="socials-wrapper">
              <img
                src={instagram}
                alt="Instagram logo"
                className="footer-logo"
              />
            </div>
            <div className="socials-wrapper">
              <img src={facebook} alt="Facebook logo" className="footer-logo" />
            </div>
            <div className="socials-wrapper">
              <img src={twitter} alt="Twitter logo" className="footer-logo" />
            </div>
            <div className="socials-wrapper">
              <img src={linkedin} alt="LinkedIn logo" className="footer-logo" />
            </div>
          </div>

          <nav className="nav-footer">
            <ul className="nav-links-footer">
              <li>
                <a href="#o-nama" className="nav-link-footer">
                  O nama
                </a>
              </li>
              <li>
                <a href="#features" className="nav-link-footer">
                  Funkcionalnosti
                </a>
              </li>
              <li>
                <a href="#otvori-nalog" className="nav-link-footer">
                  Otvori nalog
                </a>
              </li>
              <li>
                <span
                  className="nav-link-footer"
                  onClick={() => setIsOpenOverlay(true)}
                >
                  Uloguj se
                </span>
              </li>
            </ul>
          </nav>
        </div>

        <div className="banner">
          <img
            src={logo}
            alt="Logo Bankar komanije"
            className="banner-logo"
            onClick={() => window.scrollTo(0, 0)}
          />
        </div>
      </div>
    </footer>
  );
}

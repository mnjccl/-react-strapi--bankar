import React from "react";
import logo from "./imgs/logo.png";
import hero from "./imgs/hero-img.png";
import korisnik1 from "./imgs/korisnici/korisnik-1.jpg";
import korisnik2 from "./imgs/korisnici/korisnik-2.jpg";
import korisnik3 from "./imgs/korisnici/korisnik-3.jpg";
import korisnik4 from "./imgs/korisnici/korisnik-4.jpg";
import korisnik5 from "./imgs/korisnici/korisnik-5.jpg";

export default function Hero(props) {
  return (
    <>
      <Header setIsOpenOverlay={props.setIsOpenOverlay} />
      <section className="hero-section">
        <div className="hero-wrapper hero-left-wrapper">
          <div className="hero-content">
            <h1 className="heading-hero">
              <strong>Registruj se</strong> i vrši transfer novca
              <strong> bilo gdje</strong>.
            </h1>
            <p>
              Najbolja domaća online platforma za digitalno bankarstvo. Sa nama
              se osjećate kao kod kuće.
            </p>
            <div className="hero-btns">
              <a href="#otvori-nalog" className="btn btn-start">
                Započni odmah
              </a>
              <a href="#o-nama" className="btn btn-learn-more">
                Saznaj više &darr;
              </a>
            </div>
          </div>
        </div>
        <div className="hero-wrapper">
          <img src={hero} alt="Mobile banking" className="hero-img" />
        </div>
        <div className="korisnici-wrapper">
          <div className="korisnici">
            <img src={korisnik1} alt="Slika korisnika" />
            <img src={korisnik2} alt="Slika korisnika" />
            <img src={korisnik3} alt="Slika korisnika" />
            <img src={korisnik4} alt="Slika korisnika" />
            <img src={korisnik5} alt="Slika korisnika" />
          </div>
          <p>
            <strong>10,000+</strong> zadovoljnih korisnika
          </p>
        </div>
      </section>
    </>
  );
}

function Header({ setIsOpenOverlay }) {
  return (
    <header className="header">
      <div className="banner">
        <img src={logo} alt="Logo kompanije Bankar" className="banner-logo" />
        <h1 className="banner-text">Bankar</h1>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <a href="#o-nama" className="nav-link">
              O nama
            </a>
          </li>
          <li>
            <a href="#features" className="nav-link">
              Funkcionalnosti
            </a>
          </li>
          <li>
            <a href="#otvori-nalog" className="nav-link">
              Otvori nalog
            </a>
          </li>
          <li>
            <button
              className="btn nav-link-btn"
              onClick={() => setIsOpenOverlay(true)}
            >
              Uloguj se
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

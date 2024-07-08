import React, { useReducer, useRef } from "react";
import axios from "axios";

const InitialState = {
  username: "",
  birthday: "",
  gender: "Z",
  email: "",
  password: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "saveName":
      return {
        ...state,
        username: action.payload,
      };
    case "saveBirthday":
      return {
        ...state,
        birthday: action.payload,
      };
    case "saveGender":
      return {
        ...state,
        gender: action.payload,
      };
    case "saveEmail":
      return {
        ...state,
        email: action.payload,
      };
    case "savePassword":
      return {
        ...state,
        password: action.payload,
      };
    case "reset": {
      return InitialState;
    }
    default:
      return state;
  }
}

const starost = function (birthday) {
  const datum = new Date();
  const rodjendan = new Date(birthday);
  const godine = datum.getFullYear() - rodjendan.getFullYear();
  const mjeseci = datum.getMonth() - rodjendan.getMonth();
  if (mjeseci < 0 || (mjeseci === 0 && datum.getDate() < rodjendan.getDate()))
    return godine - 1;
  return godine;
};

function Form() {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const inputs = useRef([]);
  inputs.current = document.querySelectorAll("input");

  const handleSubmit = async function (e) {
    e.preventDefault();

    const godine = starost(state.birthday);
    if (godine < 18) {
      alert("Morate biti stariji od 18 godina da biste se registrovali. 😁");
      return;
    }

    const url = "http://localhost:1337/api/auth/local/register";

    try {
      const response = await axios.post(url, state);

      if (response.status === 400)
        throw new Error("E-mail ili lozinka su zauzeti. Probajte ponovo. 🚫");

      if (response.status === 200)
        alert(
          "Čestitamo! Uspješno ste otvorili vaš račun. Sada se prijavite u aplikaciju i transferujte vaš novac bilo gdje! 🌍"
        );

      inputs.current.forEach((input) => (input.value = ""));
    } catch (err) {
      console.error(err);
      alert(err);
      inputs.current.forEach((input) => (input.value = ""));
    }
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <div className="flex-column">
        <label htmlFor="ime">Ime i prezime</label>
        <input
          type="text"
          id="ime"
          placeholder="Marija Petrovic"
          autoComplete="name"
          onChange={(e) =>
            dispatch({ type: "saveName", payload: e.target.value })
          }
          required
        />
      </div>
      <div className="flex-column">
        <label htmlFor="rodjendan">Datum rodjenja</label>
        <input
          id="rodjendan"
          type="date"
          autoComplete="bday"
          onChange={(e) =>
            dispatch({ type: "saveBirthday", payload: e.target.value })
          }
          required
        />
      </div>
      <div className="flex-column">
        <label htmlFor="pol">Pol</label>
        <select
          id="pol"
          autoComplete="sex"
          onChange={(e) =>
            dispatch({ type: "saveGender", payload: e.target.value })
          }
          required
        >
          <option value="Z">Žensko</option>
          <option value="M">Muško</option>
        </select>
      </div>
      <div className="flex-column">
        <label htmlFor="e-mail">E-mail adresa</label>
        <input
          type="email"
          id="e-mail"
          placeholder="marija@primjer.com"
          autoComplete="email"
          onChange={(e) =>
            dispatch({ type: "saveEmail", payload: e.target.value })
          }
          required
        />
      </div>
      <div className="flex-column">
        <label htmlFor="sifra">Šifra</label>
        <input
          type="password"
          id="sifra"
          placeholder="12345678"
          min={8}
          autoComplete="new-password"
          onChange={(e) =>
            dispatch({ type: "savePassword", payload: e.target.value })
          }
          required
        />
      </div>
      <button className="btn btn-form btn-sign-up">Napravi nalog</button>
    </form>
  );
}

export default function SignUp() {
  return (
    <section className="sign-up-section flex-column" id="otvori-nalog">
      <div className="heading-wrapper">
        <h6 className="heading-secondary">Napravi nalog</h6>
        <h1 className="heading-primary">
          Postani naš član još danas i iskoristi pogodnosti koje nudimo.
        </h1>
      </div>
      <div className="sign-up-container">
        <div className="sign-up-text-box flex-column">
          <h2 className="sign-up-heading">Besplatno se učlani!</h2>
          <p className="sign-up-description">
            Dozvoljeno starijima od 18 godina. Šalji novac prijateljima, uzimaj
            pozajmice bilo kad i bilo gdje uz<strong> kamatnu stopu </strong> od
            samo <strong>5%</strong>.
          </p>
          <Form />
        </div>
        <div
          className="sign-up-img"
          role="img"
          aria-label="Zadovoljna korisnica Bankar aplikacije"
        ></div>
      </div>
    </section>
  );
}

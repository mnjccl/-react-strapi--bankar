import React from "react";
import { useState, useEffect, useRef } from "react";

function AccountInfo({
  user,
  transactions,
  balance,
  setBalance,
  interestRate,
  setInterestRate,
}) {
  const [moneyIn, setMoneyIn] = useState(0);
  const [moneyOut, setMoneyOut] = useState(0);
  let vrijeme = useRef("");

  function imeKlijenta(punoIme) {
    const rijeci = punoIme.split(" ");
    if (rijeci.length > 0) {
      return rijeci[0];
    } else {
      return punoIme;
    }
  }

  function Datum() {
    const sada = new Date();

    const dan = sada.getDate().toString().padStart(2, "0");
    const mjesec = (sada.getMonth() + 1).toString().padStart(2, "0");
    const godina = sada.getFullYear();
    const sati = sada.getHours().toString().padStart(2, "0");
    const minute = sada.getMinutes().toString().padStart(2, "0");

    vrijeme.current = `${dan}/${mjesec}/${godina}, ${sati}:${minute}`;
  }

  useEffect(() => {
    let stanje = 0;
    let uplaceno = 0;
    let isplaceno = 0;
    let kamata = 0;

    transactions.forEach(function (transakcija) {
      const iznosTransakcije = transakcija.amount;
      if (iznosTransakcije > 0) {
        stanje += iznosTransakcije;
      } else {
        stanje -= Math.abs(iznosTransakcije);
      }
    });

    transactions.forEach(function (transakcija) {
      const iznosTransakcije = transakcija.amount;
      if (iznosTransakcije > 0) {
        uplaceno += iznosTransakcije;
      }
    });

    transactions.forEach(function (transakcija) {
      const iznosTransakcije = transakcija.amount;
      if (iznosTransakcije < 0) {
        isplaceno -= iznosTransakcije;
      }
    });

    transactions.forEach(function (transakcija) {
      const iznosTransakcije = transakcija.amount;
      if (transakcija.type === "loan") {
        kamata += (iznosTransakcije * 5) / 100;
      }
    });

    setBalance(stanje);
    setMoneyIn(uplaceno);
    setMoneyOut(isplaceno);
    setInterestRate(kamata);
    Datum();
  }, [transactions, setBalance, setInterestRate]);

  return (
    <div className="account-info flex-column">
      <div>
        <h2 className="app-heading">
          Zdravo <strong>{imeKlijenta(user.username)}</strong>, uživaj koristeći
          naše usluge.
        </h2>
      </div>

      <div className="balance-p">
        <p>
          Dana <span>{vrijeme.current}</span>
        </p>
        <p>
          Stanje: <strong className="balance">{balance} RSD</strong>
        </p>
      </div>
      <div className="summary">
        <p>
          Isplaćeno: <strong className="summary-red">{moneyOut} RSD</strong>
        </p>
        <p>
          Uplaćeno: <strong className="summary-green">{moneyIn} RSD</strong>
        </p>
        <p>
          Kamata: <strong className="summary-yellow">{interestRate} RSD</strong>
        </p>
      </div>
    </div>
  );
}

export default AccountInfo;

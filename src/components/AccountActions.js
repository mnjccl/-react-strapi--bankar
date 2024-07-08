import { useState, useRef } from "react";
import axios from "axios";

function AccountActions({
  user,
  balance,
  setBalance,
  setTransactions,
  setInterestRate,
  interestRate,
  resetStates,
}) {
  const [active, setActive] = useState(1);

  return (
    <div className="account-actions">
      <div className="actions flex-column">
        <ion-icon name="send-outline" onClick={() => setActive(1)}></ion-icon>
        <ion-icon
          name="cloud-download-outline"
          onClick={() => setActive(2)}
        ></ion-icon>
        <ion-icon
          name="person-remove-outline"
          onClick={() => setActive(3)}
        ></ion-icon>
      </div>
      <div className="action-display flex-column">
        {active === 1 && (
          <SendMoney
            user={user}
            balance={balance}
            setBalance={setBalance}
            setTransactions={setTransactions}
          />
        )}
        {active === 2 && (
          <TakeLoan
            user={user}
            balance={balance}
            setBalance={setBalance}
            setTransactions={setTransactions}
            setInterestRate={setInterestRate}
            interestRate={interestRate}
          />
        )}
        {active === 3 && (
          <DeleteAccount
            user={user}
            interestRate={interestRate}
            balance={balance}
            resetStates={resetStates}
          />
        )}
      </div>
    </div>
  );
}

function SendMoney({ user, balance, setBalance, setTransactions }) {
  const inputs = useRef([]);
  inputs.current = document.querySelectorAll("input");
  let korisnikId;

  async function handleSubmit(e) {
    e.preventDefault();
    const uneseniEmail = document.getElementById("korisnik").value;
    const iznos = parseFloat(document.getElementById("iznos").value);
    const url = "http://localhost:1337/api/users";

    if (uneseniEmail && iznos) {
      console.log(balance);
      if (iznos > 0) {
        try {
          const response = await axios.get(url);
          const primalac = response.data.find(
            (primalac) => primalac.email === uneseniEmail
          );

          if (primalac === undefined) {
            throw new Error(
              "Korisnik sa navedenom e-mail adresom ne postoji. Pokušajte ponovo. 🔄️"
            );
          } else {
            korisnikId = primalac.id;
            console.log(korisnikId);
          }

          if (balance > iznos) {
            await axios.post("http://localhost:1337/api/transactions", {
              data: { user_id: user.id, amount: -iznos, type: "transfer" },
            });

            await axios.post("http://localhost:1337/api/transactions", {
              data: { user_id: korisnikId, amount: iznos, type: "transfer" },
            });

            setBalance(balance - iznos);

            setTransactions((prevTransactions) => [
              ...prevTransactions,
              {
                user_id: user.id,
                amount: -iznos,
              },
            ]);
          } else {
            alert("Nemate dovoljno sredstava na računu. 🙃");
          }
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
      } else {
        alert("Iznos mora biti veći od nule. 😁");
      }
      inputs.current.forEach((input) => (input.value = ""));
    } else {
      alert("Molimo popunite prazna polja. 🙎");
    }
  }

  return (
    <>
      <h3 className="action-heading">Pošalji novac prijetalju</h3>
      <form className="action-form flex-column" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label htmlFor="korisnik">E-mail korisnika</label>
          <input type="email" id="korisnik"></input>
        </div>
        <div className="flex-column">
          <label htmlFor="iznos">Iznos</label>
          <input id="iznos" type="number"></input>
        </div>
        <button type="submit" className="btn btn-action">
          Pošalji
        </button>
      </form>
    </>
  );
}

function TakeLoan({
  user,
  setTransactions,
  setBalance,
  balance,
  interestRate,
  setInterestRate,
}) {
  const [loan, setLoan] = useState();
  const input = useRef();
  input.current = document.querySelector("input");

  async function handleSubmit(e) {
    e.preventDefault();
    const url = "http://localhost:1337/api/transactions";

    if (loan) {
      alert(
        "NAPOMENA: Kamatna stopa za pozajmicu je 5%. Ukoliko je vaše stanje na računu manje od kamate nećete moći da zatvorite vaš račun. 😊"
      );
      try {
        await axios.post(url, {
          data: { user_id: user.id, amount: loan, type: "loan" },
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Molimo da unesete željeni iznos.");
    }
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      {
        user_id: user.id,
        amount: loan,
        type: "loan",
      },
    ]);
    setBalance(balance + loan);
    setInterestRate(interestRate + (loan / 5) * 100);
    input.current.value = "";
  }

  function handleInputChange(e) {
    setLoan(+e.target.value);
  }
  return (
    <>
      <h3 className="action-heading">Digni pozajmicu </h3>
      <form className="action-form flex-column" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label htmlFor="iznos">Iznos</label>
          <input id="iznos" type="number" onChange={handleInputChange}></input>
        </div>
        <button type="submit" className="btn btn-action">
          Podigni
        </button>
      </form>
    </>
  );
}

function DeleteAccount({ user, interestRate, balance, resetStates }) {
  const handleSubmit = async function (e) {
    e.preventDefault();
    const unesenaLozinka = document.getElementById("lozinka").value;
    const url = "http://localhost:1337/api/auth/local";

    if (unesenaLozinka) {
      if (balance >= interestRate) {
        try {
          const response = await axios.post(url, {
            identifier: user.email,
            password: unesenaLozinka,
          });

          if (response.status === 200) {
            await axios.delete(`http://localhost:1337/api/users/${user.id}`);
            resetStates();
          }
        } catch (err) {
          if (err.response.status === 400) {
            document.getElementById("lozinka").value = "";
            alert("Pogriješili ste lozinku. Pokušajte ponovo. 🥲");
          } else {
            console.error(err);
          }
        }
      } else {
        alert(
          "Vaš nalog ne može biti ugašen dok imate manje novca na računu od iznosa kamate. 🤔"
        );
      }
    } else {
      alert(
        "Molimo da unesete lozinku kako bi ste potvrdili brisanje naloga. 😑"
      );
    }
  };

  return (
    <>
      <h3 className="action-heading">Obriši nalog</h3>
      <form className="action-form flex-column" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label htmlFor="lozinka">Lozinka</label>
          <input id="lozinka" type="password"></input>
        </div>
        <button type="submit" className="btn btn-action">
          Potvrdi
        </button>
      </form>
    </>
  );
}

export default AccountActions;

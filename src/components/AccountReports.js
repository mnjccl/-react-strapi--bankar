import React from "react";
import axios from "axios";
import { useEffect } from "react";

function AccountReports({ id, transactions, setTransactions }) {
  const url = "http://localhost:1337/api/transactions";

  useEffect(() => {
    const ucitajTransakcije = async () => {
      try {
        const response = await axios.get(url);
        const { data } = response.data;
        setTransactions(
          data
            .map(({ attributes }) => attributes)
            .filter((transaction) => transaction.user_id === id)
        );
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    ucitajTransakcije();
  }, [id, setTransactions]);

  const obrnutiSmjerTransakcija = [...transactions].reverse();

  return (
    <div className="account-reports">
      <div className="reports">
        {obrnutiSmjerTransakcija?.map((transaction, index) => (
          <Report key={index} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}

function Report({ transaction }) {
  const transakcija = transaction.amount;
  const pozitivanBroj = transaction.amount > 0;
  return (
    <div className="report">
      <span
        className={`report-type ${
          pozitivanBroj ? "report-type-uplaceno" : "report-type-isplaceno"
        }`}
      >
        {pozitivanBroj ? "Uplaceno" : "Isplaceno"}
      </span>
      <span className="report-amount">{transakcija} RSD</span>
    </div>
  );
}

export default AccountReports;

import React from "react";
import { useState } from "react";
import AccountInfo from "./AccountInfo";
import AccountActions from "./AccountActions";
import AccountReports from "./AccountReports";

function Bankar({ user, resetStates }) {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [interestRate, setInterestRate] = useState(0);

  return (
    <div className="bankar">
      <AccountInfo
        user={user}
        transactions={transactions}
        balance={balance}
        setBalance={setBalance}
        interestRate={interestRate}
        setInterestRate={setInterestRate}
      />
      <AccountActions
        user={user}
        balance={balance}
        setBalance={setBalance}
        setTransactions={setTransactions}
        interestRate={interestRate}
        setInterestRate={setInterestRate}
        resetStates={resetStates}
      />
      <AccountReports
        id={user.id}
        transactions={transactions}
        setTransactions={setTransactions}
      />
    </div>
  );
}

export default Bankar;

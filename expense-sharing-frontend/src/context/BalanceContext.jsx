import React, { createContext, useContext, useState } from "react";

const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [youOwe, setYouOwe] = useState([]);
  const [youAreOwed, setYouAreOwed] = useState([]);

  const updateBalances = (owe, owed) => {
    setYouOwe(owe);
    setYouAreOwed(owed);
  };

  return (
    <BalanceContext.Provider
      value={{
        youOwe,
        youAreOwed,
        updateBalances
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalances = () => useContext(BalanceContext);

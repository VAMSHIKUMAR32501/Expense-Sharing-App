import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { GroupProvider } from "./context/GroupContext";
import { BalanceProvider } from "./context/BalanceContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <GroupProvider>
      <BalanceProvider>
        <App />
      </BalanceProvider>
    </GroupProvider>
  </AuthProvider>
);

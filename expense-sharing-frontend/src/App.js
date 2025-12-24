import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// layout
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// main pages
import Dashboard from "./pages/dashboard/Dashboard";
import Groups from "./pages/groups/Groups";
import CreateGroup from "./pages/groups/CreateGroup";
import GroupDetails from "./pages/groups/GroupDetails";
import AddExpense from "./pages/expenses/AddExpense";
import Balances from "./pages/balances/Balances";
import SettleUp from "./pages/settlement/SettleUp";
import AddMembers from "./pages/groups/AddMembers";

/**
 * This component decides when to show Navbar
 */
const Layout = ({ children }) => {
  const location = useLocation();

  // hide navbar on auth pages
  const hideNavbar =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/groups"
            element={
              <ProtectedRoute>
                <Groups />
              </ProtectedRoute>
            }
          />

          <Route
            path="/groups/create"
            element={
              <ProtectedRoute>
                <CreateGroup />
              </ProtectedRoute>
            }
          />

          <Route
            path="/groups/:id"
            element={
              <ProtectedRoute>
                <GroupDetails />
              </ProtectedRoute>
            }
          />
          <Route
  path="/groups/:id/members"
  element={
    <ProtectedRoute>
      <AddMembers />
    </ProtectedRoute>
  }
/>

          <Route
            path="/expenses/add"
            element={
              <ProtectedRoute>
                <AddExpense />
              </ProtectedRoute>
            }
          />

          <Route
            path="/balances"
            element={
              <ProtectedRoute>
                <Balances />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settle"
            element={
              <ProtectedRoute>
                <SettleUp />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

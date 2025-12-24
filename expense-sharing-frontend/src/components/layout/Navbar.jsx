import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Avatar
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();          // clear auth context
    navigate("/");     // redirect to login
  };

  return (
    <AppBar
      position="sticky"
      elevation={3}
      sx={{
        background: "linear-gradient(135deg, #667eea, #764ba2)"
      }}
    >
      <Toolbar>
        {/* APP NAME */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          Expense Sharing
        </Typography>

        {/* NAV LINKS */}
        <Button color="inherit" onClick={() => navigate("/dashboard")}>
          Dashboard
        </Button>

        <Button color="inherit" onClick={() => navigate("/groups")}>
          Groups
        </Button>

        <Button color="inherit" onClick={() => navigate("/balances")}>
          Balances
        </Button>

        {/* USER INFO */}
        <Box display="flex" alignItems="center" ml={2}>
          <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>

          <Typography variant="body2" sx={{ mr: 2 }}>
            {user?.name}
          </Typography>

          <Button
            variant="outlined"
            color="inherit"
            onClick={handleLogout}
            sx={{ borderColor: "rgba(255,255,255,0.7)" }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

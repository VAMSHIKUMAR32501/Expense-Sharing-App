import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open = true, onClose }) => {
  const navigate = useNavigate();

  return (
    <Drawer variant="persistent" anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 240 }}>
        <ListItem button onClick={() => navigate("/dashboard")}>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button onClick={() => navigate("/groups")}>
          <ListItemText primary="Groups" />
        </ListItem>

        <ListItem button onClick={() => navigate("/balances")}>
          <ListItemText primary="Balances" />
        </ListItem>

        <ListItem button onClick={() => navigate("/settle")}>
          <ListItemText primary="Settle Up" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;

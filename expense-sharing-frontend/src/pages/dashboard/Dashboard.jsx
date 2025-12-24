import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getGroupsByUser } from "../../services/groupService";

import AddExpenseDialog from "../groups/AddExpenseDialog";

const Dashboard = () => {
  const { user } = useAuth();

  const [groups, setGroups] = useState([]);
  const [openGroupSelect, setOpenGroupSelect] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  useEffect(() => {
    if (user) loadGroups();
  }, [user]);

  const loadGroups = async () => {
    const res = await getGroupsByUser(user.id);
    setGroups(res.data);
  };

  const handleGroupSelect = (groupId) => {
    setSelectedGroupId(groupId);
    setOpenGroupSelect(false);
    setOpenExpense(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        p: 4
      }}
    >
      {/* HEADER */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Welcome, {user?.name} 👋
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your shared expenses easily and transparently
        </Typography>
      </Box>

      {/* DASHBOARD CARDS */}
      <Grid container spacing={3}>
        {/* Groups */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <GroupIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h6" mt={2}>
                Groups
              </Typography>
              <Typography color="text.secondary" mb={2}>
                View and manage all your groups
              </Typography>
              <Button variant="contained">
                View Groups
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Add Expense */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <AddCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />
              <Typography variant="h6" mt={2}>
                Add Expense
              </Typography>
              <Typography color="text.secondary" mb={2}>
                Choose a group and add an expense
              </Typography>
              <Button
                variant="outlined"
                color="success"
                onClick={() => setOpenGroupSelect(true)}
              >
                Add Expense
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 🔥 SELECT GROUP POPUP */}
      <Dialog
        open={openGroupSelect}
        onClose={() => setOpenGroupSelect(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Select Group</DialogTitle>

        <DialogContent>
          {groups.length === 0 ? (
            <Typography>No groups available</Typography>
          ) : (
            <List>
              {groups.map((g) => (
                <ListItem
                  button
                  key={g.id}
                  onClick={() => handleGroupSelect(g.id)}
                >
                  <ListItemText primary={g.name} />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenGroupSelect(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🔥 ADD EXPENSE POPUP */}
      {selectedGroupId && (
        <AddExpenseDialog
          open={openExpense}
          onClose={() => setOpenExpense(false)}
          groupId={selectedGroupId}
          user={user}
        />
      )}
    </Box>
  );
};

export default Dashboard;

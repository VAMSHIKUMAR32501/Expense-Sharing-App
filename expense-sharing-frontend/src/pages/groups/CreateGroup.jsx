import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import { getGroupsByUser, createGroup } from "../../services/groupService";
import GroupList from "../../components/group/GroupList";
import { useAuth } from "../../context/AuthContext";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadGroups();
    }
  }, [user]);

  const loadGroups = async () => {
    const res = await getGroupsByUser(user.id);
    setGroups(res.data);
  };

  // 🔹 Open popup
  const handleOpen = () => {
    setGroupName("");
    setOpen(true);
  };

  // 🔹 Close popup
  const handleClose = () => {
    setOpen(false);
  };

  // 🔹 Create group
  const handleCreateGroup = async () => {
    if (!groupName.trim()) return;

    try {
      setLoading(true);
      await createGroup({ name: groupName }, user.id);
      handleClose();
      loadGroups(); // refresh list
    } catch (err) {
      alert("Failed to create group");
    } finally {
      setLoading(false);
    }
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Your Groups
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage and track group expenses
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Create Group
        </Button>
      </Box>

      {/* GROUP LIST / EMPTY STATE */}
      {groups.length === 0 ? (
        <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h6">
              No groups yet
            </Typography>
            <Typography color="text.secondary" mb={2}>
              Create your first group to start sharing expenses.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpen}
            >
              Create Group
            </Button>
          </CardContent>
        </Card>
      ) : (
        <GroupList groups={groups} />
      )}

      {/* 🔥 CREATE GROUP POPUP */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create New Group</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Group Name"
            margin="normal"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!groupName.trim() || loading}
            onClick={handleCreateGroup}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Groups;

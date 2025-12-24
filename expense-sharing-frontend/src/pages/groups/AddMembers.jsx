import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getAvailableUsers,
  addMemberToGroup
} from "../../services/groupService";

const AddMembersDialog = ({ open, onClose, groupId, creatorId }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (open) loadUsers();
  }, [open]);

  const loadUsers = async () => {
    const res = await getAvailableUsers(groupId);
    setUsers(res.data);
  };

  const handleAdd = async (userId) => {
    await addMemberToGroup(groupId, userId, creatorId);
    loadUsers();
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Members</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Search user"
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filtered.length === 0 ? (
          <Typography>No users found</Typography>
        ) : (
          <List>
            {filtered.map(u => (
              <ListItem
                key={u.id}
                secondaryAction={
                  <Button
                    variant="contained"
                    onClick={() => handleAdd(u.id)}
                  >
                    Add
                  </Button>
                }
              >
                <ListItemText primary={u.name} />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMembersDialog;

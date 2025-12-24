import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box
} from "@mui/material";
import { useEffect, useState } from "react";
import { addExpense } from "../../services/expenseService";
import { getGroupsByUser } from "../../services/groupService";

const AddExpenseDialog = ({ open, onClose, groupId, user }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [splitType, setSplitType] = useState("EQUAL");
  const [members, setMembers] = useState([]);
  const [splits, setSplits] = useState({});

  useEffect(() => {
    if (!open) return;

    const loadMembers = async () => {
      const res = await getGroupsByUser(user.id);
      const group = res.data.find(g => g.id === groupId);
      setMembers(group.members);

      const init = {};
      group.members.forEach(m => (init[m.id] = 0));
      setSplits(init);
    };

    loadMembers();
  }, [open]);

  const handleSubmit = async () => {
    await addExpense({
      groupId,
      title,
      amount: Number(amount),
      paidBy: user.id,
      splitType,
      splits
    }, user.id);

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Expense</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Expense Title"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          label="Amount"
          margin="normal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <TextField
          fullWidth
          select
          label="Split Type"
          margin="normal"
          value={splitType}
          onChange={(e) => setSplitType(e.target.value)}
        >
          <MenuItem value="EQUAL">Equal</MenuItem>
          <MenuItem value="EXACT">Exact</MenuItem>
          <MenuItem value="PERCENT">Percentage</MenuItem>
        </TextField>

        {splitType !== "EQUAL" && (
          <Box mt={2}>
            <Typography>Split Details</Typography>
            {members.map(m => (
              <TextField
                key={m.id}
                fullWidth
                margin="dense"
                label={`${m.name}`}
                onChange={(e) =>
                  setSplits(prev => ({
                    ...prev,
                    [m.id]: Number(e.target.value)
                  }))
                }
              />
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save Expense
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpenseDialog;

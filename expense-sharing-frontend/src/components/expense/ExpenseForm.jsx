import { useState } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import SplitEqual from "./SplitEqual";
import SplitExact from "./SplitExact";
import SplitPercentage from "./SplitPercentage";

const members = ["You", "Rahul", "Ankit"]; // mock members

const ExpenseForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [splitType, setSplitType] = useState("EQUAL");
  const [splits, setSplits] = useState({});

  const handleSubmit = () => {
    if (!amount) {
      alert("Amount required");
      return;
    }

    const payload = {
      amount,
      splitType,
      splits
    };

    console.log("Expense Payload:", payload);

    if (onSubmit) onSubmit(payload);
  };

  return (
    <Box>
      <Typography variant="h6">Expense Details</Typography>

      <TextField
        fullWidth
        label="Amount"
        type="number"
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <TextField
        select
        fullWidth
        label="Split Type"
        margin="normal"
        value={splitType}
        onChange={(e) => {
          setSplitType(e.target.value);
          setSplits({});
        }}
      >
        <MenuItem value="EQUAL">Equal</MenuItem>
        <MenuItem value="EXACT">Exact</MenuItem>
        <MenuItem value="PERCENT">Percentage</MenuItem>
      </TextField>

      {splitType === "EQUAL" && <SplitEqual members={members} />}

      {splitType === "EXACT" && (
        <SplitExact members={members} onChange={setSplits} />
      )}

      {splitType === "PERCENT" && (
        <SplitPercentage members={members} onChange={setSplits} />
      )}

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        Save Expense
      </Button>
    </Box>
  );
};

export default ExpenseForm;

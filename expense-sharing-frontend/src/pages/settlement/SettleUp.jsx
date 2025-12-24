import { Container, TextField, Button, Typography, MenuItem } from "@mui/material";
import { useState } from "react";

const users = ["Rahul", "Ankit"];

const SettleUp = () => {
  const [toUser, setToUser] = useState("");
  const [amount, setAmount] = useState("");

  const handleSettle = () => {
    if (!toUser || !amount) {
      alert("All fields required");
      return;
    }

    console.log({
      toUser,
      amount
    });

    alert("Settlement recorded (mock)");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" mt={4}>
        Settle Up
      </Typography>

      <TextField
        select
        fullWidth
        label="Pay To"
        margin="normal"
        value={toUser}
        onChange={(e) => setToUser(e.target.value)}
      >
        {users.map((u) => (
          <MenuItem key={u} value={u}>
            {u}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Amount"
        type="number"
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Button variant="contained" onClick={handleSettle}>
        Settle
      </Button>
    </Container>
  );
};

export default SettleUp;

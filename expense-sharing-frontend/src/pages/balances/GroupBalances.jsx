import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupBalances } from "../../services/balanceService";
import { Typography, Box } from "@mui/material";

const GroupBalances = () => {
  const { groupId } = useParams();
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    getGroupBalances(groupId).then(res => setBalances(res.data));
  }, [groupId]);

  return (
    <Box p={3}>
      <Typography variant="h5">Group Balances</Typography>

      {balances.map((b, i) => (
        <Typography key={i}>
          User {b.fromUser} owes User {b.toUser} ₹{b.amount}
        </Typography>
      ))}
    </Box>
  );
};

export default GroupBalances;

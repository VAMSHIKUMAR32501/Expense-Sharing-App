import { Card, CardContent, Typography, Box } from "@mui/material";
import { useBalances } from "../../context/BalanceContext";

const YouAreOwed = () => {
  const { youAreOwed } = useBalances();

  if (youAreOwed.length === 0) {
    return <Typography mt={2}>No one owes you money 🙂</Typography>;
  }

  return (
    <Box mt={2}>
      <Typography variant="h6">You Are Owed</Typography>

      {youAreOwed.map((item, index) => (
        <Card key={index} sx={{ mt: 1 }}>
          <CardContent>
            <Typography>
              <b>{item.name}</b> owes you ₹{item.amount}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default YouAreOwed;

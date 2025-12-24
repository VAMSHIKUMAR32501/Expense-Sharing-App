import { Card, CardContent, Typography, Box } from "@mui/material";
import { useBalances } from "../../context/BalanceContext";

const YouOwe = () => {
  const { youOwe } = useBalances();

  if (youOwe.length === 0) {
    return <Typography mt={2}>You don’t owe anyone 🎉</Typography>;
  }

  return (
    <Box mt={2}>
      <Typography variant="h6">You Owe</Typography>

      {youOwe.map((item, index) => (
        <Card key={index} sx={{ mt: 1 }}>
          <CardContent>
            <Typography>
              You owe <b>{item.name}</b> ₹{item.amount}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default YouOwe;

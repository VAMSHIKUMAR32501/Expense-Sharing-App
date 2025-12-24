import { Card, CardContent, Typography, Box } from "@mui/material";
import { useBalances } from "../../context/BalanceContext";

const BalanceSummary = () => {
  const { youOwe, youAreOwed } = useBalances();

  const totalOwe = youOwe.reduce((sum, item) => sum + item.amount, 0);
  const totalOwed = youAreOwed.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Box display="flex" gap={2} mt={2}>
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6">You Owe</Typography>
          <Typography variant="h5" color="error">
            ₹{totalOwe}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6">You Are Owed</Typography>
          <Typography variant="h5" color="green">
            ₹{totalOwed}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BalanceSummary;

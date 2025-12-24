import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  Grid
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import {
  getUserBalances,
  getBalanceOverview,
  settleBalance
} from "../../services/balanceService";

const Balances = () => {
  const { user } = useAuth();
  const [balances, setBalances] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (user) loadData();
    // eslint-disable-next-line
  }, [user]);

  const loadData = async () => {
    const bRes = await getUserBalances(user.id);
    const oRes = await getBalanceOverview(user.id);
    setBalances(bRes.data);
    setSummary(oRes.data);
  };

  const handleSettle = async (b) => {
    try {
      await settleBalance({
        groupId: b.groupId,
        fromUser: b.fromUser,
        toUser: b.toUser,
        amount: b.amount
      });
      loadData();
    } catch {
      alert("Failed to settle");
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
      <Typography variant="h4" fontWeight="bold">
        Balances
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Track what you owe and what others owe you
      </Typography>

      {/* SUMMARY CARDS */}
      {summary && (
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography color="text.secondary">
                  You Owe
                </Typography>
                <Typography variant="h5">
                  ₹{summary.lifetimeYouOwe}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography color="text.secondary">
                  Owed To You
                </Typography>
                <Typography variant="h5">
                  ₹{summary.lifetimeOwedToYou}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography color="text.secondary">
                  Net Balance
                </Typography>
                <Typography
                  variant="h5"
                  color={
                    summary.netBalance >= 0
                      ? "success.main"
                      : "error.main"
                  }
                >
                  ₹{summary.netBalance}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Divider sx={{ mb: 3 }} />

      {/* OUTSTANDING BALANCES */}
      <Typography variant="h6" gutterBottom>
        Outstanding Balances
      </Typography>

      {balances.length === 0 ? (
        <Typography color="text.secondary">
          No outstanding balances 🎉
        </Typography>
      ) : (
        balances.map((b, i) => (
          <Card key={i} sx={{ mb: 2, borderRadius: 3 }}>
            <CardContent>
              <Typography>
                <b>User {b.fromUser}</b> owes{" "}
                <b>User {b.toUser}</b> ₹{b.amount}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Group ID: {b.groupId}
              </Typography>

              {b.fromUser === user.id && (
                <Box mt={2}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleSettle(b)}
                  >
                    Settle
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Balances;

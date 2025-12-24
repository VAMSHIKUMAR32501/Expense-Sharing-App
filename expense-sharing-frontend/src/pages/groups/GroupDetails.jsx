import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  Chip,
  Stack
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import { getGroupsByUser } from "../../services/groupService";
import { getExpensesByGroup } from "../../services/expenseService";
import { useAuth } from "../../context/AuthContext";

import AddMembersDialog from "./AddMembersDialog";
import AddExpenseDialog from "./AddExpenseDialog";

const GroupDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);

  const [openMembers, setOpenMembers] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);

  useEffect(() => {
    if (user) loadGroup();
  }, [user]);

  useEffect(() => {
    if (group) loadExpenses();
  }, [group]);

  const loadGroup = async () => {
    const res = await getGroupsByUser(user.id);
    const found = res.data.find(g => g.id === Number(id));
    setGroup(found);
  };

  const loadExpenses = async () => {
    const res = await getExpensesByGroup(group.id);
    setExpenses(res.data);
  };

  if (!group) {
    return <Typography p={3}>Loading...</Typography>;
  }

  const isCreator = user.id === group.createdBy.id;

  const getUserLabel = (userId) => {
    const u = group.members.find(m => m.id === userId);
    return u ? u.name : `User ${userId}`;
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
      <Typography variant="h4" fontWeight="bold">
        {group.name}
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Group expenses & members
      </Typography>

      {/* MEMBERS */}
      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6">Members</Typography>

          <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
            {group.members.map(m => (
              <Chip
                key={m.id}
                label={m.name}
                color={m.id === group.createdBy.id ? "primary" : "default"}
              />
            ))}
          </Stack>

          <Box mt={3}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mr: 2 }}
              onClick={() => setOpenExpense(true)}
            >
              Add Expense
            </Button>

            {isCreator && (
              <Button
                variant="outlined"
                startIcon={<GroupAddIcon />}
                onClick={() => setOpenMembers(true)}
              >
                Add Members
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* EXPENSE HISTORY */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6">Expense History</Typography>
          <Divider sx={{ my: 2 }} />

          {expenses.length === 0 ? (
            <Typography color="text.secondary">
              No expenses yet.
            </Typography>
          ) : (
            expenses.map(e => (
              <Typography key={e.id} mb={1}>
                💰 <b>{e.title}</b> —{" "}
                <b>{getUserLabel(e.paidBy)}</b> paid ₹{e.amount}
              </Typography>
            ))
          )}
        </CardContent>
      </Card>

      {/* POPUPS */}
      <AddMembersDialog
        open={openMembers}
        onClose={() => setOpenMembers(false)}
        groupId={group.id}
        creatorId={user.id}
      />

      <AddExpenseDialog
        open={openExpense}
        onClose={() => setOpenExpense(false)}
        groupId={group.id}
        user={user}
        refreshExpenses={loadExpenses}
      />
    </Box>
  );
};

export default GroupDetails;

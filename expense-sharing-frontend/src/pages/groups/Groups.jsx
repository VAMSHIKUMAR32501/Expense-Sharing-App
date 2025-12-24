import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import { getGroupsByUser } from "../../services/groupService";
import GroupList from "../../components/group/GroupList";
import { useAuth } from "../../context/AuthContext";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadGroups();
    }
  }, [user]);

  const loadGroups = async () => {
    try {
      const res = await getGroupsByUser(user.id);
      setGroups(res.data);
    } catch (error) {
      console.error(error);
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
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Your Groups
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage and track group expenses
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/groups/create")}
        >
          Create Group
        </Button>
      </Box>

      {/* EMPTY STATE */}
      {groups.length === 0 ? (
        <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              No groups yet
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Create your first group and start sharing expenses.
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/groups/create")}
            >
              Create Group
            </Button>
          </CardContent>
        </Card>
      ) : (
        <GroupList groups={groups} />
      )}
    </Box>
  );
};

export default Groups;

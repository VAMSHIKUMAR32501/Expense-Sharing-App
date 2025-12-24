import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GroupCard = ({ group }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ mb: 2, cursor: "pointer" }}
      onClick={() => navigate(`/groups/${group.id}`)}
    >
      <CardContent>
        <Typography variant="h6">{group.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Members: {group.members?.length || 0}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GroupCard;

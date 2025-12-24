import { Typography, Box } from "@mui/material";

const SplitEqual = ({ members }) => {
  return (
    <Box mt={2}>
      <Typography variant="subtitle1">
        Expense will be split equally among:
      </Typography>

      {members.map((m) => (
        <Typography key={m}>• {m}</Typography>
      ))}
    </Box>
  );
};

export default SplitEqual;

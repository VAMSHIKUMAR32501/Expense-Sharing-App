import { TextField, Typography, Box } from "@mui/material";
import { useState } from "react";

const SplitExact = ({ members, onChange }) => {
  const [values, setValues] = useState({});

  const handleChange = (member, value) => {
    const updated = { ...values, [member]: Number(value) };
    setValues(updated);
    onChange(updated);
  };

  return (
    <Box mt={2}>
      <Typography variant="subtitle1">Enter exact amounts:</Typography>

      {members.map((m) => (
        <TextField
          key={m}
          fullWidth
          type="number"
          margin="normal"
          label={`${m} amount`}
          onChange={(e) => handleChange(m, e.target.value)}
        />
      ))}
    </Box>
  );
};

export default SplitExact;

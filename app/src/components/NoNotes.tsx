import { Typography, Paper } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";

export const NoNoteSelected = () => {
  return (
    <Paper elevation={0} sx={{ p: 4, textAlign: "center" }}>
      <InboxIcon fontSize="large" color="disabled" />
      <Typography variant="h6" sx={{ mt: 2 }}>
        No Note Selected
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Please select or create a note
      </Typography>
    </Paper>
  );
};

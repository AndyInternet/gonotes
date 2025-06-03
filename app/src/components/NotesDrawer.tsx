import { Card, Drawer, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { useGetNotesQuery } from "../api";
import { NewNote } from "./NewNote";

const drawerWidth = 240;

export const NotesDrawer: React.FC = () => {
  const { id: activeId } = useParams<{ id: string }>();
  const { data: notes, isLoading, error } = useGetNotesQuery();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <NewNote />
        {isLoading && <div>Loading notes...</div>}
        {error && <div>Error loading notes</div>}
        {notes &&
          notes.map(({ id, title, updated_at }) => (
            <Card
              key={id}
              variant={activeId === id ? "elevation" : "outlined"}
              sx={{ p: 1, mb: 1, cursor: "pointer" }}
              onClick={() => navigate(`/note/${id}`)}
            >
              <Typography variant="body1">{title}</Typography>
              <Typography sx={{ fontSize: ".8rem", opacity: 0.5 }}>
                {dayjs(updated_at).format("DD/MM/YYYY h:MM:ssa")}
              </Typography>
            </Card>
          ))}
      </Box>
    </Drawer>
  );
};

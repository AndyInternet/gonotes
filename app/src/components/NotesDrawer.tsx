import { Drawer } from "@mui/material";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useGetNotesQuery } from "../api";
import { DrawerCard } from "./DrawerCard";
import { NewNote } from "./NewNote";

const drawerWidth = 240;

export const NotesDrawer: React.FC = () => {
  const { id: activeId } = useParams<{ id: string }>();
  const { data: notes, isLoading, error } = useGetNotesQuery();

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
            <DrawerCard
              key={id}
              id={id}
              title={title}
              updated_at={updated_at}
              active={activeId === id}
            />
          ))}
      </Box>
    </Drawer>
  );
};

import Drawer from "@mui/material/Drawer";

const drawerWidth = 240;

export const DrawerDesktop: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
      open
    >
      put the notes here 1
    </Drawer>
  );
};

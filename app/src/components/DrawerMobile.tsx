import Drawer from "@mui/material/Drawer";

const drawerWidth = 240;

export const DrawerMobile: React.FC<{
  mobileOpen: boolean;
  setIsClosing: (value: React.SetStateAction<boolean>) => void;
  setMobileOpen: (value: React.SetStateAction<boolean>) => void;
}> = ({ mobileOpen, setIsClosing, setMobileOpen }) => {
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onTransitionEnd={handleDrawerTransitionEnd}
      onClose={handleDrawerClose}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
      slotProps={{
        root: {
          keepMounted: true,
        },
      }}
    >
      put the notes here 2
    </Drawer>
  );
};

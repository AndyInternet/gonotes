import { Note } from "@mui/icons-material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { useState } from "react";
import { DrawerDesktop } from "./components/DrawerDesktop";
import { DrawerMobile } from "./components/DrawerMobile";
import { TitleBar } from "./components/TitleBar";

const drawerWidth = 240;

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TitleBar
          isClosing={isClosing}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <DrawerMobile
            mobileOpen={mobileOpen}
            setIsClosing={setIsClosing}
            setMobileOpen={setMobileOpen}
          />
          <DrawerDesktop />
        </Box>
        <Note />
      </Box>
    </ThemeProvider>
  );
}

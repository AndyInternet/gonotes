import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { NotePanel } from "./components/NotePanel";
import { NotesDrawer } from "./components/NotesDrawer";

export default function App() {
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
      <Box sx={{ display: "flex", height: "100vh" }}>
        <CssBaseline />
        <NotesDrawer />
        <NotePanel />
      </Box>
    </ThemeProvider>
  );
}

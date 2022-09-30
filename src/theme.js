import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    primary: {
      light: "#45c09f",
      main: "#641E16",
      dark: "#00845c",
      contrastText: "#fff",
    },
  },
});

export default theme;

import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#666",
      mainGradient: "linear-gradient(315deg, #000 0%, #b58ecc 74%)"
    },
    secondary: {
      main: '#fff',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  }
});

theme.typography.h1 = {
  fontSize: '2.4rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '5rem',
  },
};


theme.typography.p = {
  fontSize: '1.4rem',
  '@media (min-width:600px)': {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
  },
};

export default theme;

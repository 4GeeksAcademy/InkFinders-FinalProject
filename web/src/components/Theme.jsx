import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
  },
  shape: {
    borderRadius: 18,
  },
  palette: {
    mode: 'light',
    primary: { main: '#40C9A2' },
    secondary: { main: '#2F9C95' },
    success: { main: '#7EDDD4' },
    background: {
      default: '#E6FAF7',
      paper: '#ffffffff',
    },
    text: {
      primary: '#1B1B1B',
      secondary: '#5E6A6A',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: 'secondary',
      },
    },
  },
});

export default theme;

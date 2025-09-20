import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import logo from '/workspaces/InkFinders-FinalProject/web/src/assets/Inkfinders_Book_Club_Logo-removebg-preview.png';

const theme = createTheme({
  typography: {
    fontFamily: ['Inter, sans-serif'].join(','),
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
  },
  shape: { borderRadius: 18 },
  palette: {
    mode: 'light',
    primary: { main: '#40C9A2' },
    secondary: { main: '#2F9C95' },
    success: { main: '#7EDDD4' },
    background: {
      default: '#E6FAF7',
      paper: '#E6FAF7',
    },
    text: { primary: '#1B1B1B' },
  },
});

const LandingPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Box
          component="img"
          src={logo}
          alt="InkFinders Logo"
          sx={{
            height: 200,
            width: 'auto',
            display: 'block',
            justifySelf: 'center',
          }}
        />
        <Typography variant="h2" gutterBottom>
          Explora, guarda, relee.
        </Typography>
        <Typography variant="h2" gutterBottom>
          Haz Match cn tu próxima lectura.
        </Typography>
        <Typography color="secondary" sx={{ mb: 3 }}>
          Regístrate, crea tu perfil y organiza tus libros en <b>favoritos</b>,{' '}
          <b>por leer</b> y <b>leídos</b>.
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default LandingPage;

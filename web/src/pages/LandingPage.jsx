import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import logo from '../assets/Inkfinders_Book_Club_Logo-removebg-preview.png';

const LandingPage = () => {
  return (
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
        Haz Match con tu próxima lectura.
      </Typography>
      <Typography color="secondary" sx={{ mb: 3 }}>
        Regístrate, crea tu perfil y organiza tus libros en <b>favoritos</b>,{' '}
        <b>por leer</b> y <b>leídos</b>.
      </Typography>
    </Container>
  );
};

export default LandingPage;

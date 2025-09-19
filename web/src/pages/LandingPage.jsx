import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

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
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h2" gutterBottom>
          Explora, guarda, relee. Haz Match cn tu próxima lectura.
        </Typography>
        <Typography color="text.secundary" sx={{ mb: 3 }}>
          Regístrate, crea tu perfil y organiza tus libros en <b>favoritos</b>,{' '}
          <b>por leer</b> y <b>leídos</b>
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <TextField placeholder="Tu email" size="small" />
          <Button variant="contained">Crear cuenta</Button>
        </Box>
      </Container>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h3">Perfiles</Typography>
                <Typography color="text.secondary">
                  Muestra tus géneros y autores favoritos.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Favoritos</Typography>
                <Typography color="text.secondary">
                  Guarda los libros que más te gustan.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Listas</Typography>
                <Typography color="text.secondary">
                  Libros que te quieres leer en un futuro y libros de los que ya
                  has disfrutado.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default LandingPage;

import { Container, Typography } from '@mui/material';
import { useLibrary } from '../context/Library';
import CardBook from '../components/BooksCard';
import Grid from '@mui/material/Grid2';

export default function ToReadPage() {
  const { toRead } = useLibrary();
  const items = toRead.map((x) => x.book ?? x);
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Por leer
      </Typography>
      {items.length === 0 ? (
        <Typography color="text.secondary">
          Marca un libro con 📚 para verlo aquí.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {items.map((b) => (
            <Grid key={b.id} xs={12} sm={6} md={3}>
              <CardBook {...b} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

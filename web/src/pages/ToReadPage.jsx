import { Container, Typography } from '@mui/material';
import ToReadCard from '../components/ReadStatusCard';
import Grid from '@mui/material/Grid2';
import { getBooksByStatus } from '../services/api/booksApi';
import { useEffect, useState } from 'react';

export default function ToReadPage() {
  const [books, setBooks] = useState([]); // siempre array, gracias
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    (async () => {
      try {
        const data = await getBooksByStatus('to_read');
        console.log('getBookByStatus');
        console.log(data);
        // Acepta tanto lista directa como { items: [...] }
        const raw = Array.isArray(data) ? data : (data?.items ?? []);
        const list = raw.map((item) => ({ ...item, to_read: true }));
        console.log(list);
        if (!cancel) setBooks(list);
      } catch (e) {
        if (!cancel)
          setError(e?.message || 'No se pudieron cargar tus libros pendientes');
      } finally {
        if (!cancel) setLoading(false);
      }
    })();

    return () => {
      cancel = true;
    };
  }, []);

  console.log(books);
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Por leer
      </Typography>
      {books.length === 0 ? (
        <Typography color="text.secondary">
          Marca un libro con 📚 para verlo aquí.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {books.map((b) => (
            <Grid key={b.id} xs={12} sm={6} md={3}>
              <ToReadCard {...b} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

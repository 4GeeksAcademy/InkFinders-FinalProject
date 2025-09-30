import { Container, Typography } from '@mui/material';
import { useLibrary } from '../context/Library';
import CardBook from '../components/BooksCard';
import Grid from '@mui/material/Grid2';
import { getBooksByStatus } from '../services/api/booksApi';
import { useEffect, useState } from 'react';

export default function FavoritesPage() {
  const [books, setBooks] = useState([]); // siempre array, gracias
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    (async () => {
      try {
        const data = await getBooksByStatus('favorite');
        console.log('getBookByStatus');
        console.log(data);
        // Acepta tanto lista directa como { items: [...] }
        const raw = Array.isArray(data) ? data : (data?.items ?? []);
        const list = raw.map((item) => ({ ...item, favorite: true }));

        if (!cancel) setBooks(list);
      } catch (e) {
        if (!cancel)
          setError(e?.message || 'No se pudieron cargar tus favoritos');
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
        Mis favoritos
      </Typography>
      {books.length === 0 ? (
        <Typography color="text.secondary">
          Pulsa ⭐ en una card para añadirla.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {books.map((b) => (
            <Grid key={b.id} xs={12} sm={6} md={3}>
              <CardBook {...b} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router'; // si te falla, usa 'react-router-dom'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import CardBook from '../components/BooksCard';
import { searchBooks, getBooksByStatus } from '../services/api/booksApi';

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = (params.get('q') || '').trim();

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [items, setItems] = useState([]); // ⬅️ SIEMPRE array

  useEffect(() => {
    if (!q) return;
    (async () => {
      try {
        setErr(null);
        setLoading(true);

        // Haz las dos llamadas en paralelo
        const [datafav, data] = await Promise.all([
          getBooksByStatus('favorite'),
          searchBooks(q, 20),
        ]);

        // Set de IDs favoritos (soporta {id} o {book:{id}})
        const favIds = new Set(
          (Array.isArray(datafav) ? datafav : (datafav?.items ?? []))
            .map((x) => x.book?.id ?? x.id)
            .filter(Boolean)
        );

        // Normaliza los resultados a lo que CardBook espera
        const raw = Array.isArray(data) ? data : (data?.items ?? []);
        const list = raw.map((item) => {
          const v = item.volumeInfo ?? {};
          return {
            id: item.id,
            title: v.title ?? 'Título desconocido',
            authors: v.authors ?? 'Autor desconocido',
            cover:
              v.imageLinks?.thumbnail ??
              v.imageLinks?.smallThumbnail ??
              '/InkFindersBackground.jpg',
            favorite: favIds.has(item.id),
          };
        });

        setItems(list); // ⬅️ NO list['items'], por el amor de Yoda
      } catch (e) {
        setErr(e?.message || 'Error buscando libros');
        setItems([]); // fallback para no romper el map
      } finally {
        setLoading(false);
      }
    })();
  }, [q]);

  if (!q)
    return (
      <Alert sx={{ m: 2 }} severity="info">
        Escribe algo en la búsqueda.
      </Alert>
    );

  return (
    <Box sx={{ p: 2 }}>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {err && (
        <Alert sx={{ mb: 2 }} severity="error">
          {String(err)}
        </Alert>
      )}

      <Grid container spacing={2}>
        {(items ?? []).map(
          (
            b // ⬅️ cinturón y tirantes
          ) => (
            <Grid key={b.id} xs={12} sm={6} md={4} lg={3}>
              <CardBook {...b} />
            </Grid>
          )
        )}
      </Grid>

      {!loading && (items?.length ?? 0) === 0 && !err && (
        <Alert sx={{ mt: 2 }} severity="info">
          Sin resultados para “{q}”.
        </Alert>
      )}
    </Box>
  );
}

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  ButtonGroup,
  Stack,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import PropTypes from 'prop-types';
import { setBookStatus, unsetBookStatus } from '../services/api/booksApi';
import { useState, useEffect } from 'react';

FavoriteCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  cover: PropTypes.string,
  authors: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  favorite: PropTypes.bool,
};
FavoriteCard.defaultProps = {
  title: 'Título desconocido',
  cover: '/InkFindersBackground.jpg',
  authors: 'Autor desconocido',
  favorite: false,
};

export default function FavoriteCard({ id, title, cover, authors, favorite }) {
  const authorsText = Array.isArray(authors)
    ? authors.join(', ')
    : authors || 'Autor desconocido';
  const coverSrc = cover || '/InkFindersBackground.jpg';
  const book = { id, title, cover: coverSrc, authors, favorite };
  const [fav, setFav] = useState(book.favorite);
  const [savingFav, setSavingFav] = useState(false);

  const handleToggleFavorite = async () => {
    if (savingFav) return; // evita múltiples clics
    setSavingFav(true);
    try {
      if (fav) {
        await unsetBookStatus(id, 'favorite');
        setFav(false);
      } else {
        await setBookStatus(id, 'favorite');
        setFav(true);
      }
    } catch (e) {
      console.error('No se pudo cambiar favorito:', e);
      setSavingFav(false);
    } finally {
      setSavingFav(false);
    }
  };

  useEffect(() => {
    setSavingFav(false);
  }, [fav]);

  return (
    <Card
      sx={{
        width: 200,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardActionArea component={RouterLink} to={`/book/${id}`}>
        <CardMedia
          component="img"
          image={coverSrc}
          alt={`Portada de ${title}`}
          sx={{ height: 150, objectFit: 'cover', bgcolor: 'grey.100' }}
          loading="lazy"
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" fontWeight={700} noWrap title={title}>
            {title || 'Título desconocido'}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            Autor: {authorsText}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Stack direction="row" spacing={1} sx={{ mt: 'auto', p: 2 }}>
        <Button
          size="small"
          variant="outlined"
          component={RouterLink}
          to={`/book/${id}`}
          fullWidth
        >
          Leer más
        </Button>
        <ButtonGroup
          size="small"
          variant="outlined"
          aria-label="Cambiar estado"
        >
          <Button
            onClick={handleToggleFavorite}
            title={fav ? 'Quitar de favoritos' : 'Marcar como favorito'}
            aria-label="Favorito"
            disabled={savingFav}
            aria-busy={savingFav}
          >
            {savingFav ? '⏳' : fav ? '💛' : '⭐'}
          </Button>
        </ButtonGroup>
      </Stack>
    </Card>
  );
}

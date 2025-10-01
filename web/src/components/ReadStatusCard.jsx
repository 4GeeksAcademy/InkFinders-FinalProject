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

ToReadCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  cover: PropTypes.string,
  authors: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  to_read: PropTypes.bool,
  read: PropTypes.bool,
};
ToReadCard.defaultProps = {
  title: 'Título desconocido',
  cover: '/InkFindersBackground.jpg',
  authors: 'Autor desconocido',
  to_read: false,
  read: false,
};

export default function ToReadCard({
  id,
  title,
  cover,
  authors,
  to_read,
  read,
}) {
  const authorsText = Array.isArray(authors)
    ? authors.join(', ')
    : authors || 'Autor desconocido';
  const coverSrc = cover || '/InkFindersBackground.jpg';
  const book = { id, title, cover: coverSrc, authors, to_read, read };
  console.log('libro');
  console.log(book);
  const [toReadFlag, setToReadFlag] = useState(book.to_read);
  const [readFlag, setReadFlag] = useState(book.read);
  const [savingRead, setSavingRead] = useState(false);
  const [savingToRead, setSavingToRead] = useState(false);

  const handleToggleToRead = async () => {
    if (savingToRead) return; // evita múltiples clics
    setSavingToRead(true);
    try {
      if (toReadFlag) {
        await unsetBookStatus(id, 'to_read');
        setToReadFlag(false);
      } else {
        await setBookStatus(id, 'to_read');
        setToReadFlag(true);
      }
    } catch (e) {
      console.error('No se pudo cambiar el estado del libro a pendiente:', e);
      setSavingToRead(false);
    } finally {
      setSavingToRead(false);
    }
  };

  const handleToggleRead = async () => {
    if (savingRead) return; // evita múltiples clics
    setSavingRead(true);
    console.log(book);
    try {
      if (readFlag) {
        await unsetBookStatus(id, 'read');
        setReadFlag(false);
      } else {
        await setBookStatus(id, 'read');
        setReadFlag(true);
      }
    } catch (e) {
      console.error('No se pudo cambiar el estado del libro a leído:', e);
      setSavingRead(false);
    } finally {
      setSavingRead(false);
    }
  };

  useEffect(() => {
    setSavingToRead(false);
    setSavingRead(false);
  }, [toReadFlag, readFlag]);

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
            onClick={handleToggleToRead}
            title="Para leer"
            aria-label="Para leer"
          >
            {savingToRead ? '⏳' : toReadFlag ? '✨' : '📚'}
          </Button>
          <Button onClick={handleToggleRead} title="Leído" aria-label="Leído">
            {savingRead ? '⏳' : readFlag ? '✨' : '✔'}
          </Button>
        </ButtonGroup>
      </Stack>
    </Card>
  );
}

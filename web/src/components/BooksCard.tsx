import {  Card, CardActionArea, CardContent, CardMedia, Typography, Button, ButtonGroup, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router";

type Props = {
  id: string;
  title: string;
  cover?: string;
  authors?: string[] | string;
  setStatus: (id: string, status: "favorite" | "to_read" | "read") => void;
};

export function CardBook({ id, title, cover, authors, setStatus }: Props) {
  const authorsText = Array.isArray(authors) ? authors.join(", ") : (authors || "Autor desconocido");
  const coverSrc = cover || "/InkFindersBackground.jpg";

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea component={RouterLink} to={`/book/${id}`}>
        <CardMedia
          component="img"
          image={coverSrc}
          alt={`Portada de ${title}`}
          sx={{ height: 220, objectFit: "cover", bgcolor: "grey.100" }}
          loading="lazy"
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="subtitle1" fontWeight={700} noWrap title={title}>
            {title || "Título desconocido"}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            Autor: {authorsText}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Stack direction="row" spacing={1} sx={{ mt: "auto", p: 2 }}>
        <Button
          size="small"
          variant="outlined"
          component={RouterLink}
          to={`/book/${id}`}
          fullWidth
        >
          Leer más
        </Button>
        <ButtonGroup size="small" variant="outlined" aria-label="Cambiar estado">
          <Button onClick={() => setStatus(id, "favorite")} title="Favorito" aria-label="Favorito">⭐</Button>
          <Button onClick={() => setStatus(id, "to_read")}  title="Para leer" aria-label="Para leer">📚</Button>
          <Button onClick={() => setStatus(id, "read")}     title="Leído"    aria-label="Leído">✔</Button>
        </ButtonGroup>
      </Stack>
    </Card>
  );
}

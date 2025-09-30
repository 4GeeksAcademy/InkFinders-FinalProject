/*import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardBook } from "./BooksCard";

type Status = "favorite" | "to_read" | "read";

type BookItem = Omit<React.ComponentProps<typeof CardBook>, "setStatus"> & {
  description?: string;
};

export default function BooksGallery({
  books,
  setStatus,
  loading = false,
}: {
  books: BookItem[];
  setStatus: (id: string, status: Status) => void;
  loading?: boolean;
}) {
  if (loading) {

    return (
      <Grid container spacing={2}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Grid key={i} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: "100%" }}>
              <Skeleton variant="rectangular" height={220} />
              <CardContent>
                <Skeleton width="80%" />
                <Skeleton width="60%" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!books?.length) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h6">Sin resultados</Typography>
        <Typography color="text.secondary">
          Prueba con otro título, autor o categoría.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {books.map((b) => (
        <Grid key={b.id} xs={12} sm={6} md={4} lg={3}>
          <CardBook
            id={b.id}
            title={b.title}
            cover={b.cover}
            authors={b.authors}
            setStatus={setStatus}
          />
        </Grid>
      ))}
    </Grid>
  );
}
*/

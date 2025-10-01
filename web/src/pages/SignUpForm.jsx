import { useContext } from 'react';
import { UserContext } from '../context/User';
import { Box, Paper, TextField, Typography, Button } from '@mui/material';

const SignUpForm = () => {
  const { register } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const { name, email, password } = data;

    register(name, email, password);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Paper sx={{ p: 3, width: 300 }}>
        <Typography variant="h6" gutterBottom align="center">
          Registrate y Empieza
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            name="name"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contraseña"
            type="password"
            name="password"
            required
          />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Registrarse
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SignUpForm;

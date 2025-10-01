import { useState, useContext } from 'react';
import {
  Drawer,
  Box,
  TextField,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { UserContext } from '../context/User';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router';

function Sidebar() {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  if (isEmpty(user)) return null;

  return (
    <div>
      {!isOpen && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: 'fixed',
            top: 100,
            right: 20,
            zIndex: 1300,
            backgroundColor: '#40C9A2',
            color: '#1b1b1b',
          }}
        >
          <SearchIcon />
        </IconButton>
      )}
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 300,
            p: 2,
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Buscar
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Inicia tu busqueda"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </Box>
      </Drawer>
    </div>
  );
}
export default Sidebar;

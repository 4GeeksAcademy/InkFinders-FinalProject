import { Home } from '../../pages/HomePage';
import { Login } from '../../pages/LoginPage';
import Leidos from '../../pages/LeidosPage';
import PorLeer from '../../pages/PorLeerPage';
import Favoritos from '../../pages/FavoritePage';
import SearchResults from '../../pages/searchResultsPage';

export const routesConfig = [
  {
    name: 'Root',
    path: '/',
    element: <Home />,
  },
  {
    name: 'Login',
    path: '/login',
    element: <Login />,
  },
  {
    name: 'All',
    path: '*',
    element: <Home />,
  },
  { name: 'Favoritos', path: '/favoritos', element: <Favoritos /> },
  { name: 'Leídos', path: '/leidos', element: <Leidos /> },
  { name: 'Por Leer', path: '/por-leer', element: <PorLeer /> },
  { name: 'Resultados', path: '/search', element: <SearchResults /> },
];

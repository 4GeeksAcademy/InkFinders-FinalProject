import { Home } from '../../pages/HomePage';
import { Login } from '../../pages/LoginPage';
import ReadPage from '../../pages/ReadPage';
import ToReadPage from '../../pages/ToReadPage';
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
  { name: 'Leídos', path: '/leidos', element: <ReadPage /> },
  { name: 'Por Leer', path: '/por-leer', element: <ToReadPage /> },
  { name: 'Resultados', path: '/search', element: <SearchResults /> },
];

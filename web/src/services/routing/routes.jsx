import { Home } from '../../pages/HomePage';
import { Login } from '../../pages/LoginPage';
import UserProfile from '../../pages/UserProfile.jsx';

export const routesConfig = [
  {
    name: 'Root',
    path: '/',
    component: <Home />,
  },
  {
    name: 'Login',
    path: '/login',
    component: <Login />,
  },

  {
    name: 'UserProfile',
    path: '/user',
    component: <UserProfile />,
  },
  {
    name: 'All',
    path: '*',
    component: <Home />,
  },
];

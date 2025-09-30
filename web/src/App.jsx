import { Routes, Route } from 'react-router';

import { NavBar } from './components/NavBar';
import { routesConfig } from './services/routing/routes';
import { GuardedRoute } from './components/routing/GuardedRoute';
import LandingPage from './pages/LandingPage';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './components/Theme';
import { LibraryProvider } from './context/Library';

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LibraryProvider>
          <NavBar />
          <Routes>
            <Route path="/LandingPage" element={<LandingPage />} />
            <Route element={<GuardedRoute />}>
              {routesConfig.map((route) => {
                return (
                  <Route
                    key={route.name}
                    path={route.path}
                    element={route.element}
                  />
                );
              })}
            </Route>
          </Routes>
        </LibraryProvider>
      </ThemeProvider>
    </>
  );
};

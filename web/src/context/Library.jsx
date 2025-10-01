import { createContext, useContext, useEffect, useState } from 'react';

const LibraryContext = createContext();
const KEY = 'library:v1';

// Estructura mínima de item: { id, type?, title?, cover?, authors?, favorite, status }
export const LibraryProvider = ({ children }) => {
  const [items, setItems] = useState({}); // mapa por id -> item

  // Hydrate desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // Persistencia
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const toggleFavorite = (item) => {
    setItems((prev) => {
      const cur = prev[item.id] || { ...item, favorite: false, status: 'none' };
      const next = { ...cur, favorite: !cur.favorite };
      return { ...prev, [item.id]: next };
    });
  };

  const isFavorite = (item) => !!items[item.id]?.favorite;

  // status exclusivo: "read" | "to_read" | "none"
  const setStatus = (item, status) => {
    setItems((prev) => {
      const cur = prev[item.id] || { ...item, favorite: false, status: 'none' };
      const next = { ...cur, status };
      return { ...prev, [item.id]: next };
    });
  };

  const getStatus = (id) => items[id]?.status || 'none';

  // Selectores sencillos para páginas
  const favorites = Object.values(items)
    .filter((x) => x.favorite)
    .map((x) => x);
  const read = Object.values(items)
    .filter((x) => x.status === 'read')
    .map((x) => x);
  const toRead = Object.values(items)
    .filter((x) => x.status === 'to_read')
    .map((x) => x);

  return (
    <LibraryContext.Provider
      value={{
        // estado/acciones
        toggleFavorite,
        isFavorite,
        setStatus,
        getStatus,
        // listas derivadas
        favorites,
        read,
        toRead,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);

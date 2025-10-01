import { baseUrl, fetchWrapper } from './config';

const fixCover = (u) => (u ? u.replace(/^http:/, 'https:') : undefined);

export function mapVolumeToCard(v) {
  const vi = v?.volumeInfo || {};
  const links = vi.imageLinks || {};
  return {
    id: v.id,
    title: vi.title || 'Título desconocido',
    cover: fixCover(links.thumbnail || links.smallThumbnail),
    authors: vi.authors || [],
  };
}

export async function searchBooks(q) {
  return await fetchWrapper(`${baseUrl}gbooks/search?q=${q}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => {
    return data;
  });
}

export const setBookStatus = async (volumeId, status) => {
  const path =
    status === 'favorite'
      ? 'favorites/add_book/'
      : status === 'to_read'
        ? 'to_read/add_book/'
        : 'read/add_book/';
  return await fetchWrapper(`${baseUrl}${path}${volumeId}`, {
    method: 'POST',
    credentials: 'include',
  }).then((data) => {
    return data;
  });
};

export const unsetBookStatus = async (volumeId, status) => {
  const path =
    status === 'favorite'
      ? 'favorites/delete_book/'
      : status === 'to_read'
        ? 'to_read/delete_book/'
        : 'read/delete_book/';
  return await fetchWrapper(`${baseUrl}${path}${volumeId}`, {
    method: 'DELETE',
    credentials: 'include',
  }).then((data) => {
    return data;
  });
};

export async function getBooksByStatus(status) {
  const path =
    status === 'favorite'
      ? 'favorites/get_books'
      : status === 'to_read'
        ? 'to_read/get_books'
        : 'read/get_books';
  return await fetchWrapper(`${baseUrl}${path}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => {
    return data;
  });
}

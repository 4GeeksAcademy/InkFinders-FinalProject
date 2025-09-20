import { baseUrl, fetchWrapper } from './config';

const usersEndpoint = `${baseUrl}favourites`;

export const getCurrentUser = async () => {
  return await fetchWrapper(`${baseUrl}me`, {
    credentials: 'include',
  }).then((data) => {
    return data;
  });
};

export const getUserFavourites = async () => {
  return await fetchWrapper(usersEndpoint, {
    credentials: 'include',
  }).then((data) => {
    return data;
  });
};

export const postUserFavourite = async (externalId, name, type) => {
  return await fetchWrapper(usersEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      external_id: externalId,
      name: name,
      type: type,
    }),
  }).then((data) => {
    return data;
  });
};

export const deleteUserFavourite = async (favouriteId) => {
  return await fetchWrapper(usersEndpoint, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      id: favouriteId,
    }),
  }).then((data) => {
    return data;
  });
};

export const updateUserProfile = async (payload) => {
  return await fetchWrapper(`${baseUrl}me`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
};

export const uploadUserAvatar = async (file) => {
  const form = new FormData();
  form.append('file', file);
  const res = await fetchWrapper(`${baseUrl}me/avatar`, {
    method: 'POST',
    credentials: 'include',
    body: form,
  });
  if (!res.ok) {
    throw new Error(`Upload avatar failed: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  const url = data.url || data.location || data.imageUrl;
  if (!url) throw new Error('Upload avatar: response missing URL');
  return { url };
};

export const setLogin = (token, id) => {
  sessionStorage.setItem('__token__', token);
  sessionStorage.setItem('__id__', id);
};

export const setLogout = () => {
  sessionStorage.removeItem('__token__');
  sessionStorage.removeItem('__id__');
};

export const isLogged = () => {
  const token = sessionStorage.getItem('__token__');
  const id = sessionStorage.getItem('__id__');
  return token && id;
};

export const getUser = {
  userId: () => sessionStorage.getItem('__id__'),
  userToken: () => sessionStorage.getItem('__token__'),
};

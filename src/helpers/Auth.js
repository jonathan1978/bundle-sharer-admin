export const isAuthenticated = () => {
  if (localStorage.getItem('token')?.length > 15) {
    console.log(localStorage.getItem('token'));
    return true;
  }
  return false;
};
export const logout = () => {
  const items = ['token', 'password', 'code'];

  items.forEach(item => localStorage.removeItem(item));
};

export const getToken = () => localStorage.getItem('token');

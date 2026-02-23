export const setToken = (token) => localStorage.setItem("access_token", token);
export const getToken = () => localStorage.getItem("access_token");
export const logout = () => localStorage.removeItem("access_token");
export const isAuthed = () => Boolean(getToken());
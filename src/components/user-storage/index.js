const USER_LOCALSTORAGE_KEY = "hrms_user";

// helper to get user from localstorage
export function getStoredUser() {
  const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

export function setStoredUser(user) {
  localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  localStorage.removeItem(USER_LOCALSTORAGE_KEY);
}

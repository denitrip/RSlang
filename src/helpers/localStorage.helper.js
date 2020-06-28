export function getLocalStorageData() {
  const user = JSON.parse(localStorage.getItem('user'));
  const email = JSON.parse(localStorage.getItem('email'));
  return { user, email };
}

export function setLocalStorageUserData(user, email) {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('email', JSON.stringify(email));
}

export function setLocalStorageUserSettings(settings) {
  localStorage.setItem('settings', JSON.stringify(settings));
}
export function getLocalStorageUserSettings() {
  return JSON.parse(localStorage.getItem('settings'));
}

export function clearStorage() {
  localStorage.clear();
}

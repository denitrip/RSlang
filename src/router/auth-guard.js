import getLocalStorageData from '@/helpers/localStorage.helper';

export default function authGuard(to, from, next) {
  const { user } = getLocalStorageData();

  if (user && user.expDate > Date.now()) {
    next();
  } else {
    next('/welcome?loginError=true');
  }
}

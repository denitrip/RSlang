export default function authGuard(to, from, next) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.expDate > Date.now()) {
    next();
  } else {
    next('/welcome?loginError=true');
  }
}

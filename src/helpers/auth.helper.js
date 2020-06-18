export default class User {
  constructor(userId, token) {
    this.userId = userId;
    this.token = token;
    this.expDate = Date.now() + 4 * 60 * 60 * 1000;
  }
}

export default class ValidField {
  constructor(title) {
    this.title = title;
    this.touched = false;
  }

  touch() {
    this.touched = true;
  }
}

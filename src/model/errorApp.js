export default class AppError extends Error {
  constructor(message, code) {
    this.message = message;
    this.code = code;
  }
}

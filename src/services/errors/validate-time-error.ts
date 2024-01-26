export class ValidateTimeError extends Error {
  constructor() {
    super('Check-in pass the time limit!')
  }
}

class HttpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
// class HttpError extends Error {
//   constructor(public status: number, message: string) {
//     super(message);
//     this.name = this.constructor.name;
//   }
// }

/**
 * Status code: 401
 */
export class UnauthorizedError extends HttpError {
  // constructor(message = 'Unauthorized') {
  //     super(401, message);
  // }
}

/**
 * Status code: 403
 */
export class ForbiddenError extends HttpError {
  // constructor(message = 'Forbidden') {
  //     super(403, message);
  // }
}

/**
 * Status code: 409
 */
export class ConflictError extends HttpError {
  // constructor(message = 'Conflict') {
  //     super(409, message);
  // }
}

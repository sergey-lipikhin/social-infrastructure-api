type Errors = { [key: string]: string };

export class ApiError extends Error {
  public status: number;

  public errors: Errors;

  constructor(status: number, message: string, errors: Errors = {}) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  public static BadRequest(message: string, errors: Errors = {}) {
    return new ApiError(400, message, errors);
  }

  public static Unauthorized() {
    return new ApiError(401, 'Користувача з такими даними не існує');
  }

  public static NotFound(message: string) {
    return new ApiError(404, message);
  }
}

import HTTPStatus from 'http-status';

// Class for a successful response
export class APISuccess {
  constructor(data, status = HTTPStatus.OK, statusText = HTTPStatus['200']) {
    this.data = data;
    this.status = status;
    this.statusText = statusText;
  }

  jsonify() {
    return {
      status: this.status,
      statusText: this.statusText,
      data: this.data,
    };
  }
}

// Class for client-side error response
export class APIClientError extends Error {
  constructor(
    error,
    status = HTTPStatus.BAD_REQUEST,
    statusText = HTTPStatus['400'],
  ) {
    super(error.message);
    this.name = 'APIClientError';
    this.error = error;
    this.status = status;
    this.statusText = statusText;
  }

  jsonify() {
    return {
      name: this.name,
      status: this.status,
      statusText: this.statusText,
      error: this.error,
    };
  }
}

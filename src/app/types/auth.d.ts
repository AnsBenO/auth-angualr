export interface AuthResponse {
  user: User;
}

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: null;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

export interface ValidationErrorResponse {
  errors: Errors;
}

export interface Errors {
  [error: string]: string[];
}

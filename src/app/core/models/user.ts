export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string | null | undefined;
}

export interface UserResponse {
  status: string;
  token: string;
  user: User;
}

export interface Signup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Login {
  email: string,
  password: string
}

export interface ForgetPassword {
  email: string;
}

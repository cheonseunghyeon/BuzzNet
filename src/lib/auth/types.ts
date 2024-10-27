export interface AuthUser {
  uid: string;
  email: string;
  name: string;
  bio: string;
  createdAt: Date;
}
export interface IUser {
  uid: string;
  email: string;
  name: string;
}

export interface RegisterUserReqDTO {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  uid: string;
  email: string;
  name?: string;
  accessToken: string;
}

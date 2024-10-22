export interface AuthUser {
  uid: string;
  email: string;
  name: string;
  bio: string;
  createdAt: Date;
}

export interface RegisterUserReqDTO {
  email: string;
  password: string;
  name: string;
}

export interface IUser {
  uid: string;
  email: string;
  displayName: string;
}

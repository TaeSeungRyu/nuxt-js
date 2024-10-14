declare module "#auth-utils" {
  export interface User {
    id?: number;
    name?: string;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;
    role?: string;
    token?: string;
  }
}

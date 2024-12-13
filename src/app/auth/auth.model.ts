export interface Role {
  id: number;
  name: string;
}

export interface AuthRequest {
  email: string;
  password: string;
  roleId: number;
}

export interface AuthResponse {
  token: string;
  email: string;
  fullName: string;
  roles: Role[];
}

export interface RoleDropdown {
  text: string;
  value: string;
}
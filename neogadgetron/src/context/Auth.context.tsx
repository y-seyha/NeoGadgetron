
import { createContext } from "react";

export interface User {
  id: string;
  email: string;
  role: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; 
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => Promise<void>;
  refreshUser: () => Promise<void>; 
}

// default context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
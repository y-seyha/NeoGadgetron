// AuthContext.tsx
import { createContext } from "react";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  name: string;
  role: string;
  avatar_url?: string;
  email_verified?: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    role?: string,
  ) => Promise<string>;
  logout: () => Promise<void>;
  googleLogin?: () => void;
  facebookLogin?: () => void;
  githubLogin?: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

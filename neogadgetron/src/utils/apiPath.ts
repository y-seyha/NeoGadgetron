export const API_BASE_URL = import.meta.env.VITE_BASE_DEVELOPING_URL;

export const AUTH_API = `${API_BASE_URL}/auth`;
export const USER_API = `${API_BASE_URL}/users`;

export const GOOGLE_LOGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
export const FACEBOOK_LOGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/auth/facebook`;
export const GITHUB_LOGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/auth/github`;

export const openOAuthLogin = (providerUrl: string) => {
  window.location.href = providerUrl; // redirect to backend OAuth
};

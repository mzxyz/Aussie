export type User = {
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
  [key: string]: unknown;
};

export type AuthTokens = {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
  expiresIn: number;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  idToken: string | null;
  isLoading: boolean;
};

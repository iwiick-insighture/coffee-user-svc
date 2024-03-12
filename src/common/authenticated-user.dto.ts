export interface AuthenticatedUser {
  readonly isAuthenticated: boolean;
  readonly email: string;
  readonly name?: string;
  readonly userId?: string;
}

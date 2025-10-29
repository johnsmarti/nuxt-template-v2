interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface ForgotPasswordPayload {
  email: string;
}

interface ResetPasswordPayload {
  token: string;
  password: string;
}

interface IdentityPayload {
  identifier: string;
}

interface AccessIdentityPayload {
  identifier: string;
}

export type {
  User,
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  IdentityPayload,
  AccessIdentityPayload,
};

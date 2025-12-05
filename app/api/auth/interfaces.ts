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

interface IdentityPayload {
  identifier: string;
}

interface AccessIdentityPayload {
  identifier: string;
}

interface RegisterVoterPayload {
  name: string;
  document: string;
  email: string;
  phone: string;
  election_id: string;
}

interface PasswordRequestPayload {
  email: string;
}

interface PasswordResetPayload {
  token: string;
  new_password: string;
  new_password_confirm: string;
}

interface OTPCodePayload {
  code: string;
}

export type {
  AccessIdentityPayload, ForgotPasswordPayload, IdentityPayload, LoginPayload, OTPCodePayload, PasswordRequestPayload,
  PasswordResetPayload, RegisterPayload, RegisterVoterPayload, User
};


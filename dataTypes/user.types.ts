export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  token: string;
  birthday?: Date;
  image?: string;
  email?: string;
};

export type SignUpParams = {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
};

export type SignInParams = {
  phone: string;
  password: string;
};

export type SendVerificationCodeParams = {
  phone: string;
  verificationCode: number;
};

export type ResetPasswordParams = {
  phone: string;
  newPassword: string;
};

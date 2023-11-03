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
  password?: string;
  phone?: string;
  email?: string;
  withGoogle?: boolean;
};

export type SignInParams = {
  password?: string;
  phone?: string;
  email?: string;
  withGoogle?: boolean;
};

export type SendVerificationCodeParams = {
  phone: string;
  verificationCode: number;
};

export type ResetPasswordParams = {
  phone: string;
  newPassword: string;
};

export type UpdateUserProfileParams = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  oldPassword?: string;
  password?: string;
  birthday?: Date;
  email?: string;
  image?: string;
};

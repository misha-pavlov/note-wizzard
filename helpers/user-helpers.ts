import { UserType } from "../dataTypes/user.types";

export const getUserName = (user: UserType) =>
  `${user.firstName} ${user.lastName}`;

export const getUserInitials = (user: UserType) =>
  `${user.firstName[0]}${user.lastName[0]}`;

// true = ok, false = bad
export const validateEmail = (email: string) => {
  // Regular expression for a valid email address
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Test the email against the pattern
  return emailPattern.test(email);
};

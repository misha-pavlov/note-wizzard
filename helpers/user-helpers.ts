import { UserType } from "../dataTypes/user.types";

export const getUserName = (user: UserType) =>
  `${user.firstName} ${user.lastName}`;

export const getUserInitials = (user: UserType) =>
  `${user.firstName[0]}${user.lastName[0]}`;

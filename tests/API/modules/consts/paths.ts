export const USERS = "/public/v2/users";

export function getUserByUserId(userId: number) {
  return `/public/v2/users/${userId}`;
}

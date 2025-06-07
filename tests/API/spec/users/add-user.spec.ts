import test, { expect } from "@playwright/test";
import { Users } from "../../modules/requests/users";
import { generateUser } from "../../modules/fixtures/userFaker";
import { USER_FIELDS } from "../../modules/consts/userFields";
import { UserResponse } from "../../modules/type/userResponse";
const bearerToken = process.env.BEARER_TOKEN;
let createNewUserResponse: UserResponse;

test("Create new user", async ({ request }) => {
  const userData = generateUser();
  const createNewUser = await Users.createNewUser(
    request,
    bearerToken!,
    userData
  );
  expect.soft(createNewUser.status()).toBe(201);
  createNewUserResponse = (await createNewUser.json()) as UserResponse;
  USER_FIELDS.forEach((field) => {
    expect(createNewUserResponse[field]).toBe(userData[field]);
    expect(createNewUserResponse.id).toBeTruthy();
  });
});

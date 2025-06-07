import test, { expect } from "@playwright/test";
import { Users } from "../../modules/requests/users";
import { UserResponse } from "../../modules/utils/userResponse";
const bearerToken = process.env.BEARER_TOKEN;
let userId: number;
let createNewUserResponse: UserResponse;
test.describe(`Edit user`, () => {
  test.beforeEach(async ({ request }) => {
    const createNewUser = await Users.createNewUser(request, bearerToken!);
    expect.soft(createNewUser.status()).toBe(201);
    createNewUserResponse = await createNewUser.json();
    userId = createNewUserResponse.id;
  });

  test("Delete user what added before", async ({ request }) => {
    const deleteUsers = await Users.deleteUser(request, bearerToken!, userId);
    expect.soft(deleteUsers.status()).toBe(204);
    const getUsers = await Users.getUsers(request, bearerToken!, userId, true);
    expect(getUsers.status()).toBe(404);
  });
});

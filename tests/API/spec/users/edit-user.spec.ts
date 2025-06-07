import test, { expect } from "@playwright/test";
import { Users } from "../../modules/requests/users";
import { UserResponse } from "../../modules/utils/userResponse";
import { generateUser } from "../../modules/fixtures/userFaker";
import { USER_FIELDS } from "../../modules/consts/userFields";
const bearerToken = process.env.BEARER_TOKEN;
let userId: number;
let createNewUserResponse: UserResponse;
let editExistedUserResponse: UserResponse;
test.describe(`Edit user`, () => {
  test.beforeEach(async ({ request }) => {
    const createNewUser = await Users.createNewUser(request, bearerToken!);
    expect.soft(createNewUser.status()).toBe(201);
    createNewUserResponse = await createNewUser.json();
    userId = createNewUserResponse.id;
  });

  test("Edit user what added before", async ({ request }) => {
    const editUserData = generateUser();
    const editExistedUser = await Users.editUser(
      request,
      bearerToken!,
      userId,
      editUserData
    );
    expect.soft(editExistedUser.status()).toBe(200);
    editExistedUserResponse = (await editExistedUser.json()) as UserResponse;
    USER_FIELDS.forEach((field) => {
      expect(editExistedUserResponse[field]).not.toBe(
        createNewUserResponse[field]
      );
      expect(editExistedUserResponse[field]).toBe(editUserData[field]);
      expect(editExistedUserResponse.id).toBe(userId);
    });
  });
});

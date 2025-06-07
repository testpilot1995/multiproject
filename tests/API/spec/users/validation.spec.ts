import { test, expect } from "@playwright/test";
import {
  emailCases,
  genderCases,
  nameCases,
  statusCases,
  ValidationCase,
} from "../../modules/validation/validationMatrix";
import { Users } from "../../modules/requests/users";

const bearerToken = process.env.BEARER_TOKEN!;

const testGroups: { label: string; cases: ValidationCase[] }[] = [
  { label: "Email", cases: emailCases },
  { label: "Name", cases: nameCases },
  { label: "Gender", cases: genderCases },
  { label: "Status", cases: statusCases },
];

testGroups.forEach(({ label, cases }) => {
  test.describe(`${label} field validation`, () => {
    cases.forEach(({ name, override, expectedStatus }) => {
      test(`Should fail when ${name}`, async ({ request }) => {
        const response = await Users.createNewUser(
          request,
          bearerToken,
          override,
        );
        expect(response.status()).toBe(expectedStatus);
      });
    });
  });
});

import { faker } from "@faker-js/faker";
import { User } from "../utils/user";

export const generateUser = (): User => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  gender: faker.helpers.arrayElement(["male", "female"]),
  status: faker.helpers.arrayElement(["active", "inactive"]),
});

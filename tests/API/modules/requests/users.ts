import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { setHeader } from "./header";
import { getUserByUserId, USERS } from "../consts/paths";
import { User } from "../utils/user";
import { faker } from "@faker-js/faker";
const active = "active";
const inactive = "inactive";
export class Users {
  static async getUsers(
    request: APIRequestContext,
    adminToken: string,
    userId: number,
    del: boolean = false
  ): Promise<APIResponse> {
    let response: APIResponse;
    await expect
      .poll(
        async () => {
          response = await request.post(
            new URL(`${process.env.API_BASE_URL!}${getUserByUserId(userId)}`)
              .href,
            {
              headers: setHeader(adminToken),
            }
          );
          return del ? response.status() === 404 : response.ok();
        },
        {
          message: "Failed to find User!",
          intervals: [5_000],
          timeout: 35_000,
        }
      )
      .toBe(true);
    return response!;
  }
  static async createNewUser(
    request: APIRequestContext,
    token: string,
    override: Partial<User> = {}
  ): Promise<APIResponse> {
    try {
      const baseUser: User = {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        gender: faker.person.sexType(),
        status: active,
      };

      const data: Partial<User> = { ...baseUser, ...override };
      const fullUrl = new URL(`${process.env.API_BASE_URL!}${USERS}`).href;

      return await request.post(fullUrl, {
        headers: setHeader(token),
        data,
      });
    } catch (error) {
      throw new Error(`Something went wrong at <editUser>: ${error}`);
    }
  }

  static async editUser(
    request: APIRequestContext,
    token: string,
    userId: number,
    override: Partial<User> = {}
  ): Promise<APIResponse> {
    try {
      const baseUser: User = {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        gender: faker.person.sexType(),
        status: inactive,
      };

      const data: Partial<User> = { ...baseUser, ...override };
      const fullUrl = new URL(
        `${process.env.API_BASE_URL!}${getUserByUserId(userId)}`
      ).href;

      return await request.patch(fullUrl, {
        headers: setHeader(token),
        data,
      });
    } catch (error) {
      throw new Error(`Something went wrong at <editUser>: ${error}`);
    }
  }
  static async deleteUser(
    request: APIRequestContext,
    token: string,
    userId: number
  ): Promise<APIResponse> {
    try {
      const fullUrl = new URL(
        `${process.env.API_BASE_URL!}${getUserByUserId(userId)}`
      ).href;

      return await request.delete(fullUrl, {
        headers: setHeader(token),
      });
    } catch (error) {
      throw new Error(`Something went wrong at <deleteUser>: ${error}`);
    }
  }
}

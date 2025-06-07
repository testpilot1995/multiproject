import { User } from "../type/user";

export type ValidationCase = {
  name: string;
  override: Partial<User>;
  expectedStatus: number;
  expectedError?: string;
};

export const emailCases: ValidationCase[] = [
  {
    name: "missing email",
    override: { email: undefined },
    expectedStatus: 422,
    expectedError: "email is required",
  },
  {
    name: "invalid email format",
    override: { email: "not-an-email" },
    expectedStatus: 422,
    expectedError: "email must be a valid email",
  },
  {
    name: "empty email",
    override: { email: "" },
    expectedStatus: 422,
    expectedError: "email is required",
  },
  {
    name: "numeric email",
    override: { email: 12345 as any },
    expectedStatus: 422,
  },
];

export const nameCases: ValidationCase[] = [
  {
    name: "missing name",
    override: { name: undefined },
    expectedStatus: 422,
    expectedError: "name is required",
  },
  {
    name: "empty name",
    override: { name: "" },
    expectedStatus: 422,
  },
  {
    name: "numeric name",
    override: { name: 1234 as any },
    expectedStatus: 422,
  },
  {
    name: "null name",
    override: { name: null as any },
    expectedStatus: 422,
  },
];

export const genderCases: ValidationCase[] = [
  {
    name: "invalid gender",
    override: { gender: "banana" as any },
    expectedStatus: 422,
  },
  {
    name: "missing gender",
    override: { gender: undefined },
    expectedStatus: 422,
  },
  {
    name: "empty gender",
    override: { gender: "" as any },
    expectedStatus: 422,
  },
  {
    name: "numeric gender",
    override: { gender: 123 as any },
    expectedStatus: 422,
  },
];

export const statusCases: ValidationCase[] = [
  {
    name: "empty status",
    override: { status: "" },
    expectedStatus: 422,
  },
  {
    name: "invalid status",
    override: { status: "ghost" as any },
    expectedStatus: 422,
  },
  {
    name: "missing status",
    override: { status: undefined },
    expectedStatus: 422,
  },
  {
    name: "null status",
    override: { status: null as any },
    expectedStatus: 422,
  },
  {
    name: "numeric status",
    override: { status: 1234 as any },
    expectedStatus: 422,
  },
];

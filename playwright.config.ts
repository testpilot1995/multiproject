import { defineConfig, devices } from "@playwright/test";

import * as dotenv from "dotenv";
dotenv.config({ path: "./tests/shared/configs/.env" });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["list"],
  ],
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  retries: 1,
  projects: [
    {
      name: "UI",
      testDir: "./tests/UI",
    },

    {
      testDir: "./tests/API",
      name: "API",
      use: {
        baseURL: process.env.API_BASE_URL,
      },
    },
  ],
});

import { defineConfig, devices } from "@playwright/test";


import * as dotenv from 'dotenv';
dotenv.config({ path: './tests/shared/configs/.env' });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "UI",
      testDir: "./tests/UI",
      use: { ...devices["Desktop Chrome"], baseURL: process.env.API_BASE_URL },
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

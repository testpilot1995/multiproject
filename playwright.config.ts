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
      name: "Desktop",
      testDir: "./tests/UI",
      use: {
        ignoreHTTPSErrors: true,
        baseURL: process.env.BASE_URL,
        ...devices["Desktop Chrome"],
        isMobile: false,
        headless:false,
      },
    },
    {
      name: "Mobile",
      testDir: "./tests/UI",
      use: {
        ignoreHTTPSErrors: true,
        baseURL: process.env.BASE_URL,
        ...devices["Pixel 5"],
        isMobile: true,
      },
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

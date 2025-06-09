import { Page, TestInfo } from "@playwright/test";
import { BasePage } from "../../pages/BasePage";

export const initNavigation = async (page: Page, testinfo: TestInfo) => {
  await page.goto(testinfo.project.use.baseURL!);
};

import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  static async navigateTo(url: string, page: Page): Promise<void> {
    await page.goto(url);
  }

  async click(selector: string | Locator): Promise<void> {
    const element =
      typeof selector === "string" ? this.page.locator(selector) : selector;
    await element.click();
  }

  async fill(selector: string | Locator, value: string): Promise<void> {
    const element =
      typeof selector === "string" ? this.page.locator(selector) : selector;
    await element.fill(value);
  }

  async isVisible(selector: string | Locator): Promise<boolean> {
    const element =
      typeof selector === "string" ? this.page.locator(selector) : selector;
    return await element.isVisible();
  }

  async expectText(
    selector: string | Locator,
    expectedText: string
  ): Promise<void> {
    const element =
      typeof selector === "string" ? this.page.locator(selector) : selector;
    await expect(element).toHaveText(expectedText);
  }

  async waitForSelector(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("load");
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `screenshots/${name}.png`,
      fullPage: true,
    });
  }
  async expectTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async expectUrl(expectedUrl: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl);
  }
}

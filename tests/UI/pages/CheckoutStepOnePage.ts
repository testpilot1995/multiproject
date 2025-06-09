import { CheckoutPage } from "./CheckoutPage";
import { CheckoutStepTwoPage } from "./CheckoutStepsTwoPage";
import { expect, Locator } from "@playwright/test";

export class CheckoutStepOnePage extends CheckoutPage {
  private readonly root: Locator = this.page.locator(".checkout_info_container");

  private readonly firstNameInput: Locator = this.root.locator('[data-test="firstName"]');
  private readonly lastNameInput: Locator = this.root.locator('[data-test="lastName"]');
  private readonly postalCodeInput: Locator = this.root.locator('[data-test="postalCode"]');
  private readonly errorCode: Locator = this.root.locator('.error-message-container.error');

  async fillPersonalInfo(first: string, last: string, zip: string): Promise<this> {
    await this.firstNameInput.fill(first);
    await this.lastNameInput.fill(last);
    await this.postalCodeInput.fill(zip);
    return this;
  }

  async continue(): Promise<CheckoutStepTwoPage> {
    await this.clickContinueButton();
    return new CheckoutStepTwoPage(this.page);
  }
    async assertErrorMessageIsVisible() {
      await expect(this.errorCode).toBeVisible()
  }
}

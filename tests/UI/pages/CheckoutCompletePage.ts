import { Page, Locator } from "@playwright/test";
import { CheckoutPage } from "./CheckoutPage";

export class CheckoutCompletePage extends CheckoutPage {
  private readonly confirmationMessage: Locator =
    this.page.locator(".complete-header");

  async getConfirmationMessage(): Promise<string | null> {
    return this.confirmationMessage.textContent();
  }
}

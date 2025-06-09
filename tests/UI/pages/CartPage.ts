import { Page, Locator, expect } from "@playwright/test";
import { CheckoutStepOnePage } from "./CheckoutStepOnePage";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  private readonly root: Locator = this.page.locator(
    ".cart_contents_container"
  );
  private readonly cartItems: Locator = this.root.locator(".cart_item");
  private readonly checkoutButton: Locator = this.page.locator(
    '[data-test="checkout"]'
  );

async verifyCartHasItems(minExpected: number = 1): Promise<this> {
  await expect(this.cartItems).toHaveCount(minExpected);
  return this;
}

  async startCheckout(): Promise<CheckoutStepOnePage> {
    await this.checkoutButton.click();
    return new CheckoutStepOnePage(this.page);
  }
}

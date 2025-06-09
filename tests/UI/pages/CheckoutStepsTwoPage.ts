import { CheckoutPage } from "./CheckoutPage";
import { CheckoutCompletePage } from "./CheckoutCompletePage";
import { Locator } from "@playwright/test";

export class CheckoutStepTwoPage extends CheckoutPage {
  private readonly root: Locator = this.page.locator(
    ".checkout_summary_container"
  );

  private readonly finishButton: Locator = this.root.locator(
    '[data-test="finish"]'
  );

  async finishOrder(): Promise<CheckoutCompletePage> {
    await this.finishButton.click();
    return new CheckoutCompletePage(this.page);
  }
}

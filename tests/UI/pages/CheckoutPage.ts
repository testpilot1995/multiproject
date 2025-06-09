import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private readonly checkoutContainer: Locator = this.page.locator('.checkout_summary_container');
  private readonly continueButton: Locator = this.page.locator('[data-test="continue"]');
  private readonly cancelButton: Locator = this.page.locator('[data-test="cancel"]');
  private readonly itemTotalLabel: Locator = this.checkoutContainer.locator('.summary_subtotal_label');
  private readonly taxLabel: Locator = this.checkoutContainer.locator('.summary_tax_label');
  private readonly totalLabel: Locator = this.checkoutContainer.locator('.summary_total_label');

  async clickContinueButton(): Promise<void> {
    await this.continueButton.click();
  }

  async clickCancelButton(): Promise<void> {
    await this.cancelButton.click();
  }

  async getItemTotal(): Promise<number> {
    const text = await this.itemTotalLabel.textContent();
    return parseFloat(text?.replace('Item total: $', '') || '0');
  }

  async getTax(): Promise<number> {
    const text = await this.taxLabel.textContent();
    return parseFloat(text?.replace('Tax: $', '') || '0');
  }

  async getTotal(): Promise<number> {
    const text = await this.totalLabel.textContent();
    return parseFloat(text?.replace('Total: $', '') || '0');
  }
}

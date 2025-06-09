import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CartPage } from "./CartPage";

export class HomePage extends BasePage {
  private readonly root: Locator = this.page.locator("#inventory_container");
  private readonly productCards: Locator = this.root.locator(".inventory_item");
  private readonly cartLink: Locator = this.page.locator(".shopping_cart_link");

async addProductsToCartSafe(count: number, productNames?: string[]): Promise<this> {
  const addedIndexes = new Set<number>();

  for (let i = 0; i < count; i++) {
    let productCard: Locator;

    if (productNames?.[i]) {
      const filtered = this.productCards.filter({ hasText: productNames[i] });
      const filteredCount = await filtered.count();
      productCard = filteredCount > 0 ? filtered.first() : this.productCards.nth(i);
    } else {
      let index = i;
      while (addedIndexes.has(index)) index++;
      productCard = this.productCards.nth(index);
    }

    await productCard.locator("button").click();
    addedIndexes.add(i);
  }

  return this;
}


  async goToCart(): Promise<CartPage> {
    await this.cartLink.click();
    return new CartPage(this.page);
  }
}

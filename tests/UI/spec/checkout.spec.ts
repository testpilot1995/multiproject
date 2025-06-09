import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { initNavigation } from "../helpers/utils/initNavigation";
import { LoginPage } from "../pages/LoginPage";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }, testInfo) => {
  await initNavigation(page, testInfo);
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
});
test.describe("Checkout flow", () => {
  test("Happy path - complete checkout flow", async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = await (await homePage.addProductsToCartSafe(1)).goToCart();
    const checkoutStepOne = await cartPage
      .verifyCartHasItems(1)
      .then((cart) => cart.startCheckout());
    const checkoutStepTwo = await (
      await checkoutStepOne.fillPersonalInfo(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.location.zipCode()
      )
    ).continue();
    const itemTotal = await checkoutStepTwo.getItemTotal();
    const tax = await checkoutStepTwo.getTax();
    const total = await checkoutStepTwo.getTotal();
    expect(total).toBeCloseTo(itemTotal + tax, 2);
    const completePage = await checkoutStepTwo.finishOrder();
    const confirmationMessage = await completePage.getConfirmationMessage();
    expect(confirmationMessage).toContain("Thank you for your order!");
  });
  test("Happy path - complete checkout flow multiple product", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const cartPage = await (await homePage.addProductsToCartSafe(2)).goToCart();
    const checkoutStepOne = await cartPage
      .verifyCartHasItems(2)
      .then((cart) => cart.startCheckout());
    const checkoutStepTwo = await (
      await checkoutStepOne.fillPersonalInfo(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.location.zipCode()
      )
    ).continue();
    const itemTotal = await checkoutStepTwo.getItemTotal();
    const tax = await checkoutStepTwo.getTax();
    const total = await checkoutStepTwo.getTotal();
    expect(total).toBeCloseTo(itemTotal + tax, 2);
    const completePage = await checkoutStepTwo.finishOrder();
    const confirmationMessage = await completePage.getConfirmationMessage();
    expect(confirmationMessage).toContain("Thank you for your order!");
  });

  test("Unhappy path - try complete checkout flow without your information", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const cartPage = await (await homePage.addProductsToCartSafe(1)).goToCart();
    const checkoutStepOne = await cartPage
      .verifyCartHasItems(1)
      .then((cart) => cart.startCheckout());
    await (await checkoutStepOne.fillPersonalInfo("", "", "")).continue();
    await checkoutStepOne.assertErrorMessageIsVisible();
  });
});

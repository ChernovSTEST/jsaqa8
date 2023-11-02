import adminData from "../fixtures/adminData";
import selector from "../fixtures/selectors";

beforeEach(() => {
  cy.visit("/admin");
});

describe("Admin Login", () => {
  it("Should display the correct information on the admin home page", () => {
    cy.get(selector.title).should("contain", "Идёмвкино");
    cy.get(selector.pageHeader).should("contain", "Администраторррская");
    cy.get(selector.loginSection).should("contain", "Авторизация");
  });

  context("Login with valid credentials", () => {
    it("Should log in with correct email and password", () => {
      cy.login(adminData.validEmail, adminData.validPassword);
      cy.contains("Управление залами").should("be.visible");
      cy.contains("Конфигурация залов").should("be.visible");
      cy.contains("Конфигурация цен").should("be.visible");
      cy.contains("Сетка сеансов").should("be.visible");
      cy.contains("Открыть продажи").should("be.visible");
    });
  });

  context("Login with invalid credentials", () => {
    it("Should show an error message with invalid email and password", () => {
      cy.login(adminData.invalidEmail, adminData.invalidPassword);
      cy.contains("Ошибка авторизации!").should("be.visible");
    });

    it("Should show an error message with invalid email", () => {
      cy.login(adminData.invalidEmail, adminData.validPassword);
      cy.contains("Ошибка авторизации!").should("be.visible");
    });

    it("Should show an error message with invalid password", () => {
      cy.login(adminData.validEmail, adminData.invalidPassword);
      cy.contains("Ошибка авторизации!").should("be visible");
    });
  });
});

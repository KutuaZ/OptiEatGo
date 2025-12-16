/// <reference types="cypress" />

/**
 * Comando para registrar un usuario rápidamente
 */
Cypress.Commands.add('registerUser', (username: string, password: string, preference: string) => {
  cy.contains('button', /register|registrarse/i).click({ force: true });
  cy.get('input[type="text"], input[name="username"]').first().type(username);
  cy.get('input[type="password"]').first().type(password);
  cy.get('ion-radio-group, ion-select').first().within(() => {
    cy.contains(new RegExp(preference, 'i')).click({ force: true });
  });
  cy.contains('button', /registrarse|crear/i).click({ force: true });
  cy.url().should('include', '/home');
});

/**
 * Comando para hacer login
 */
Cypress.Commands.add('loginUser', (username: string, password: string) => {
  cy.contains('button', /login|iniciar sesión/i).click({ force: true });
  cy.get('input[type="text"], input[name="username"]').first().type(username);
  cy.get('input[type="password"]').first().type(password);
  cy.contains('button', /ingresar|iniciar|enviar/i).click({ force: true });
  cy.url().should('include', '/home');
});

/**
 * Comando para agregar item al carrito
 */
Cypress.Commands.add('addToCart', (itemIndex: number = 0) => {
  cy.get('button[color="primary"], button[class*="add"]')
    .eq(itemIndex)
    .click();
  cy.contains(/agregado|añadido|carrito/i, { timeout: 3000 }).should('exist');
});

/**
 * Comando para buscar en home
 */
Cypress.Commands.add('searchItem', (searchText: string) => {
  cy.get('input[type="search"], input[placeholder*="buscar" i], input[placeholder*="search" i]')
    .first()
    .type(searchText);
  cy.wait(300);
});

/**
 * Comando para navegar a una página
 */
Cypress.Commands.add('navigateToPage', (pageName: string) => {
  cy.contains('a, button', new RegExp(pageName, 'i')).click();
});

/**
 * Comando para hacer logout
 */
Cypress.Commands.add('logout', () => {
  cy.get('ion-menu-button, [class*="menu"]').click({ force: true });
  cy.contains('button, a', /logout|salir|cerrar sesión/i).click({ force: true });
  cy.contains(/iniciar sesión|registrarse|login/i).should('be.visible');
});

/**
 * Comando para obtener cantidad de items en la página
 */
Cypress.Commands.add('getItemCount', () => {
  return cy.get('ion-card, [class*="item"]').then(($items) => {
    return $items.length;
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      registerUser(username: string, password: string, preference: string): Chainable<void>;
      loginUser(username: string, password: string): Chainable<void>;
      addToCart(itemIndex?: number): Chainable<void>;
      searchItem(searchText: string): Chainable<void>;
      navigateToPage(pageName: string): Chainable<void>;
      logout(): Chainable<void>;
      getItemCount(): Chainable<number>;
    }
  }
}

export {};
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
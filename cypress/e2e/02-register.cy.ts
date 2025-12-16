

describe('E2E: Interfaz de Registro', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.clearLocalStorage();

    // navegar a la pantalla de registro
    // Links o botones que lleven a registro
    cy.get('a[href*="register"], button, ion-button')
      .contains(/registrarse|register|crear cuenta|crear usuario/i)
      .click({ force: true });
  });

  it('Debería cargar la página de registro correctamente', () => {
    cy.url().should('include', '/register');

    // Campos básicos
    cy.get('input[type="text"], input[name="username"], ion-input[type="text"]').should('exist');
    cy.get('input[type="password"], ion-input[type="password"]').should('exist');
  });

  it('Debería permitir escribir nombre de usuario', () => {
    // Usar el input nativo que renderiza Ionic dentro del ion-input
    cy.get('input[name="username"], input[type="text"], input')
      .first()
      .type('nuevo_usuario', { force: true })
      .should('have.value', 'nuevo_usuario');
  });

  it('Debería permitir escribir contraseña', () => {
    cy.get('input[name="password"], input[type="password"], input')
      .filter('[type="password"], [name="password"]')
      .first()
      .type('1234', { force: true })
      .should('have.value', '1234');
  });

  it('Debería mostrar opciones de preferencia dietética', () => {
    cy.get('ion-radio, ion-select, input[type="radio"]').should('have.length.greaterThan', 0);
  });

  it('Debería permitir seleccionar preferencia vegana', () => {
    // Manejar ion-select directamente: abrir overlay y elegir opción
    cy.get('ion-select').then(($ionSel) => {
      if ($ionSel.length > 0) {
        cy.get('ion-select').first().click({ force: true });
        cy.get('body').within(() => {
          cy.contains('.alert-radio-label, .alert-checkbox-label, ion-select-option, ion-item, .popover-content, .alert-wrapper', /vegano|vegana|vegan/i)
            .click({ force: true });
          cy.contains('button, .alert-button', /ok|aceptar|cerrar|listo/i).click({ force: true });
        });
        // Validar que ion-select muestre algún valor seleccionado 
        cy.get('ion-select').first().should(($el) => {
          const valAttr = $el.attr('value');
          const text = $el.text().toLowerCase();
          expect(valAttr || text.includes('vegan')).to.be.true;
        });
        return;
      }
      cy.contains('input[type="radio"] + label, label', /vegano|vegana|vegan/i).click({ force: true });
    });
  });

  it('Debería mostrar botón de registrarse', () => {
    cy.get('button, ion-button').should('have.length.greaterThan', 0);
  });
});

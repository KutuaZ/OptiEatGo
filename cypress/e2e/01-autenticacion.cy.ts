

describe('E2E: Interfaz de Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.clearLocalStorage();
  });

  it('Debería cargar la página de login correctamente', () => {
    // Verificar que existe el formulario de login
    cy.get('input[type="text"], input[name="username"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button').should('have.length.greaterThan', 0);
  });

  it('Debería permitir escribir en el campo de usuario', () => {
    cy.get('input[type="text"], input[name="username"]')
      .first()
      .type('usuario_test', { force: true })
      .should('have.value', 'usuario_test');
  });

  it('Debería permitir escribir en el campo de contraseña', () => {
    cy.get('input[type="password"]')
      .first()
      .type('password123', { force: true })
      .should('have.value', 'password123');
  });

  it('Debería mostrar botones en la página de login', () => {
    cy.get('input[type="text"], input[name="username"]').first().type('test', { force: true });
    cy.get('input[type="password"]').first().type('1234', { force: true });
    
    // Verificar que existe al menos un botón
    cy.get('button').first().should('exist');
  });
});

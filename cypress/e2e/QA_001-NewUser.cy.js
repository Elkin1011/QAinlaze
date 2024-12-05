import 'cypress-file-upload';

const nombreAleatorio = generarNombre(8);
const apellidoAleatorio = generarNombre(8);
const email = '';
const password = '';

beforeEach(() => {
  cy.viewport(1500, 900);
});

describe('QA_001 Validar el registro de un Usuario Nuevo', () => {

  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  // Acceder a la URL de la página de registro
  it('Caso 1: Acceder a la página de registro', () => {
    cy.visit('https://test-qa.inlaze.com/'); // Asegúrate de cambiar esta ruta a la ubicación de tu archivo HTML
  });

  // Verificar que el formulario de registro sea visible
  it('Caso2: Verificar la visibilidad del formulario', () => {
    cy.get('form#registerForm').should('be.visible');
  });

  // Ingresar datos en el formulario de registro
  it('Caso3: Ingresar datos en el formulario', () => {
    cy.get('input#name').should('be.visible').type(`${nombreAleatorio} ${apellidoAleatorio}`);
    cy.get('input#email').should('be.visible').type(email);
    cy.get('input#password').should('be.visible').type(password);
    cy.get('input#confirmPassword').should('be.visible').type(password);
  });

  // Verificar que el formulario no se envíe si hay campos incompletos
  it('Caso4: Verificar envío incompleto del formulario', () => {
    cy.get('button[type="submit"]').should('be.visible').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Usuario registrado con éxito.');
    });
  });

  // Verificar validaciones del campo de nombre
  it('Caso5: Verificar validación del campo de nombre', () => {
    cy.get('input#name').clear().type('Juan');
    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('El nombre debe contener al menos 2 palabras.');
    });
  });

  // Verificar validaciones del campo de correo electrónico
  it('Caso6: Verificar validación del campo de correo electrónico', () => {
    cy.get('input#name').clear().type(`${nombreAleatorio} ${apellidoAleatorio}`);
    cy.get('input#email').clear().type('invalidemail');
    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Por favor ingrese un correo electrónico válido.');
    });
  });

  // Verificar validaciones del campo de contraseña
  it('Caso7: Verificar validación del campo de contraseña', () => {
    cy.get('input#email').clear().type(email);
    cy.get('input#password').clear().type('short');
    cy.get('input#confirmPassword').clear().type('short');
    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.');
    });
  });

  // Verificar validación de coincidencia de contraseñas
  it('Caso8: Verificar coincidencia de contraseñas', () => {
    cy.get('input#password').clear().type(password);
    cy.get('input#confirmPassword').clear();
    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Las contraseñas no coinciden.');
    });
  });
});

// Función para generar nombres aleatorios
function generarNombre(length) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let nombre = '';

  for (let i = 0; i < length; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    nombre += caracteres.charAt(indice);
  }
  return nombre;
}

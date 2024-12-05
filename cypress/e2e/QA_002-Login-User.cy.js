Cypress.on('uncaught:exception', (err, runnable) => { 
  return false; 
});

/// <reference types="cypress" />

import 'cypress-file-upload';

const userName = 'probador1@yopmail.com';
const userPassword = '';
const nombreUsuario = '';
let nombreVerificado = '';

beforeEach(() => {
  cy.viewport(1500, 900);
});

describe('QA_002 Validar el login de un usuario ya creado', () => {

  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  // Acceder a la URL de la página de inicio de sesión
  it('Caso1: Acceder a la página de inicio de sesión', () => {
    cy.visit(' https://test-qa.inlaze.com/'); // Asegúrate de cambiar esta ruta a la ubicación de tu archivo HTML
  });

  // Verificar la visibilidad del formulario de inicio de sesión
  it('Caso2: Verificar la visibilidad del formulario de login', () => {
    cy.get('form#loginForm').should('be.visible');
  });

  // Diligenciar los campos de login con un usuario ya creado
  it('Caso3: Ingresar datos en el formulario de login', () => {
    cy.get('input#loginEmail').should('be.visible').type(userName);
    cy.get('input#loginPassword').should('be.visible').type(userPassword);
    cy.get('button[type="submit"]').should('be.visible').click();
  });

  // Verificar la activación de listas desplegables de las diferentes opciones y el nombre del usuario
  it('Caso4: Verificar el nombre del usuario y activación de listas desplegables', () => {
    // Supongamos que el nombre de usuario se muestra en un elemento con clase '.user-name'
    cy.get('.user-name').invoke('text').then((text) => {
      nombreVerificado = text.trim();
      expect(nombreVerificado).to.equal(nombreUsuario);
    });
  });

  // Finalizar la sesión
  it('Caso5: Finalizar la sesión', () => {
    // Supongamos que hay un botón para cerrar sesión con la clase '.logout-button'
    cy.get('.logout-button').should('be.visible').click();
  });
});


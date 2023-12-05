describe('Registrering', () => {

  //Innan varje test, starta på Index sidan
  beforeEach("test", () => {
    cy.visit('http://localhost:8080/');
    cy.wait(1000);
    //btnName = document.getElementById("btnName");
  })

  it('Logga in som användare som inte finns', () => {

    cy.request('POST', 'http://localhost:8080/register/remove', { username: 'abc' });

    cy.visit('http://localhost:8080/');
    cy.get("#username").type("abc");
    cy.get("#password").type("def");
    cy.get("#submit").click();

    cy.get("h1").should("contain.text", "Failed");
  })

  it('Registrera en ny User', () => {
    cy.get("#regLink").click();

    cy.get("h1").should("contain.text", "Register")
    cy.get("#username").type("abc");
    cy.get("#password").type("def");
    cy.get("#submit").click();

    cy.get("h1").should("contain.text", "Startsida")
  })

  it('Logga in som användare som nu finns', () => {
    cy.get("#username").type("abc");
    cy.get("#password").type("def");
    cy.get("#submit").click();

    cy.get("h1").should("contain.text", "Profile");
  })
})
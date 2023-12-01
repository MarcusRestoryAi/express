describe('Logga in', () => {

  //Innan varje test, starta på Index sidan
  beforeEach("test", () => {
    cy.visit('http://localhost:8080/');
    //btnName = document.getElementById("btnName");
  })

  it('Inkorrekt inloggning', () => {
    cy.get("#username").type("marcu");
    cy.get("#password").type("qwfgfdfd");
    cy.get("#submit").click();

    cy.get("h1").should("contain.text", "Failed");
  })

  it('Korrekt inloggning', () => {
    cy.get("#username").type("marcus");
    cy.get("#password").type("qwert");
    cy.get("#submit").click();


    cy.get("h1").should("contain.text", "Profile");
  })
})
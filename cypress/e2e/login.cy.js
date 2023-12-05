describe('Logga in', () => {

  //Innan varje test, starta på Index sidan
  beforeEach("test", () => {
    cy.visit('http://localhost:8080/');
    cy.wait(1000);
    //btnName = document.getElementById("btnName");
  })

  it('Korrekt inloggning', () => {
    cy.get("#username").type("marcus");
    cy.get("#password").type("qwerty");
    cy.get("#submit").click();

    cy.get("h1").should("be.visible");
    cy.get("h1").should("contain.text", "Profile");
  })

  it('Inkorrekt inloggning', () => {
    cy.get("#username").type("fgfgdfg");
    cy.get("#password").type("fdfdfd");
    cy.get("#submit").click();

    cy.get("h1").should("be.visible");
    cy.get("h1").should("contain.text", "Failed");
  })

  it('Tomma fält', () => {
    cy.get("#username").type(" ");
    cy.get("#password").type(" ");
    cy.get("#submit").click();

    cy.get("h1").should("be.visible");
    cy.get("h1").should("contain.text", "Failed");
  })

  it('Korrekt namn, fel lösenord', () => {
    cy.get("#username").type("niklas");
    cy.get("#password").type("nbnbnbnb");
    cy.get("#submit").click();

    cy.get("h1").should("be.visible");
    cy.get("h1").should("contain.text", "Failed");
  })

})
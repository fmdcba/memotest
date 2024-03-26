const URL = "http://127.0.0.1:8080/";

describe("test de integracion memotest", () => {
  beforeEach(() => {
    cy.visit(URL);
  });

  it("se asegura que se muestre un tablero con cuadros", () => {});
});

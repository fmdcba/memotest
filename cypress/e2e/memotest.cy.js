const URL = "http://127.0.0.1:8080/";
const NUMERO_CUADROS = 16;

context("test de integracion memotest", () => {
  describe("juega memotest", () => {
    beforeEach(() => {
      cy.visit(URL);
    });

    it("se asegura que se muestre un tablero con cuadros", () => {
      cy.get(".cuadro").should("have.lengthOf", NUMERO_CUADROS);
    });

    it("se asegura que al jugar los cuadros sean aleatorios", () => {
      cy.get(".btn").click();

      cy.get(".cuadro").then((cuadros) => {
        let cuadrosOriginales = [];
        cuadros.each(function (i, cuadroOriginal) {
          cuadrosOriginales.push(cuadroOriginal.textContent);
        });

        cy.get(".btn").click();

        cy.get(".cuadro").then((nuevosCuadros) => {
          let cuadrosNuevos = [];
          nuevosCuadros.each(function (i, cuadroNuevo) {
            cuadrosNuevos.push(cuadroNuevo);
          });

          cy.wrap(cuadrosOriginales).should("not.deep.equal", cuadrosNuevos);
        });
      });
    });

    it("elige una combinación incorrecta de cuadros", () => {});
  });
});

const URL = "http://127.0.0.1:8080/";
const NUMERO_CUADROS = 16;

before(() => {
  cy.visit(URL);
});

context("test de integracion memotest", () => {
  describe("juega memotest", () => {
    it("se asegura que se muestre un tablero con cuadros", () => {
      cy.get(".cuadro").should("have.lengthOf", NUMERO_CUADROS);
    });

    it("se asegura que al jugar los cuadros sean aleatorios", () => {
      cy.get("header").find(".btn").click();

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
  });

  describe("resuelve el juego", () => {
    let mapaDePares, listaDePares;

    it("elige combinación de cuadros incorrecta", () => {
      cy.get("header").find(".btn").click();

      cy.get(".cuadro").then((cuadros) => {
        mapaDePares = obtenerPares(cuadros);
        listaDePares = Object.values(mapaDePares);

        listaDePares[0][0].click();
        listaDePares[1][1].click();
      });

      cy.get(".text-bg-secondary").should("have.lengthOf", 0);
    });

    it("encuentra todos los pares", () => {
      cy.get(".text-bg-secondary").should("have.lengthOf", 0);

      listaDePares.forEach((par) => {
        cy.get(par[0]).click();
        cy.get(par[1]).click();
      });

      cy.get(".text-bg-secondary").should("have.lengthOf", NUMERO_CUADROS);
    });

    it("evalúa que el juego ha terminado", () => {
      cy.get("#mensaje").should(
        "have.text",
        "Felicidades, ganaste y te tomó 9 intentos"
      );
    });

    it("reinicia el juego", () => {
      cy.get("header").find(".btn").should("have.text", "Reiniciar");

      cy.get("header").find(".btn").click();

      cy.get("#mensaje").should(
        "have.text",
        "Encontrá los pares de emojis para ganar"
      );
    });
  });
});

function obtenerPares(cuadros) {
  let pares = {};
  cuadros.each((i, cuadro) => {
    const contenidoCuadro = cuadro.textContent;

    if (pares[contenidoCuadro]) {
      pares[contenidoCuadro].push(cuadro);
    } else {
      pares[contenidoCuadro] = [cuadro];
    }
  });

  return pares;
}
